import {
  OBELISK,
  BOOK,
  TOUCAN,
  YETI,
  DRAGON,
  // CITY0,
  // CITY1,
  // CITY2,
  // CITY3,
  // CITY4,
  // CITY5,
  // CITY6,
  // CITY7,
  // CITY8,
  // CITY9,
  NONE,
} from "../constants/artefactConstants";
import { HexUtils } from "react-hexgrid";
// import artefacts from "../../../data/artefacts";
// import { updateTurn } from "../actions/gameActions";

export const getBonusArtefact = (name) => {
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
  // console.log(cityScenarioIndex);
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

const updatePoints = (roads, roundPoints, game) => {
  const {
    isMinor,
    roundNumber,
    cityScenario,
    artefacts: gameArtefacts,
    bonusArtefact,
    cities: gameCities,
    players,
  } = game;

  let currentRoundPoints = {
    cityPoints: [],
    bonusCityPoints: [],
    artefactPoints: [],
    bonusArtefactPoints: [],
  };

  roads.forEach((road) => {
    // If road has cities award city and artefact points
    if (road.cities.length) {
      // Award city points and bonus city points
      road.cities.forEach((city) => {
        if (city.qty === 2) {
          // const cityScenarioIndex = city.name.substring(4, 0);
          // const cityName = cityScenario[cityScenarioIndex];
          const gameCityIndex = gameCities.findIndex(
            (item) => item.name === city.name
          );

          // Update city points
          currentRoundPoints.cityPoints.push({
            name: city.name,
            pts: isMinor
              ? gameCities[gameCityIndex].points.minor
              : gameCities[gameCityIndex].points.major,
          });

          // Award bonus city points if available
          if (
            !gameCities[gameCityIndex].bonusAwarded[0] ||
            (players.length >= 4 && !gameCities[gameCityIndex].bonusAwarded[1])
          ) {
            const bonusCityAllRounds = roundPoints
              .map((round) => round.bonusCityPoints)
              .flat();
            const bonusCityIndex = bonusCityAllRounds.findIndex(
              (bonusCity) => bonusCity.name === city.name
            );

            if (bonusCityIndex === -1) {
              if (!gameCities[gameCityIndex].bonusAwarded[0]) {
                currentRoundPoints.bonusCityPoints.push({
                  name: city.name,
                  pts: gameCities[gameCityIndex].bonusPoints[0],
                  bonusAwarded: [true, false],
                });
              } else
                currentRoundPoints.bonusCityPoints.push({
                  name: city.name,
                  pts: gameCities[gameCityIndex].bonusPoints[1],
                  bonusAwarded: [false, true],
                });
            } else {
              currentRoundPoints.bonusCityPoints.push(
                bonusCityAllRounds[bonusCityIndex]
              );
            }
          }
        }
      });

      // Award artefact points
      road.artefacts.forEach((artefact) => {
        // const artefactName = getArtefactName(artefact.name);
        const gameArtefactIndex = gameArtefacts.findIndex(
          (item) => item.name === artefact.name
        );

        const artefactIndex = currentRoundPoints.artefactPoints.findIndex(
          (item) => item.name === artefact.name
        );

        // console.log(artefactIndex);
        // console.log(currentRoundPoints.artefactPoints);
        // console.log(artefact);

        if (artefactIndex === -1) {
          currentRoundPoints.artefactPoints.push({
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
          });
        } else {
          const qty =
            currentRoundPoints.artefactPoints[artefactIndex].totalQty + 1;
          // console.log(currentRoundPoints.artefactPoints[artefactIndex].name);
          // console.log(currentRoundPoints.artefactPoints[artefactIndex].pts);
          // console.log(
          //   currentRoundPoints.artefactPoints[artefactIndex].totalQty
          // );
          // console.log(qty);

          currentRoundPoints.artefactPoints[artefactIndex] = {
            name: artefact.name,
            pts: isMinor
              ? gameArtefacts[gameArtefactIndex].points.minor.reduce(
                  (acc, cur, index) => {
                    if (
                      index <
                      currentRoundPoints.artefactPoints[artefactIndex]
                        .totalQty +
                        1
                    ) {
                      return acc + cur;
                    }
                    return acc;
                  },
                  0
                )
              : gameArtefacts[gameArtefactIndex].points.major.reduce(
                  (acc, cur, index) => {
                    if (
                      index <
                      currentRoundPoints.artefactPoints[artefactIndex]
                        .totalQty +
                        1
                    ) {
                      return acc + cur;
                    }
                    return acc;
                  },
                  0
                ),
            totalQty: qty,
          };
        }
      });
    }

    // Award artefact bonus points
    // road.artefacts.forEach((artefact) => {
    //   const artefactName = getArtefactName(artefact.name);
    //   // const gameArtefactIndex = gameArtefacts.findIndex(
    //   //   (item) => item.name === artefactName
    //   // );

    //   if (artefactName === bonusArtefact.name && artefact.qty >= 2) {
    //     const bonusArtefactAllRounds = roundPoints
    //       .map((round) => round.bonusArtefactPoints)
    //       .flat();
    //     const bonusArtefactIndex = bonusArtefactAllRounds.findIndex(
    //       (bonusArtefact) => bonusArtefact.name === artefact.name
    //     );

    //     if (bonusArtefactIndex === -1) {
    //       if (!bonusArtefact.bonusAwarded) {
    //         currentRoundPoints.bonusArtefactPoints.push({
    //           name: artefact.name,
    //           pts: bonusArtefact.bonusPoints,
    //         });
    //       } else {
    //         currentRoundPoints.bonusArtefactPoints.push({
    //           name: artefact.name,
    //           pts: 0,
    //         });
    //       }
    //     } else {
    //       currentRoundPoints.bonusArtefactPoints =
    //         bonusArtefactAllRounds[bonusArtefactIndex];
    //     }
    //   }
    // });
  });

  // Award artefact bonus points
  currentRoundPoints.artefactPoints.forEach((artefact) => {
    // const artefactName = getArtefactName(artefact.name);
    // const gameArtefactIndex = gameArtefacts.findIndex(
    //   (item) => item.name === artefactName
    // );

    if (artefact.name === bonusArtefact.name && artefact.totalQty >= 2) {
      const bonusArtefactAllRounds = roundPoints
        .map((round) => round.bonusArtefactPoints)
        .flat();
      const bonusArtefactIndex = bonusArtefactAllRounds.findIndex(
        (bonusArtefact) => bonusArtefact.name === artefact.name
      );

      if (bonusArtefactIndex === -1) {
        if (!bonusArtefact.bonusAwarded) {
          currentRoundPoints.bonusArtefactPoints.push({
            name: artefact.name,
            pts: bonusArtefact.bonusPoints,
          });
        } else {
          currentRoundPoints.bonusArtefactPoints.push({
            name: artefact.name,
            pts: 0,
          });
        }
      } else {
        currentRoundPoints.bonusArtefactPoints.push(
          bonusArtefactAllRounds[bonusArtefactIndex]
        );
      }
    }
  });

  return [
    ...roundPoints.filter((round, index) => index < roundNumber - 1),
    currentRoundPoints,
  ];
};

export const connectRoads = (roads, roadIndecies, cityScenario) => {
  const updatedRoads = roads.filter(
    (road, index) => index !== roadIndecies[0] && index !== roadIndecies[1]
  );

  const road1 = roads[roadIndecies[0]];
  const road2 = roads[roadIndecies[1]];

  let unitedArtefacts = road1.artefacts;
  let unitedCities = road1.cities;

  road2.artefacts.forEach((artefact) => {
    const artefactIndex = road1.artefacts.findIndex(
      (item) => item.name === artefact.name
    );

    // No such artefact in road1
    if (artefactIndex === -1) {
      unitedArtefacts.push({
        name: artefact.name,
        qty: artefact.qty,
      });
      // road1 has the same artefact
    } else {
      unitedArtefacts[artefactIndex] = {
        name: artefact.name,
        qty: artefact.qty + road1.artefacts[artefactIndex].qty,
      };
    }
  });

  road2.cities.forEach((city) => {
    const cityIndex = road1.cities.findIndex((item) => item.name === city.name);

    // If no such city in road1
    if (cityIndex === -1) {
      // If there is no such city in road1
      unitedCities.push({
        name: city.name,
        qty: city.qty,
      });
      // If such city exists in road1
    } else {
      unitedCities[cityIndex] = {
        name: city.name,
        qty: city.qty + road1.cities[cityIndex].qty,
      };
    }
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
      const cityIndex = cities.findIndex((city) => city.name === cityName);

      // If road doesn't have this city
      if (cityIndex === -1) {
        cities.push({
          name: cityName,
          qty: 1,
        });
        // If the road has this city
      } else {
        cities[cityIndex] = {
          name: cityName,
          qty: cities[cityIndex].qty + 1,
        };
      }
      // If hex artefact is an artefact
    } else {
      const artefactName = getArtefactName(hex.artefact);
      const artefactIndex = artefacts.findIndex(
        (artefact) => artefact.name === artefactName
      );

      // If road doesn't have this artefact
      if (artefactIndex === -1) {
        artefacts.push({
          name: artefactName,
          qty: 1,
        });
        // If road has this artefact
      } else {
        artefacts[artefactIndex] = {
          name: artefactName,
          qty: (artefacts[artefactIndex].qty += 1),
        };
      }
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

  // console.log(path);
  path.forEach((hex) => {
    if (hex.artefact !== NONE) {
      if (hex.artefact.substring(0, 4) === "CITY") {
        cities.push({
          name: getCityName(hex.artefact, cityScenario),
          qty: 1,
          // pts: 0,
          // bonusPts: 0,
        });
      } else {
        artefacts.push({
          name: getArtefactName(hex.artefact),
          qty: 1,
          // pts: 0,
          // bonusPts: 0,
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

// export const getUpdatedRoads = (roads, roadIndecies, path, game) => {
//   // Both hexes are in the existing roads
//   if (roadIndecies[0] !== -1 && roadIndecies[1] !== -1) {
//     return connectRoads(roads, roadIndecies, game);
//     // One of the hexes is in the existing roads
//   } else if (roadIndecies[0] !== -1) {
//     return addHex(roads, roadIndecies[0], path[1], game);
//   } else if (roadIndecies[1] !== -1) {
//     return addHex(roads, roadIndecies[1], path[0], game);
//     // Both hexes are not in the existing roads
//   } else {
//     return createRoad(roads, path);
//   }
// };

export const getUpdatedTurn = (path, turn, game, paths) => {
  // const roads = turn.roads || [];
  const roadIndecies = findRoadIndecies(turn.roads, path);
  let updatedRoads = [];

  // Both hexes are in the existing roads
  if (roadIndecies[0] !== -1 && roadIndecies[1] !== -1) {
    updatedRoads = connectRoads(turn.roads, roadIndecies, game.cityScenario);
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

  return {
    number: turn.number + 1,
    roads: updatedRoads,
    roundPoints: updatePoints(updatedRoads, turn.roundPoints, game),
    paths,
  };
};
