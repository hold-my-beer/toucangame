const { v4: uuidv4 } = require("uuid");
const deck = require("../data/deck");
const cityScenarios = require("../data/cityScenarios");
const artefacts = require("../data/artefacts");
const cities = require("../data/cities");
const { getRandomIntInclusive } = require("./index");
const { saveStats } = require("../controllers/userController");
const { updateStats } = require("./users");
// const { default: socket } = require("../client/src/config/socket");

const games = [];

// const getRandomIntInclusive = (min, max) => {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
// };

const deal = (game) => {
  // const gameIndex = games.filter((item) => item.id === game.id);
  const gameIndex = games.findIndex((item) => item.id === game.id);

  if (gameIndex !== -1) {
    const deal = [];
    let deck = game.deck;
    let cellsLeft = game.cellsLeft;

    let index = getRandomIntInclusive(0, deck.length - 1);
    deal.push(deck[index]);
    cellsLeft[deck[index]]--;
    deck.splice(index, 1);

    index = getRandomIntInclusive(0, deck.length - 1);
    deal.push(deck[index]);
    cellsLeft[deck[index]]--;
    deck.splice(index, 1);

    games[gameIndex] = { ...game, deck, deal, cellsLeft };

    // console.log(games[gameIndex]);

    // const gIndex = games.filter((item) => item.id === game.id);

    // if (gIndex !== -1) {
    //   console.log(games[gIndex]);
    // }

    return games[gameIndex];
  }

  // const updatedGame = { ...game, deck, deal, cellsLeft };

  // return updatedGame;

  return game;
};

const initiateGame = (users, isMinor) => {
  const gameId = uuidv4();

  users.forEach((user) => {
    user.gameId = gameId;
    user.status = "isThinking";
    user.points = 0;
    user.offset = users.indexOf(user);
  });

  const cityScenarioIndex = getRandomIntInclusive(0, cityScenarios.length - 1);
  const bonusArtefactIndex = getRandomIntInclusive(0, artefacts.length - 1);

  const game = {
    id: gameId,
    isActive: true,
    isMinor,
    roundNumber: 1,
    turnNumber: 1,
    // isBonusMove: false,
    deck: [...deck],
    deal: [],
    cellsLeft: {
      sand: 8,
      forest: 7,
      stone: 6,
      water: 4,
      any: 2,
    },
    cityScenario: cityScenarios[cityScenarioIndex],
    artefacts: [...artefacts],
    bonusArtefact: { ...[...artefacts][bonusArtefactIndex] },
    cities,
    players: users,
    results: {
      players: users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          artefactPoints: 0,
          cityPoints: 0,
          bonusPoints: 0,
          totalPoints: 0,
        };
      }),
    },
  };

  // const updatedGame = deal(game);

  games.push(game);
  // games.push(updatedGame);

  // return game;
  const updatedGame = deal(game);

  return updatedGame;
};

