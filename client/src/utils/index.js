import {
  OBELISK,
  BOOK,
  TOUCAN,
  YETI,
  DRAGON,
  NONE,
} from "../constants/artefactConstants";
import { HexUtils } from "react-hexgrid";

export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

export const getArtefactConstant = (name) => {
  switch (name) {
    case "obelisk":
      return OBELISK;
    case "book":
      return BOOK;
    case "toucan":
      return TOUCAN;
    case "yeti":
      return YETI;
    case "dragon":
      return DRAGON;
    default:
      return OBELISK;
  }
};

export const getArtefactName = (artefact) => {
  switch (artefact) {
    case OBELISK:
      return "obelisk";
    case BOOK:
      return "book";
    case TOUCAN:
      return "toucan";
    case YETI:
      return "yeti";
    case DRAGON:
      return "dragon";
    default:
      return "obelisk";
  }
};

export const getCityName = (name, cityScenario) => {
  const cityScenarioIndex = name.substring(4, 5);

  return cityScenario[cityScenarioIndex];
};

export const pathsContain = (newPath, paths) => {
  return (
    paths.filter(
      (item) =>
        (HexUtils.equals(item.start, newPath.start) &&
          HexUtils.equals(item.end, newPath.end)) ||
        (HexUtils.equals(item.start, newPath.end) &&
          HexUtils.equals(item.end, newPath.start))
    ).length > 0
  );
};

export const findRoadIndecies = (roads, path) => {
  let roadIndecies = [-1, -1];

  for (let i = 0; i < roads.length; i++) {
    for (let j = 0; j < roads[i].path.length; j++) {
      if (HexUtils.equals(roads[i].path[j], path[0])) {
        roadIndecies[0] = i;
        break;
      } else if (HexUtils.equals(roads[i].path[j], path[1])) {
        roadIndecies[1] = i;
        break;
      }
    }

    if (roadIndecies[0] !== -1 && roadIndecies[1] !== -1) {
      break;
    }
  }

  return roadIndecies;
};

export const newPointsToArray = (newPoints) => {
  let updatedNewPoints = [];

  for (let pointGroup in newPoints) {
    for (let item of newPoints[pointGroup]) {
      updatedNewPoints.push({
        type: pointGroup,
        data: item,
      });
    }
  }

  return updatedNewPoints;
};

export const updateBonusMoves = (roundPoints, bonusMoves, game) => {
  if (roundPoints.length) {
    const { artefactPoints } = roundPoints[roundPoints.length - 1];
    const { isMinor } = game;

    let updatedBonusMoves = [...bonusMoves];
    let bonusMoveReset = false;

    artefactPoints.forEach((artefact) => {
      const bonusMoveIndex = bonusMoves.findIndex(
        (item) => item.name === artefact.name
      );

      // If conditions for bonus move met
      if (
        bonusMoveIndex === -1 &&
        ((isMinor && artefact.totalQty === 2) ||
          (!isMinor && artefact.totalQty === 3))
      ) {
        updatedBonusMoves.push({
          name: artefact.name,
          moveIsMade: false,
        });
        // If bonus move is to be set as made
      } else if (
        bonusMoveIndex !== -1 &&
        ((isMinor && artefact.totalQty === 2) ||
          (!isMinor && artefact.totalQty === 3)) &&
        !bonusMoves[bonusMoveIndex].moveIsMade &&
        !bonusMoveReset
      ) {
        updatedBonusMoves[bonusMoveIndex].moveIsMade = true;
        bonusMoveReset = true;
      }
    });

    return updatedBonusMoves;
  } else {
    return bonusMoves;
  }
};

