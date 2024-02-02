import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Line from "../line";
import {
  POSITION_SKILL,
  TRANSFORM_LINE,
  TRANSFORM_SKILL,
  getCustomTransformLine,
} from "../../utils/position";
import { STATUS_SKILL } from "../../utils/enum";
import { Tooltip } from "antd";

const StyledLine = styled.span`
  border-left: 3px solid ${(props) => props.color};
  display: inline-block;
  height: 89px;
  margin: 0 20px;
  margin-top: ${(props) => (props.firstSkill ? "0" : "-30")}px;
  transform: ${(props) => props.transform};
  z-index: -1;
  opacity: ${(props) => (props.withoutLine ? "0" : "1")};
`;

const StyledImage = styled.img`
  &:hover {
    box-shadow: 0px 0px 9px white;
    transition: all 0.3s ease-out;
  }
  position: relative;
  width: ${(props) => (props.isSquare ? "50" : "55")}px;
  height: ${(props) => (props.isSquare ? "50" : "55")}px;
  margin-top: -${(props) => (props.isSquare ? "8" : "10")}px;
  margin-left: -${(props) => (props.isSquare ? "6" : "8")}px;
  border: 3px solid ${(props) => props.color};
  transform: ${(props) => props.transform};
  z-index: 5;
  filter: grayscale(${(props) => (props.grayscale ? 0 : 1)});
  border-radius: ${(props) => (props.isSquare ? "0" : "50")}px;
`;

const SkillStyled = styled.div`
  width: 50px;
  height: auto;
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
`;

const TextStyled = styled.div`
  width: 200px;
  height: auto;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  position: absolute;
  font-weight: 700;
  opacity: 0;
  z-index: 3;
`;

const Skill = ({
  item,
  firstSkill,
  top,
  left,
  skillColor,
  lineColor,
  visual,
  onSelect,
  skills,
  character,
}) => {
  const [transformLine, setTransformLine] = useState(TRANSFORM_LINE.MIDDLE);
  const [transformSkill, setTransformSkill] = useState(TRANSFORM_SKILL.MIDDLE);
  const [currentSkillColor, setCurrentSkillColor] = useState(skillColor);

  useEffect(() => {
    if (visual) {
      setCurrentSkillColor(skillColor);
    } else {
      switch (item.status) {
        case STATUS_SKILL.IS_SELECTED:
          setCurrentSkillColor(skillColor);
          break;
        case STATUS_SKILL.CAN_BE_SELECTED:
          setCurrentSkillColor("green");
          break;
        case STATUS_SKILL.CANNOT_BE_SELECTED:
          setCurrentSkillColor("gray");
          break;
        default:
          break;
      }
    }
  }, [item.status, skillColor, lineColor, visual]);

  useEffect(() => {
    switch (item.position) {
      case POSITION_SKILL.LEFT: {
        setTransformLine(TRANSFORM_LINE.LEFT);
        setTransformSkill(TRANSFORM_SKILL.LEFT);
        break;
      }
      case POSITION_SKILL.LEFT_BOTTOM: {
        setTransformLine(TRANSFORM_LINE.LEFT_BOTTOM);
        setTransformSkill(TRANSFORM_SKILL.LEFT_BOTTOM);
        break;
      }
      default:
      case POSITION_SKILL.MIDDLE: {
        setTransformLine(TRANSFORM_LINE.MIDDLE);
        setTransformSkill(TRANSFORM_SKILL.MIDDLE);
        break;
      }
      case POSITION_SKILL.RIGHT: {
        setTransformLine(TRANSFORM_LINE.RIGHT);
        setTransformSkill(TRANSFORM_SKILL.RIGHT);
        break;
      }
      case POSITION_SKILL.RIGHT_BOTTOM: {
        setTransformLine(TRANSFORM_LINE.RIGHT_BOTTOM);
        setTransformSkill(TRANSFORM_SKILL.RIGHT_BOTTOM);
        break;
      }
    }
    if (item.customLineTranslate) {
      setTransformLine(getCustomTransformLine(item.customLineTranslate));
    }
  }, [item]);

  const handleSelect = () => {
    onSelect(item, skills);
  };

  const renderTooltip = () => {
    return (
      <>
        {item.improvementOf !== null && (
          <>
            <span style={{ fontStyle: "italic" }}>
              Amélioration de '{item.improvementOf[1]}'
            </span>
            <br />
          </>
        )}
        <>{item.text}</>
      </>
    );
  };

  const generateSkill = () => {
    return (
      <SkillStyled top={`${top}px`} left={`${left}px`}>
        <StyledLine
          transform={transformLine}
          color={visual || item.hasLineColor ? lineColor : "gray"}
          firstSkill={firstSkill ?? false}
          withoutLine={item.withoutLine}
        />
        {item.image && (
          <Tooltip placement="right" title={renderTooltip}>
            <StyledImage
              onClick={handleSelect}
              color={currentSkillColor}
              transform={transformSkill}
              isSquare={item.isSquare}
              src={require(`../../asserts/images/${character}/${item.image}.jpg`)}
              grayscale={
                visual || item.status !== STATUS_SKILL.CANNOT_BE_SELECTED
              }
            />
          </Tooltip>
        )}
        <TextStyled>{item.text}</TextStyled>
        {item.parentsLines &&
          item.parentsLines.map((line) => (
            <Line
              top={line.top}
              left={line.left}
              color={visual || line.hasLineColor ? lineColor : "gray"}
              rotation={line.rotation}
              translate={line.translate}
              length={line.length}
            />
          ))}
      </SkillStyled>
    );
  };
  return <>{generateSkill()}</>;
};

Skill.propTypes = {
  item: PropTypes.shape(),
  firstSkill: PropTypes.bool,
  top: PropTypes.number,
  left: PropTypes.number,
  skillColor: PropTypes.string,
  lineColor: PropTypes.string,
  visual: PropTypes.bool,
  status: PropTypes.number,
  onSelect: PropTypes.func,
  skills: PropTypes.array,
  character: PropTypes.string,
};

export default Skill;
