import { CHARACTER_CLASS } from "./enum";
import paladin from "../asserts/data/paladin.json";
import guerrier from "../asserts/data/guerrier.json";
import backgroundPaladin from "../asserts/images/paladin/background_filter.png";
import backgroundGuerrier from "../asserts/images/guerrier/background_filter.png";

export const getDataSkillTree = (character) => {
  switch (character) {
  
    case CHARACTER_CLASS.PALADIN: {
      return paladin;
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
    default:
    case CHARACTER_CLASS.GUERRIER: {
      return backgroundGuerrier;
    }
  }
};
