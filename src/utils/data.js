import { CHARACTER_CLASS } from "./enum";
import paladin from "../asserts/data/paladin.json";
import guerrier from "../asserts/data/guerrier.json";
import chaman from "../asserts/data/chaman.json";
import pretre from "../asserts/data/pretre.json";

import backgroundPaladin from "../asserts/images/paladin/background_filter.png";
import backgroundGuerrier from "../asserts/images/guerrier/background_filter.png";
import backgroundChaman from "../asserts/images/chaman/background_filter.png";
import backgroundPretre from "../asserts/images/pretre/background_filter.png";

export const getDataSkillTree = (character) => {
  switch (character) {
    case CHARACTER_CLASS.PALADIN: {
      return paladin;
    }
    case CHARACTER_CLASS.CHAMAN: {
      return chaman;
    }
    case CHARACTER_CLASS.PRETRE: {
      return pretre;
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
    case CHARACTER_CLASS.PRETRE: {
      return backgroundPretre;
    }
    default:
    case CHARACTER_CLASS.GUERRIER: {
      return backgroundGuerrier;
    }
  }
};

export const hasSkillTree = (character) => {
  return [
    CHARACTER_CLASS.PALADIN,
    CHARACTER_CLASS.CHAMAN,
    CHARACTER_CLASS.PRETRE,
    CHARACTER_CLASS.GUERRIER,
  ].includes(character);
};