export const updateCityPoints = (
  road,
  roundPoints,
  game,
  currentRoundPoints,
  newPoints
) => {
  const {
    isMinor,
    roundNumber,
    turnNumber,
    cities: gameCities,
    players,
  } = game;

  let updatedRoundPoints = currentRoundPoints;
  let updatedNewPoints = newPoints;

  road.cities.forEach((city) => {
    if (city.qty === 2) {
      const gameCityIndex = gameCities.findIndex(
        (item) => item.name === city.name
      );
      const roundCityIndex =
        !roundPoints.length || !roundPoints[roundPoints.length - 1].cityPoints
          ? -1
          : roundPoints[roundPoints.length - 1].cityPoints.findIndex(
              (item) => item.name === city.name
            );

      // Update city points
      updatedRoundPoints.cityPoints.push({
        name: city.name,
        pts: isMinor
          ? gameCities[gameCityIndex].points.minor
          : gameCities[gameCityIndex].points.major,
        roundNumber:
          roundCityIndex === -1
            ? roundNumber
            : roundPoints[roundPoints.length - 1].cityPoints[roundCityIndex]
                .roundNumber,
        turnNumber:
          roundCityIndex === -1
            ? turnNumber
            : roundPoints[roundPoints.length - 1].cityPoints[roundCityIndex]
                .turnNumber,
      });

      if (roundCityIndex === -1) {
        updatedNewPoints.cityPoints.push(
          updatedRoundPoints.cityPoints[
            updatedRoundPoints.cityPoints.length - 1
          ]
        );
      }

      // Award bonus city points if available
      const bonusCityAllRounds = roundPoints
        .map((round) => round.bonusCityPoints)
        .flat();
      const bonusCityIndex = bonusCityAllRounds.findIndex(
        (bonusCity) => bonusCity.name === city.name
      );

      if (bonusCityIndex === -1) {
        if (!gameCities[gameCityIndex].bonusAwarded[0]) {
          updatedRoundPoints.bonusCityPoints.push({
            name: city.name,
            pts: gameCities[gameCityIndex].bonusPoints[0],
            bonusAwarded: [true, false],
            roundNumber,
            turnNumber,
          });
        } else if (
          players.length >= 4 &&
          !gameCities[gameCityIndex].bonusAwarded[1]
        ) {
          updatedRoundPoints.bonusCityPoints.push({
            name: city.name,
            pts: gameCities[gameCityIndex].bonusPoints[1],
            bonusAwarded: [false, true],
            roundNumber,
            turnNumber,
          });
        }

        updatedNewPoints.bonusCityPoints.push(
          updatedRoundPoints.bonusCityPoints[
            updatedRoundPoints.bonusCityPoints.length - 1
          ]
        );
      } else {
        updatedRoundPoints.bonusCityPoints.push(
          bonusCityAllRounds[bonusCityIndex]
        );
      }
    }
  });

  return { updatedRoundPoints, updatedNewPoints };
};

export const updateArtefactPoints = (
  road,
  roundPoints,
  game,
  currentRoundPoints,
  newPoints
) => {
  const { isMinor, roundNumber, turnNumber, artefacts: gameArtefacts } = game;

  let updatedArtefactPoints = currentRoundPoints.artefactPoints;
  let updatedNewPoints = newPoints;

  road.artefacts.forEach((artefact) => {
    const gameArtefactIndex = gameArtefacts.findIndex(
      (item) => item.name === artefact.name
    );
    const roundArtefactIndex =
      !roundPoints.length || !roundPoints[roundPoints.length - 1].artefactPoints
        ? -1
        : roundPoints[roundPoints.length - 1].artefactPoints.findIndex(
            (item) => item.name === artefact.name
          );

    const artefactIndex = updatedArtefactPoints.findIndex(
      (item) => item.name === artefact.name
    );

    if (artefactIndex === -1) {
      updatedArtefactPoints.push({
        name: artefact.name,
        pts: isMinor
          ? gameArtefacts[gameArtefactIndex].points.minor.reduce(
              (acc, cur, index) => {
                if (index < artefact.qty) {
                  return acc + cur;
                }
                return acc;
              },
              0
            )
          : gameArtefacts[gameArtefactIndex].points.major.reduce(
              (acc, cur, index) => {
                if (index < artefact.qty) {
                  return acc + cur;
                }
                return acc;
              },
              0
            ),
        totalQty: artefact.qty,
        roundNumber:
          roundArtefactIndex === -1 ||
          roundPoints[roundPoints.length - 1].artefactPoints[roundArtefactIndex]
            .totalQty < artefact.qty
            ? roundNumber
            : roundPoints[roundPoints.length - 1].artefactPoints[
                roundArtefactIndex
              ].roundNumber,
        turnNumber:
          roundArtefactIndex === -1 ||
          roundPoints[roundPoints.length - 1].artefactPoints[roundArtefactIndex]
            .totalQty < artefact.qty
            ? turnNumber
            : roundPoints[roundPoints.length - 1].artefactPoints[
                roundArtefactIndex
              ].turnNumber,
      });

      if (
        roundArtefactIndex === -1 ||
        roundPoints[roundPoints.length - 1].artefactPoints[roundArtefactIndex]
          .totalQty < artefact.qty
      ) {
        updatedNewPoints.artefactPoints.push(
          updatedArtefactPoints[updatedArtefactPoints.length - 1]
        );
      }
    } else {
      const qty = updatedArtefactPoints[artefactIndex].totalQty + artefact.qty;

      updatedArtefactPoints[artefactIndex] = {
        name: artefact.name,
        pts: isMinor
          ? gameArtefacts[gameArtefactIndex].points.minor.reduce(
              (acc, cur, index) => {
                if (index < qty) {
                  return acc + cur;
                }
                return acc;
              },
              0
            )
          : gameArtefacts[gameArtefactIndex].points.major.reduce(
              (acc, cur, index) => {
                if (index < qty) {
                  return acc + cur;
                }
                return acc;
              },
              0
            ),
        totalQty: qty,
        roundNumber:
          roundArtefactIndex === -1 ||
          roundPoints[roundPoints.length - 1].artefactPoints[roundArtefactIndex]
            .totalQty < qty
            ? roundNumber
            : roundPoints[roundPoints.length - 1].artefactPoints[
                roundArtefactIndex
              ].roundNumber,
        turnNumber:
          roundArtefactIndex === -1 ||
          roundPoints[roundPoints.length - 1].artefactPoints[roundArtefactIndex]
            .totalQty < qty
            ? turnNumber
            : roundPoints[roundPoints.length - 1].artefactPoints[
                roundArtefactIndex
              ].turnNumber,
      };

      if (
        roundArtefactIndex === -1 ||
        roundPoints[roundPoints.length - 1].artefactPoints[roundArtefactIndex]
          .totalQty < qty
      ) {
        updatedNewPoints.artefactPoints.push(
          updatedArtefactPoints[artefactIndex]
        );
      }
    }
  });

  return { updatedArtefactPoints, updatedNewPoints };
};

