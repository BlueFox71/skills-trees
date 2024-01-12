import { CHARACTER_CLASS } from "./enum";
import paladin from "../asserts/data/paladin.json";

export const getDataSkillTree = (character) => {
  switch (character) {
    case CHARACTER_CLASS.PALADIN: {
      return paladin;
    }
    default:
    case CHARACTER_CLASS.GUERRIER: {
      return paladin;
    }
  }
};