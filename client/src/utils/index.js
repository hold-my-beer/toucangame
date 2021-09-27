import {
  OBELISK,
  BOOK,
  TOUCAN,
  YETI,
  DRAGON,
} from "../constants/artefactConstants";

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
