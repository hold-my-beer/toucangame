const deck = require("../data/deck");
const { v4: uuidv4 } = require("uuid");

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

const initiateGame = (playerId) => {
  const game = {
    id: uuidv4(),
    deck,
    deal: [],
    players: [
      {
        id: playerId,
        isThinking: false,
        points: 0,
      },
    ],
  };

  return game;
};

const addPlayer = (playerId, game) => {
  const newPLayer = {
    id: playerId,
    isThinking: false,
    points: 0,
  };
  const updatedGame = { ...game, players: [...game.players, newPLayer] };
  return updatedGame;
};

const removePlayer = (playerId, game) => {
  const updatedGame = {
    ...game,
    players: game.players.filter((player) => player !== playerId),
  };
  return updatedGame;
};

const deal = (game) => {
  const deal = [];
  let deck = game.deck;

  let index = getRandomIntInclusive(0, deck.length - 1);
  deal.push(deck[index]);
  deck.splice(index, 1);

  index = getRandomIntInclusive(0, deck.length - 1);
  deal.push(deck[index]);
  deck.splice(index, 1);

  const updatedGame = { ...game, deck, deal };

  return updatedGame;
};

module.exports = {
  initiateGame,
  addPlayer,
  removePlayer,
  deal,
};
