import { SAND, FOREST, STONE, WATER } from "../constants/landscapeConstants";
import {
  OBELISK,
  BOOK,
  TOUCAN,
  YETI,
  DRAGON,
  CITY,
  NONE,
} from "../constants/artefactConstants";

export const minorGrid = [
  {
    q: 0,
    r: -5,
    s: 5,

    landscape: SAND,
    artefact: NONE,
  },
  {
    q: 1,
    r: -5,
    s: 4,

    landscape: SAND,
    artefact: NONE,
  },
  {
    q: 2,
    r: -5,
    s: 3,

    landscape: STONE,
    artefact: CITY,
  },
  {
    q: 3,
    r: -5,
    s: 2,

    landscape: STONE,
    artefact: NONE,
  },
  {
    q: 4,
    r: -5,
    s: 1,

    landscape: FOREST,
    artefact: NONE,
  },
  {
    q: -1,
    r: -4,
    s: 5,

    landscape: STONE,
    artefact: CITY,
  },
  {
    q: 0,
    r: -4,
    s: 4,

    landscape: FOREST,
    artefact: NONE,
  },
  {
    q: 1,
    r: -4,
    s: 3,

    landscape: STONE,
    artefact: NONE,
  },
  {
    q: 2,
    r: -4,
    s: 2,

    landscape: WATER,
    artefact: NONE,
  },
  {
    q: 3,
    r: -4,
    s: 1,

    landscape: SAND,
    artefact: NONE,
  },
  {
    q: 4,
    r: -4,
    s: 0,

    landscape: FOREST,
    artefact: CITY,
  },
  {
    q: -2,
    r: -3,
    s: 5,

    landscape: FOREST,
    artefact: NONE,
  },
  {
    q: -1,
    r: -3,
    s: 4,

    landscape: STONE,
    artefact: NONE,
  },
  {
    q: 0,
    r: -3,
    s: 3,

    landscape: FOREST,
    artefact: TOUCAN,
  },
  {
    q: 1,
    r: -3,
    s: 2,

    landscape: WATER,
    artefact: NONE,
  },
  {
    q: 2,
    r: -3,
    s: 1,

    landscape: SAND,
    artefact: OBELISK,
  },
  {
    q: 3,
    r: -3,
    s: 0,

    landscape: STONE,
    artefact: NONE,
  },
  {
    q: 4,
    r: -3,
    s: -1,

    landscape: SAND,
    artefact: NONE,
  },
  {
    q: -3,
    r: -2,
    s: 5,

    landscape: SAND,
    artefact: CITY,
  },
  {
    q: -2,
    r: -2,
    s: 4,

    landscape: FOREST,
    artefact: NONE,
  },
  {
    q: -1,
    r: -2,
    s: 3,

    landscape: SAND,
    artefact: NONE,
  },
  {
    q: 0,
    r: -2,
    s: 2,

    landscape: FOREST,
    artefact: NONE,
  },
  {
    q: 1,
    r: -2,
    s: 1,

    landscape: FOREST,
    artefact: NONE,
  },
  {
    q: 2,
    r: -2,
    s: 0,

    landscape: SAND,
    artefact: NONE,
  },
  {
    q: 3,
    r: -2,
    s: -1,

    landscape: STONE,
    artefact: NONE,
  },
  {
    q: 4,
    r: -2,
    s: -2,

    landscape: SAND,
    artefact: CITY,
  },
  {
    q: -4,
    r: -1,
    s: 5,

    landscape: SAND,
    artefact: NONE,
  },
  {
    q: -3,
    r: -1,
    s: 4,

    landscape: WATER,
    artefact: NONE,
  },
  {
    q: -2,
    r: -1,
    s: 3,

    landscape: WATER,
    artefact: NONE,
  },
  {
    q: -1,
    r: -1,
    s: 2,

    landscape: STONE,
    artefact: YETI,
  },
  {
    q: 0,
    r: -1,
    s: 1,

    landscape: SAND,
    artefact: NONE,
  },
  {
    q: 1,
    r: -1,
    s: 0,

    landscape: WATER,
    artefact: NONE,
  },
  {
    q: 2,
    r: -1,
    s: -1,

    landscape: FOREST,
    artefact: BOOK,
  },
  {
    q: 3,
    r: -1,
    s: -2,

    landscape: FOREST,
    artefact: NONE,
  },
  {
    q: 4,
    r: -1,
    s: -3,

    landscape: SAND,
    artefact: NONE,
  },
  {
    q: -4,
    r: 0,
    s: 4,

    landscape: FOREST,
    artefact: NONE,
  },
  {
    q: -3,
    r: 0,
    s: 3,

    landscape: STONE,
    artefact: NONE,
  },
  {
    q: -2,
    r: 0,
    s: 2,

    landscape: STONE,
    artefact: NONE,
  },
  {
    q: -1,
    r: 0,
    s: 1,

    landscape: SAND,
    artefact: NONE,
  },
  {
    q: 0,
    r: 0,
    s: 0,

    landscape: WATER,
    artefact: DRAGON,
  },
  {
    q: 1,
    r: 0,
    s: -1,

    landscape: SAND,
    artefact: NONE,
  },
  {
    q: 2,
    r: 0,
    s: -2,

    landscape: WATER,
    artefact: NONE,
  },
  {
    q: 3,
    r: 0,
    s: -3,

    landscape: STONE,
    artefact: NONE,
  },
  {
    q: 4,
    r: 0,
    s: -4,

    landscape: FOREST,
    artefact: NONE,
  },
  {
    q: -4,
    r: 1,
    s: 3,

    landscape: SAND,
    artefact: CITY,
  },
  {
    q: -3,
    r: 1,
    s: 2,

    landscape: SAND,
    artefact: NONE,
  },
  {
    q: -2,
    r: 1,
    s: 1,

    landscape: FOREST,
    artefact: BOOK,
  },
  {
    q: -1,
    r: 1,
    s: 0,

    landscape: FOREST,
    artefact: NONE,
  },
  {
    q: 0,
    r: 1,
    s: -1,

    landscape: WATER,
    artefact: NONE,
  },
  {
    q: 1,
    r: 1,
    s: -2,

    landscape: FOREST,
    artefact: TOUCAN,
  },
  {
    q: 2,
    r: 1,
    s: -3,

    landscape: WATER,
    artefact: NONE,
  },
  {
    q: 3,
    r: 1,
    s: -4,

    landscape: SAND,
    artefact: CITY,
  },
  {
    q: -5,
    r: 2,
    s: 3,

    landscape: SAND,
    artefact: NONE,
  },
  {
    q: -4,
    r: 2,
    s: 2,

    landscape: STONE,
    artefact: NONE,
  },
  {
    q: -3,
    r: 2,
    s: 1,

    landscape: FOREST,
    artefact: NONE,
  },
  {
    q: -2,
    r: 2,
    s: 0,

    landscape: WATER,
    artefact: NONE,
  },
  {
    q: -1,
    r: 2,
    s: -1,

    landscape: SAND,
    artefact: OBELISK,
  },
  {
    q: 0,
    r: 2,
    s: -2,

    landscape: FOREST,
    artefact: NONE,
  },
  {
    q: 1,
    r: 2,
    s: -3,

    landscape: SAND,
    artefact: NONE,
  },
  {
    q: 2,
    r: 2,
    s: -4,

    landscape: SAND,
    artefact: NONE,
  },
  {
    q: -6,
    r: 3,
    s: 3,

    landscape: STONE,
    artefact: YETI,
  },
  {
    q: -5,
    r: 3,
    s: 2,

    landscape: STONE,
    artefact: NONE,
  },
  {
    q: -4,
    r: 3,
    s: 1,

    landscape: FOREST,
    artefact: CITY,
  },
  {
    q: -3,
    r: 3,
    s: 0,

    landscape: WATER,
    artefact: NONE,
  },
  {
    q: -2,
    r: 3,
    s: -1,

    landscape: FOREST,
    artefact: NONE,
  },
  {
    q: -1,
    r: 3,
    s: -2,

    landscape: SAND,
    artefact: NONE,
  },
  {
    q: 0,
    r: 3,
    s: -3,

    landscape: STONE,
    artefact: CITY,
  },
  {
    q: 1,
    r: 3,
    s: -4,

    landscape: STONE,
    artefact: NONE,
  },
  {
    q: -4,
    r: 4,
    s: 0,

    landscape: SAND,
    artefact: NONE,
  },
  {
    q: -3,
    r: 4,
    s: -1,

    landscape: SAND,
    artefact: NONE,
  },
  {
    q: -2,
    r: 4,
    s: -2,

    landscape: FOREST,
    artefact: CITY,
  },
  {
    q: 0,
    r: 4,
    s: -4,

    landscape: WATER,
    artefact: NONE,
  },
  {
    q: 1,
    r: 4,
    s: -5,

    landscape: WATER,
    artefact: DRAGON,
  },
];
