const { v4: uuidv4 } = require("uuid");
const deck = require("../data/deck");
const cities = require("../data/cities");
const artefacts = require("../data/artefacts");
const cityBonuses = require("../data/cityBonuses");

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

const initiateGame = (users) => {
  users.forEach((user) => {
    user.status = "idle";
    user.points = 0;
    user.offset = users.indexOf(user);
  });

  const citiesIndex = getRandomIntInclusive(0, cities.length - 1);
  const artefactIndex = getRandomIntInclusive(0, artefacts.length - 1);

  const game = {
    id: uuidv4(),
    deck,
    deal: [],
    cellsLeft: {
      sand: 8,
      forest: 7,
      stone: 6,
      water: 4,
      any: 2,
    },
    cities: cities[citiesIndex],
    artefact: artefacts[artefactIndex],
    cityBonuses,
    players: users,
  };

  games.push(game);

  return game;
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
};
