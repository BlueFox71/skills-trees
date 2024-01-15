import { CHARACTER_CLASS } from "./enum";
import paladin from "../asserts/data/paladin.json";
import guerrier from "../asserts/data/guerrier.json";
import chaman from "../asserts/data/chaman.json";

import backgroundPaladin from "../asserts/images/paladin/background_filter.png";
import backgroundGuerrier from "../asserts/images/guerrier/background_filter.png";
import backgroundChaman from "../asserts/images/chaman/background_filter.png";

export const getDataSkillTree = (character) => {
  switch (character) {
    case CHARACTER_CLASS.PALADIN: {
      return paladin;
    }
    case CHARACTER_CLASS.CHAMAN: {
      return chaman;
    }
    default:
    case CHARACTER_CLASS.GUERRIER: {
      return guerrier;
    }
  }
};

export const getBackgroundSection = (character) => {
  switch (character) {
    case CHARACTER_CLASS.PALADIN: {
      return backgroundPaladin;
    }
    case CHARACTER_CLASS.CHAMAN: {
      return backgroundChaman;
    }
    default:
    case CHARACTER_CLASS.GUERRIER: {
      return backgroundGuerrier;
    }
  }
};