export const updateBonusArtefactPoints = (
  road,
  roundPoints,
  game,
  currentRoundPoints,
  newPoints
) => {
  const { roundNumber, turnNumber, bonusArtefact } = game;

  let updatedBonusArtefactPoints = currentRoundPoints.bonusArtefactPoints;
  let updatedNewPoints = newPoints;

  road.artefacts.forEach((artefact) => {
    const roundBonusArtefactIndex =
      !roundPoints.length ||
      !roundPoints[roundPoints.length - 1].bonusArtefactPoints
        ? -1
        : roundPoints[roundPoints.length - 1].bonusArtefactPoints.findIndex(
            (item) => item.name === artefact.name
          );

    if (
      (artefact.qty === 2 || artefact.qty === 3) &&
      bonusArtefact.name === artefact.name &&
      (!bonusArtefact.bonusAwarded || roundBonusArtefactIndex !== -1)
    ) {
      updatedBonusArtefactPoints.push({
        name: bonusArtefact.name,
        pts: bonusArtefact.bonusPoints,
        roundNumber:
          roundBonusArtefactIndex === -1
            ? roundNumber
            : roundPoints[roundPoints.length - 1].bonusArtefactPoints[
                roundBonusArtefactIndex
              ].roundNumber,
        turnNumber:
          roundBonusArtefactIndex === -1
            ? turnNumber
            : roundPoints[roundPoints.length - 1].bonusArtefactPoints[
                roundBonusArtefactIndex
              ].turnNumber,
      });

      if (roundBonusArtefactIndex === -1) {
        updatedNewPoints.bonusArtefactPoints.push(
          updatedBonusArtefactPoints[updatedBonusArtefactPoints.length - 1]
        );
      }
    }
  });

  return { updatedBonusArtefactPoints, updatedNewPoints };
};

