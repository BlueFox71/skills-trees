import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";

import styled from "styled-components";

import Skill from "./skill";
import { addLeft, addTop } from "../utils/position";
import Line from "./line";
import { STATUS_SKILL } from "../utils/enum";
import DashBoard from "./dashboard";

const RootStyled = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left}px;
`;

const SpanStyled = styled.span`
  position: absolute;
  top: -15px;
  left: ${(props) => props.left}px;
  width: 500px;
  color: ${(props) => props.color};
  text-transform: uppercase;
  font-size: 15px;
  font-family: "Goudy Stout";
`;

const SkillTree = ({
  character,
  visual,
  points,
  simulationInProgress,
  data,
}) => {
  const [rootLineColor, setRootLineColor] = useState("gray");
  const [currentSkills, setCurrentSkills] = useState([]);
  const [remainingPoints, setRemainingPoints] = useState(points);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [level, setLevel] = useState(0);

  const handleSelectSkill = useCallback(
    (item) => {
      if (!visual && simulationInProgress && remainingPoints > 0) {
        const childrens = currentSkills.filter((x) =>
          x.props.item.parentId?.includes(item.id)
        );
        if (item.status === STATUS_SKILL.CAN_BE_SELECTED) {
          //talent sélectionné
          setRemainingPoints(remainingPoints - 1);
          setLevel(level + 1);
          setSelectedSkills([...selectedSkills, item]);
          item.status = STATUS_SKILL.IS_SELECTED;
          childrens.forEach((child) => {
            if (child.props.item.status !== STATUS_SKILL.IS_SELECTED) {
              child.props.item.status = STATUS_SKILL.CAN_BE_SELECTED;
            }

            if (child.props.item.parentId[0] === item.id) {
              child.props.item.hasLineColor = true;
            } else {
              const index = child.props.item.parentId.indexOf(item.id);
              if (index !== -1) {
                child.props.item.parentsLines[index - 1].hasLineColor = true;
              }
            }
            if (
              child.props.item.image === null &&
              child.props.item.parentsLines?.length
            ) {
              child.props.item.parentsLines[0].hasLineColor = true;
            }
          });
          //double direction coté item sélectionné
          if (item.parentsLines && item.parentsLines) {
            item.parentsLines.forEach((parent) => {
              if (parent.directionDouble) {
                parent.hasLineColor = true;
                const child = currentSkills.find(
                  (x) => x.props.item.id === parent.directionDouble
                );
                if (child.props.item.status !== STATUS_SKILL.IS_SELECTED) {
                  child.props.item.status = STATUS_SKILL.CAN_BE_SELECTED;
                }
              }
            });
          }
          //vérifie si un skill a une parent ligne liée à celui-ci
          currentSkills.forEach((x) =>
            x.props.item.parentsLines?.forEach((parent) => {
              if (parent.directionDouble === item.id) {
                parent.hasLineColor = true;
                if (x.props.item.status !== STATUS_SKILL.IS_SELECTED) {
                  x.props.item.status = STATUS_SKILL.CAN_BE_SELECTED;
                }
              }
            })
          );
          //vérifie si un skill a une ligne liée à celui-ci
          currentSkills.forEach((x) => {
            const directionDouble = x.props.item.directionDouble;
            if (directionDouble && directionDouble[0] === item.id) {
              if (directionDouble[1] === "parent") {
                x.props.item.parentsLines[0].hasLineColor = true;
              } else {
                item.hasLineColor = true;
              }
              if (x.props.item.status !== STATUS_SKILL.IS_SELECTED) {
                x.props.item.status = STATUS_SKILL.CAN_BE_SELECTED;
              }
            }
          });

          if (item.id === "r-4") {
            setRootLineColor(data.lineColor);
          }
        } else if (
          //talent désélectionné
          item.status === STATUS_SKILL.IS_SELECTED &&
          item.id !== "r-1"
        ) {
          let hasSelectedChild = false;
          childrens.forEach((child) => {
            if (child.props.item.status === STATUS_SKILL.IS_SELECTED) {
              hasSelectedChild = true;
            }
          });
          if (!hasSelectedChild) {
            setRemainingPoints(remainingPoints + 1);
            setLevel(level - 1);

            const index = selectedSkills.findIndex((x) => x.id === item.id);
            selectedSkills.splice(index, 1);

            item.status = STATUS_SKILL.CAN_BE_SELECTED;
            if (item.id === "r-4") {
              setRootLineColor("gray");
            }
            childrens.forEach((child) => {
              child.props.item.status = STATUS_SKILL.CANNOT_BE_SELECTED;
              child.props.item.hasLineColor = false;
              if (child.props.item.parentsLines?.length) {
                child.props.item.parentsLines[0].hasLineColor = false;
              }
            });
          }

          //double direction coté item désélectionné
          if (item.parentsLines && item.parentsLines) {
            item.parentsLines.forEach((parent) => {
              if (parent.directionDouble) {
                const child = currentSkills.find(
                  (x) => x.props.item.id === parent.directionDouble
                );
                if (child.props.item.status !== STATUS_SKILL.CAN_BE_SELECTED) {
                  parent.hasLineColor = false;
                  child.props.item.status = STATUS_SKILL.CANNOT_BE_SELECTED;
                }
              }
            });
          }
          //vérifie si un skill a une parent ligne liée à celui-ci
          currentSkills.forEach((x) =>
            x.props.item.parentsLines?.forEach((parent) => {
              if (parent.directionDouble === item.id) {
                if (x.props.item.status !== STATUS_SKILL.CAN_BE_SELECTED) {
                  parent.hasLineColor = false;
                  x.props.item.status = STATUS_SKILL.CANNOT_BE_SELECTED;
                }
              }
            })
          );
          //vérifie si un skill a une ligne liée à celui-ci
          currentSkills.forEach((x) => {
            if (x.props.item.directionDouble === item.id) {
              if (x.props.item.status !== STATUS_SKILL.CAN_BE_SELECTED) {
                x.props.item.hasLineColor = false;
                x.props.item.status = STATUS_SKILL.CANNOT_BE_SELECTED;
              }
            }
          });
        }
      }
    },
    [
      currentSkills,
      data,
      remainingPoints,
      visual,
      level,
      selectedSkills,
      simulationInProgress,
    ]
  );

  const getSkill = useCallback(
    (item, top, left, lineColor, skillColor, first) => {
      return (
        <Skill
          key={item.id}
          item={item}
          firstSkill={first}
          top={top}
          left={left}
          lineColor={lineColor}
          skillColor={skillColor}
          onSelect={handleSelectSkill}
          visual={visual}
          character={character}
        />
      );
    },
    [visual, handleSelectSkill, character]
  );

  const generateNodes = useCallback(
    (item, top, left, parentPosition, skills, lineColor, skillColor) => {
      if (item.nodes && item.nodes.length > 0) {
        let topNode = top;
        let leftNode = left;
        let parentPositionNode = parentPosition;
        item.nodes.forEach((item) => {
          topNode += addTop(
            item.position,
            parentPositionNode,
            item.customPosition?.topToAdd
          );
          leftNode += addLeft(
            item.position,
            parentPositionNode,
            item.customPosition?.leftToAdd
          );
          skills.push(
            getSkill(item, topNode, leftNode, lineColor, skillColor, false)
          );
          parentPositionNode = item.position;
          generateNodes(
            item,
            topNode,
            leftNode + 30,
            parentPositionNode,
            skills,
            lineColor,
            skillColor
          );
        });
      }
      return skills;
    },
    [getSkill]
  );

  const generateMainBranch = useCallback(
    (items, lineColor, skillColor, topInit, leftInit) => {
      if ((items && items.length === 0) || !items) {
        return [];
      }
      let top = topInit;
      let left = leftInit;
      let parentPosition = null;
      let first = true;
      let skills = [];

      items.forEach((item) => {
        top += addTop(
          item.position,
          parentPosition,
          item.customPosition?.topToAdd
        );
        left += addLeft(
          item.position,
          parentPosition,
          item.customPosition?.leftToAdd
        );
        parentPosition = item.position;

        skills.push(getSkill(item, top, left, lineColor, skillColor, first));
        skills = generateNodes(
          item,
          top + 30,
          left + 15,
          parentPosition,
          skills,
          lineColor,
          skillColor
        );
      });
      return skills;
    },
    [generateNodes, getSkill]
  );

  const renderSkillTree = useCallback(() => {
    if (data && character) {
      const {
        itemsRoot,
        itemsFirst,
        itemsSecond,
        itemsThird,
        itemsFourth,
        itemsLast,
        lineColor,
        skillColor,
      } = data;
      let skills = generateMainBranch(itemsFirst, lineColor, skillColor, 0);
      skills = [
        ...generateMainBranch(itemsRoot, lineColor, skillColor, -385, 450),
        ...generateMainBranch(itemsFirst, lineColor, skillColor, 0, 0),
        ...generateMainBranch(itemsSecond, lineColor, skillColor, 0, 450),
        ...generateMainBranch(itemsThird, lineColor, skillColor, 0, 480),
        ...generateMainBranch(itemsFourth, lineColor, skillColor, 0, 450),
        ...generateMainBranch(itemsLast, lineColor, skillColor, 0, 900),
      ];
      setCurrentSkills(skills);
    }
  }, [character, data, generateMainBranch]);

  useEffect(() => {
    if (simulationInProgress) {
    } else {
      setRemainingPoints(points);
      setSelectedSkills([]);
      setLevel(0);
      currentSkills.forEach((x) => {
        const { item } = x.props;
        item.status =
          item.id === "r-1"
            ? STATUS_SKILL.CAN_BE_SELECTED
            : STATUS_SKILL.CANNOT_BE_SELECTED;
        item.hasLineColor = false;
        item.parentsLines?.forEach((line) => (line.hasLineColor = false));
      });
      setRootLineColor("gray");
    }
    renderSkillTree();
  }, [
    simulationInProgress,
    points,
    data,
    currentSkills,
    renderSkillTree,
    setRootLineColor,
  ]);

  useEffect(() => {
    setRemainingPoints(points);
  }, [points]);
  return (
    currentSkills &&
    currentSkills.length && (
      <div style={{ margin: "0 auto", width: "1000px" }}>
        <Row>
          <Col
            style={{
              paddingTop: "350px",
            }}
          >
            <RootStyled>
              <Line
                top={-414}
                left={451}
                color={visual ? data.lineColor : rootLineColor}
                rotation={90}
                translate={"0,0"}
                length={903}
              />
              <SpanStyled left={data.firstWayLeft} color={data.skillColor}>
                {data.firstWay}
              </SpanStyled>
              <SpanStyled left={data.secondWayLeft} color={data.skillColor}>
                {data.secondWay}
              </SpanStyled>
            </RootStyled>
            <DashBoard
              remainingPoints={remainingPoints}
              selectedSkills={selectedSkills}
              level={level}
              simulationInProgress={simulationInProgress}
              skillColor={data.skillColor}
              character={character}
            />
            <div style={{ position: "relative" }} id="container">
              {currentSkills}
            </div>
          </Col>
        </Row>
      </div>
    )
  );
};

SkillTree.propTypes = {
  character: PropTypes.string,
  visual: PropTypes.bool,
  points: PropTypes.number,
  simulationInProgress: PropTypes.bool,
  data: PropTypes.shape(),
};

export default SkillTree;
