export const addTop = (position, parentPosition, topToAdd) => {
  if (topToAdd) {
    return topToAdd;
  }
  switch (position) {
    case POSITION_SKILL.MIDDLE:
      if (POSITION_SKILL.MIDDLE === parentPosition) return 90;
      if (POSITION_SKILL.LEFT_BOTTOM === parentPosition) return 50;
      if (POSITION_SKILL.RIGHT_BOTTOM === parentPosition) return 60;
      if (POSITION_SKILL.LEFT === parentPosition) return 30;
      if (POSITION_SKILL.RIGHT === parentPosition) return 50;
      return 0;
    case POSITION_SKILL.LEFT_BOTTOM:
      if (POSITION_SKILL.MIDDLE === parentPosition) return 130;
      if (POSITION_SKILL.LEFT_BOTTOM === parentPosition) return 90;
      if (POSITION_SKILL.RIGHT_BOTTOM === parentPosition) return 90;
      if (POSITION_SKILL.LEFT === parentPosition) return 60;
      if (POSITION_SKILL.RIGHT === parentPosition) return 70;
      return 0;
    case POSITION_SKILL.RIGHT_BOTTOM:
      if (POSITION_SKILL.MIDDLE === parentPosition) return 120;
      if (POSITION_SKILL.LEFT_BOTTOM === parentPosition) return 90;
      if (POSITION_SKILL.RIGHT_BOTTOM === parentPosition) return 90;
      if (POSITION_SKILL.LEFT === parentPosition) return 70;
      if (POSITION_SKILL.RIGHT === parentPosition) return 80;
      return 0;
    case POSITION_SKILL.LEFT:
      if (POSITION_SKILL.MIDDLE === parentPosition) return 70;
      if (POSITION_SKILL.LEFT_BOTTOM === parentPosition) return 40;
      if (POSITION_SKILL.RIGHT_BOTTOM === parentPosition) return 30;
      if (POSITION_SKILL.LEFT === parentPosition) return 0;
      return 0;
    case POSITION_SKILL.RIGHT:
      if (POSITION_SKILL.MIDDLE === parentPosition) return 50;
      if (POSITION_SKILL.LEFT_BOTTOM === parentPosition) return 20;
      if (POSITION_SKILL.RIGHT_BOTTOM === parentPosition) return 10;
      if (POSITION_SKILL.RIGHT === parentPosition) return 0;
      return 0;
    default:
      return 0;
  }
};

export const addLeft = (position, parentPosition, leftToAdd) => {
  if (leftToAdd) {
    return leftToAdd;
  }
  switch (position) {
    case POSITION_SKILL.MIDDLE:
      if (POSITION_SKILL.MIDDLE === parentPosition) return 0;
      if (POSITION_SKILL.LEFT_BOTTOM === parentPosition) return -60;
      if (POSITION_SKILL.RIGHT_BOTTOM === parentPosition) return 36;
      if (POSITION_SKILL.LEFT === parentPosition) return -50;
      if (POSITION_SKILL.RIGHT === parentPosition) return 50;
      return 0;
    case POSITION_SKILL.RIGHT_BOTTOM:
      if (POSITION_SKILL.MIDDLE === parentPosition) return 15;
      if (POSITION_SKILL.LEFT_BOTTOM === parentPosition) return -40;
      if (POSITION_SKILL.RIGHT_BOTTOM === parentPosition) return 55;
      if (POSITION_SKILL.LEFT === parentPosition) return -30;
      if (POSITION_SKILL.RIGHT === parentPosition) return 80;
      return 0;
    case POSITION_SKILL.LEFT_BOTTOM:
      if (POSITION_SKILL.MIDDLE === parentPosition) return -20;
      if (POSITION_SKILL.LEFT_BOTTOM === parentPosition) return -80;
      if (POSITION_SKILL.RIGHT_BOTTOM === parentPosition) return 30;
      if (POSITION_SKILL.LEFT === parentPosition) return -50;
      if (POSITION_SKILL.RIGHT === parentPosition) return 40;
      return 0;
    case POSITION_SKILL.RIGHT:
      if (POSITION_SKILL.MIDDLE === parentPosition) return 70;
      if (POSITION_SKILL.LEFT_BOTTOM === parentPosition) return 10;
      if (POSITION_SKILL.RIGHT_BOTTOM === parentPosition) return 100;
      if (POSITION_SKILL.LEFT === parentPosition) return 115;
      return 0;
    case POSITION_SKILL.LEFT:
      if (POSITION_SKILL.MIDDLE === parentPosition) return -60;
      if (POSITION_SKILL.LEFT_BOTTOM === parentPosition) return -120;
      if (POSITION_SKILL.RIGHT_BOTTOM === parentPosition) return -30;
      if (POSITION_SKILL.RIGHT === parentPosition) return -110;
      return 0;
    default:
      return 0;
  }
};

export const POSITION_SKILL = {
  LEFT: "left",
  LEFT_BOTTOM: "left-bottom",
  MIDDLE: "middle",
  RIGHT: "right",
  RIGHT_BOTTOM: "right-bottom",
};

export const ALIGN_SKILL = {
  LEFT: "left",
  LEFT_BOTTOM: "left-bottom",
  MIDDLE: "middle",
  RIGHT: "right",
  RIGHT_BOTTOM: "right-bottom",
};

export const TRANSFORM_LINE = {
  RIGHT: "rotate(90deg) translate(25px,0)",
  RIGHT_BOTTOM: "rotate(-40deg) translate(13px,3px)",
  MIDDLE: "rotate(0deg) translate(1px,8px)",
  LEFT_BOTTOM: "rotate(45deg) translate(-30px,10px)",
  LEFT: "rotate(90deg) translate(20px,-10px)",
};

export const TRANSFORM_SKILL = {
  RIGHT: "translate(50px,-40px)",
  RIGHT_BOTTOM: "translate(35px,-30px)",
  MIDDLE: "translate(0,0)",
  LEFT_BOTTOM: "translate(-60px,-40px)",
  LEFT: "translate(-50px,-50px)",
};