export const updateBonusArtefactNoCitiesPoints = (
  road,
  roundPoints,
  game,
  currentRoundPoints,
  newPoints
) => {
  const { roundNumber, turnNumber, bonusArtefact } = game;

  let updatedBonusArtefactPoints = currentRoundPoints.bonusArtefactPoints;
  let updatedNewPoints = newPoints;

  road.artefacts.forEach((artefact) => {
    const roundBonusArtefactIndex =
      !roundPoints.length ||
      !roundPoints[roundPoints.length - 1].bonusArtefactPoints
        ? -1
        : roundPoints[roundPoints.length - 1].bonusArtefactPoints.findIndex(
            (item) => item.name === artefact.name
          );

    if (
      (artefact.qty === 2 || artefact.qty === 3) &&
      bonusArtefact.name === artefact.name &&
      (!bonusArtefact.bonusAwarded || roundBonusArtefactIndex !== -1)
    ) {
      updatedBonusArtefactPoints.push({
        name: bonusArtefact.name,
        pts: bonusArtefact.bonusPoints,
        roundNumber:
          roundBonusArtefactIndex === -1
            ? roundNumber
            : roundPoints[roundPoints.length - 1].bonusArtefactPoints[
                roundBonusArtefactIndex
              ].roundNumber,
        turnNumber:
          roundBonusArtefactIndex === -1
            ? turnNumber
            : roundPoints[roundPoints.length - 1].bonusArtefactPoints[
                roundBonusArtefactIndex
              ].turnNumber,
      });

      if (roundBonusArtefactIndex === -1) {
        updatedNewPoints.bonusArtefactPoints.push(
          updatedBonusArtefactPoints[updatedBonusArtefactPoints.length - 1]
        );
      }
    }
  });

  return { updatedBonusArtefactPoints, updatedNewPoints };
};

export const updatePoints = (roads, roundPoints, game) => {
  const { roundNumber } = game;

  let currentRoundPoints = {
    cityPoints: [],
    bonusCityPoints: [],
    artefactPoints: [],
    bonusArtefactPoints: [],
  };

  let newPoints = {
    cityPoints: [],
    bonusCityPoints: [],
    artefactPoints: [],
    bonusArtefactPoints: [],
  };

  roads.forEach((road) => {
    // If road has cities award city and artefact points
    if (road.cities.length) {
      // Award city points and bonus city points
      let updatedCityPoints = updateCityPoints(
        road,
        roundPoints,
        game,
        currentRoundPoints,
        newPoints
      );
      currentRoundPoints.cityPoints =
        updatedCityPoints.updatedRoundPoints.cityPoints;
      currentRoundPoints.bonusCityPoints =
        updatedCityPoints.updatedRoundPoints.bonusCityPoints;
      newPoints = updatedCityPoints.updatedNewPoints;

      // Award artefact points
      let updatedArtefactPoints = updateArtefactPoints(
        road,
        roundPoints,
        game,
        currentRoundPoints,
        newPoints
      );
      currentRoundPoints.artefactPoints =
        updatedArtefactPoints.updatedArtefactPoints;
      newPoints = updatedArtefactPoints.updatedNewPoints;

      // Award artefact bonus points
      let updatedBonusArtefactPoints = updateBonusArtefactPoints(
        road,
        roundPoints,
        game,
        currentRoundPoints,
        newPoints
      );

      currentRoundPoints.bonusArtefactPoints =
        updatedBonusArtefactPoints.updatedBonusArtefactPoints;
      newPoints = updatedBonusArtefactPoints.updatedNewPoints;

      // Check if two / three artefacts are connected without city to award artefact bonus points
    } else {
      let updatedBonusArtefactPoints = updateBonusArtefactNoCitiesPoints(
        road,
        roundPoints,
        game,
        currentRoundPoints,
        newPoints
      );

      currentRoundPoints.bonusArtefactPoints =
        updatedBonusArtefactPoints.updatedBonusArtefactPoints;
      newPoints = updatedBonusArtefactPoints.updatedNewPoints;
    }
  });

  return {
    roundPoints: [
      ...roundPoints.filter((round, index) => index < roundNumber - 1),
      currentRoundPoints,
    ],
    newPoints,
  };
};

export const addCity = (cityName, cities, qty) => {
  let updatedCities = [...cities];
  const cityIndex = updatedCities.findIndex((city) => city.name === cityName);

  // If road doesn't have this city
  if (cityIndex === -1) {
    updatedCities.push({
      name: cityName,
      qty,
    });
    // If the road has this city
  } else {
    updatedCities[cityIndex] = {
      name: cityName,
      qty: updatedCities[cityIndex].qty + qty,
    };
  }

  return updatedCities;
};