const updateTurn = (socketId, gameId, turn) => {
  const gameIndex = games.findIndex((game) => game.id === gameId);
  // console.log(games[gameIndex]);

  if (gameIndex !== -1) {
    const playerIndex = games[gameIndex].players.findIndex(
      (player) => player.socketId === socketId
    );

    if (playerIndex !== -1) {
      // Set player status to isWaiting
      games[gameIndex].players[playerIndex].status = "isWaiting";

      // If bonus artefact points awarded set bonusArtefact as awarded
      if (
        turn.roundPoints.length &&
        turn.roundPoints[turn.roundPoints.length - 1].bonusArtefactPoints.length
      ) {
        games[gameIndex].bonusArtefact.bonusAwarded = true;
      }

      //If bonus city points awarded set bonusAwarded as awarded
      if (
        turn.roundPoints.length &&
        turn.roundPoints[turn.roundPoints.length - 1].bonusCityPoints.length
      ) {
        const updatedCities = [];
        games[gameIndex].cities.forEach((city) => {
          const cityIndex = turn.roundPoints[
            turn.roundPoints.length - 1
          ].bonusCityPoints.findIndex((item) => item.name === city.name);
          if (cityIndex === -1) {
            updatedCities.push(city);
          } else {
            const updatedCity = {
              ...city,
              bonusAwarded: [
                city.bonusAwarded[0]
                  ? true
                  : turn.roundPoints[turn.roundPoints.length - 1]
                      .bonusCityPoints[cityIndex].bonusAwarded[0]
                  ? true
                  : false,
                city.bonusAwarded[1]
                  ? true
                  : turn.roundPoints[turn.roundPoints.length - 1]
                      .bonusCityPoints[cityIndex].bonusAwarded[1]
                  ? true
                  : false,
              ],
            };

            updatedCities.push(updatedCity);
          }
        });

        games[gameIndex].cities = updatedCities;
      }

      // If it is the last round save the players points
      if (games[gameIndex].turnNumber === 13) {
        if (turn.roundPoints.length) {
          let artefactPoints = 0;
          turn.roundPoints.forEach((round) => {
            artefactPoints += round.artefactPoints.length
              ? round.artefactPoints
                  .map((item) => item.pts)
                  .reduce((acc, cur) => {
                    return acc + cur;
                  }, 0)
              : 0;
          });
          // const artefactPoints = turn.roundPoints[turn.roundPoints.length - 1]
          //   .artefactPoints.length
          //   ? turn.roundPoints[turn.roundPoints.length - 1].artefactPoints
          //       .map((item) => item.pts)
          //       .reduce((acc, cur) => {
          //         return acc + cur;
          //       }, 0)
          //   : 0;
          const cityPoints = turn.roundPoints[turn.roundPoints.length - 1]
            .cityPoints.length
            ? turn.roundPoints[turn.roundPoints.length - 1].cityPoints
                .map((item) => item.pts)
                .reduce((acc, cur) => {
                  return acc + cur;
                }, 0)
            : 0;
          const bonusArtefactPoints = turn.roundPoints[
            turn.roundPoints.length - 1
          ].bonusArtefactPoints.length
            ? turn.roundPoints[turn.roundPoints.length - 1].bonusArtefactPoints
                .map((item) => item.pts)
                .reduce((acc, cur) => {
                  return acc + cur;
                }, 0)
            : 0;
          const bonusCityPoints = turn.roundPoints[turn.roundPoints.length - 1]
            .bonusCityPoints.length
            ? turn.roundPoints[turn.roundPoints.length - 1].bonusCityPoints
                .map((item) => item.pts)
                .reduce((acc, cur) => {
                  return acc + cur;
                }, 0)
            : 0;
          const totalPoints =
            artefactPoints + cityPoints + bonusArtefactPoints + bonusCityPoints;

          games[gameIndex].results.players[playerIndex].artefactPoints =
            artefactPoints;
          games[gameIndex].results.players[playerIndex].cityPoints = cityPoints;
          games[gameIndex].results.players[playerIndex].bonusPoints =
            bonusArtefactPoints + bonusCityPoints;
          games[gameIndex].results.players[playerIndex].totalPoints =
            totalPoints;
        }
      }

      // Check if all players made their move this turn
      const playersWaitingNumber = games[gameIndex].players.filter(
        (player) => player.status === "isWaiting"
      ).length;

      if (playersWaitingNumber === games[gameIndex].players.length) {
        games[gameIndex].players.forEach((player) => {
          player.status = "isThinking";
        });

        // games[gameIndex].isBonusMove = false;

        // If it is the last turn start next round
        if (games[gameIndex].turnNumber === 13) {
          // Sort players by total points
          games[gameIndex].results.players.sort((a, b) => {
            return b.totalPoints - a.totalPoints;
          });
          // If it is the last round
          if (
            (games[gameIndex].isMinor && games[gameIndex].roundNumber === 2) ||
            (!games[gameIndex].isMinor && games[gameIndex].roundNumber === 3)
          ) {
            updateStats(
              games[gameIndex].results.players,
              games[gameIndex].isMinor
            );

            try {
              saveStats(
                games[gameIndex].results.players,
                games[gameIndex].isMinor
              );
            } catch (error) {
              console.error(error);
            }

            games[gameIndex].isActive = false;

            games[gameIndex].roundNumber = games[gameIndex].roundNumber + 1;
            games[gameIndex].turnNumber = 1;
            games[gameIndex].deck = [...deck];
            games[gameIndex].cellsLeft = {
              sand: 8,
              forest: 7,
              stone: 6,
              water: 4,
              any: 2,
            };

            const finishedGame = { ...games[gameIndex] };

            games.splice(gameIndex, 1);

            return {
              game: finishedGame,
              isNewTurn: true,
              isNewRound: true,
              isNewGame: true,
            };
          }

          games[gameIndex].roundNumber = games[gameIndex].roundNumber + 1;
          games[gameIndex].turnNumber = 1;
          games[gameIndex].deck = [...deck];
          games[gameIndex].cellsLeft = {
            sand: 8,
            forest: 7,
            stone: 6,
            water: 4,
            any: 2,
          };

          return {
            game: games[gameIndex],
            isNewTurn: true,
            isNewRound: true,
            isNewGame: false,
          };
        }

        games[gameIndex].turnNumber += 1;

        return {
          game: games[gameIndex],
          isNewTurn: true,
          isNewRound: false,
          isNewGame: false,
        };
      }
    }

    // console.log(games[gameIndex]);

    return {
      game: games[gameIndex],
      isNewTurn: false,
      isNewRound: false,
      isNewGame: false,
    };
  }

  return { game: {}, isNewTurn: false, isNewRound: false, isNewGame: false };
};

const quitGame = (socketId, gameId) => {
  const gameIndex = games.findIndex((game) => game.id === gameId);

  if (gameIndex !== -1) {
    games[gameIndex].players = games[gameIndex].players.filter(
      (player) => player.socketId !== socketId
    );

    if (!games[gameIndex].players.length) {
      // games[gameIndex].isActive = false;
      games.splice(gameIndex, 1);
      return {};
    } else {
      return games[gameIndex];
    }
  }

  return {};
};

module.exports = {
  initiateGame,
  updateTurn,
  deal,
  quitGame,
};
