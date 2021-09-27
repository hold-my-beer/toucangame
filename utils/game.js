const { v4: uuidv4 } = require("uuid");
const deck = require("../data/deck");
const cityScenarios = require("../data/cityScenarios");
const artefacts = require("../data/artefacts");
const cities = require("../data/cities");
const { default: socket } = require("../client/src/config/socket");

const games = [];

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

const deal = (game) => {
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

  const updatedGame = { ...game, deck, deal, cellsLeft };

  return updatedGame;
};

const initiateGame = (users, isMinor) => {
  const gameId = uuidv4();

  users.forEach((user) => {
    user.gameId = gameId;
    user.status = "idle";
    user.points = 0;
    user.offset = users.indexOf(user);
  });

  const cityScenarioIndex = getRandomIntInclusive(0, cityScenarios.length - 1);
  const bonusArtefactIndex = getRandomIntInclusive(0, artefacts.length - 1);

  const game = {
    id: gameId,
    isActive: true,
    isMinor,
    deck,
    deal: [],
    cellsLeft: {
      sand: 8,
      forest: 7,
      stone: 6,
      water: 4,
      any: 2,
    },
    cityScenario: cityScenarios[cityScenarioIndex],
    artefacts,
    bonusArtefact: artefacts[bonusArtefactIndex],
    cities,
    players: users,
  };

  games.push(game);

  return game;
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

// const addPlayer = (playerId, game) => {
//   const newPLayer = {
//     id: playerId,
//     isThinking: false,
//     points: 0,
//   };
//   const updatedGame = { ...game, players: [...game.players, newPLayer] };
//   return updatedGame;
// };

// const removePlayer = (playerId, game) => {
//   const updatedGame = {
//     ...game,
//     players: game.players.filter((player) => player !== playerId),
//   };
//   return updatedGame;
// };

module.exports = {
  initiateGame,
  // addPlayer,
  // removePlayer,
  deal,
  quitGame,
};