export const addArtefact = (artefactName, artefacts, qty) => {
  let updatedArtefacts = [...artefacts];
  const artefactIndex = updatedArtefacts.findIndex(
    (artefact) => artefact.name === artefactName
  );

  // If road doesn't have this artefact
  if (artefactIndex === -1) {
    updatedArtefacts.push({
      name: artefactName,
      qty,
    });
    // If road has this artefact
  } else {
    updatedArtefacts[artefactIndex] = {
      name: artefactName,
      qty: (updatedArtefacts[artefactIndex].qty += qty),
    };
  }

  return updatedArtefacts;
};

export const connectRoads = (roads, roadIndecies) => {
  const updatedRoads = roads.filter(
    (road, index) => index !== roadIndecies[0] && index !== roadIndecies[1]
  );

  const road1 = roads[roadIndecies[0]];
  const road2 = roads[roadIndecies[1]];

  let unitedArtefacts = road1.artefacts;
  let unitedCities = road1.cities;

  road2.artefacts.forEach((artefact) => {
    unitedArtefacts = addArtefact(artefact.name, unitedArtefacts, artefact.qty);
  });

  road2.cities.forEach((city) => {
    unitedCities = addCity(city.name, unitedCities, city.qty);
  });

  const unitedRoad = {
    path: [...road1.path, ...road2.path],
    artefacts: unitedArtefacts,
    cities: unitedCities,
  };

  updatedRoads.push(unitedRoad);

  return updatedRoads;
};

export const addHex = (roads, roadIndex, hex, cityScenario) => {
  let artefacts = roads[roadIndex].artefacts;
  let cities = roads[roadIndex].cities;

  // If hex artefact is not empty
  if (hex.artefact !== NONE) {
    // If hex artefact is a city
    if (hex.artefact.substring(0, 4) === "CITY") {
      const cityName = getCityName(hex.artefact, cityScenario);

      return [
        ...roads.filter((road, index) => index !== roadIndex),
        {
          path: [...roads[roadIndex].path, hex],
          artefacts,
          cities: addCity(cityName, cities, 1),
        },
      ];
    } else {
      const artefactName = getArtefactName(hex.artefact);

      return [
        ...roads.filter((road, index) => index !== roadIndex),
        {
          path: [...roads[roadIndex].path, hex],
          artefacts: addArtefact(artefactName, artefacts, 1),
          cities,
        },
      ];
    }
  }

  return [
    ...roads.filter((road, index) => index !== roadIndex),
    {
      path: [...roads[roadIndex].path, hex],
      artefacts,
      cities,
    },
  ];
};

export const createRoad = (roads, path, cityScenario) => {
  let artefacts = [];
  let cities = [];

  path.forEach((hex) => {
    if (hex.artefact !== NONE) {
      if (hex.artefact.substring(0, 4) === "CITY") {
        cities.push({
          name: getCityName(hex.artefact, cityScenario),
          qty: 1,
        });
      } else {
        artefacts.push({
          name: getArtefactName(hex.artefact),
          qty: 1,
        });
      }
    }
  });

  return [
    ...roads,
    {
      path,
      artefacts,
      cities,
    },
  ];
};

export const getUpdatedTurn = (path, turn, game) => {
  const roadIndecies = findRoadIndecies(turn.roads, path);
  let updatedRoads = [];

  // Both hexes are in the existing roads
  if (roadIndecies[0] !== -1 && roadIndecies[1] !== -1) {
    updatedRoads = connectRoads(turn.roads, roadIndecies);
    // One of the hexes is in the existing roads
  } else if (roadIndecies[0] !== -1) {
    updatedRoads = addHex(
      turn.roads,
      roadIndecies[0],
      path[1],
      game.cityScenario
    );
  } else if (roadIndecies[1] !== -1) {
    updatedRoads = addHex(
      turn.roads,
      roadIndecies[1],
      path[0],
      game.cityScenario
    );
    // Both hexes are not in the existing roads
  } else {
    updatedRoads = createRoad(turn.roads, path, game.cityScenario);
  }

  let updatedPoints = updatePoints(updatedRoads, turn.roundPoints, game);
  let updatedBonusMoves = updateBonusMoves(
    updatedPoints.roundPoints,
    turn.bonusMoves,
    game
  );

  return {
    roads: updatedRoads,
    roundPoints: updatedPoints.roundPoints,
    bonusMoves: updatedBonusMoves,
    isBonusMove:
      updatedBonusMoves.filter((item) => item.moveIsMade === false).length !==
      0,
    newPoints: newPointsToArray(updatedPoints.newPoints),
  };
};
