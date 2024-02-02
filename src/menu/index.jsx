import { Badge, Button, Col, Divider, Form, Image, Row } from "antd";
import { CHARACTER_CLASS } from "../utils/enum";
import { useState } from "react";

import SkillTree from "../skillTree";
import styled from "styled-components";
import { getBackgroundSection, getDataSkillTree } from "../utils/data";
import { FormatPainterOutlined } from "@ant-design/icons";

const SectionSkillTree = styled.section`
  background-image: url(${(props) => getBackgroundSection(props.character)});
  background-repeat: no-repeat;
  background-size: cover;
  height: 1850px;
  margin-left: -5px;
`;

const Menu = () => {
  const [character, setCharacter] = useState(null);
  const [points, setPoints] = useState(null);
  const [visual, setVisual] = useState(true);
  const [data, setData] = useState(null);
  const [simulationInProgress, setSimulationInProgress] = useState(false);
  const buttons = [
    {
      label: "Chaman",
      value: CHARACTER_CLASS.CHAMAN,
      disabled: false,
    },
    {
      label: "Chasseur",
      value: CHARACTER_CLASS.CHASSEUR,
      disabled: true,
    },
    {
      label: "Démoniste",
      value: CHARACTER_CLASS.DEMONISTE,
      disabled: true,
    },
    {
      label: "Druide",
      value: CHARACTER_CLASS.DRUIDE,
      disabled: true,
    },
    {
      label: "Mage",
      value: CHARACTER_CLASS.MAGE,
      disabled: true,
    },
    {
      label: "Prêtre",
      value: CHARACTER_CLASS.PRETRE,
      disabled: false,
    },
    {
      label: "Voleur",
      value: CHARACTER_CLASS.VOLEUR,
      disabled: false,
    },
    {
      label: "Guerrier",
      value: CHARACTER_CLASS.GUERRIER,
      disabled: false,
    },
    {
      label: "Paladin",
      value: CHARACTER_CLASS.PALADIN,
      disabled: false,
    },
  ];

  const handleChooseCharacter = (classCharacter) => {
    setCharacter(classCharacter);
    setData(getDataSkillTree(classCharacter));
    setVisual(true);
    setSimulationInProgress(false);
  };

  const handleStart = () => {
    setSimulationInProgress(true);
    setPoints(data.count);
    setVisual(false);
  };

  const handleReset = () => {
    setPoints(data.count);
    setSimulationInProgress(false);
    setVisual(true);
  };
  return (
    <div className="container" style={{ backgroundColor: "#272a35" }}>
      <section className="section-buttons-characters">
        <Row align={"center"} style={{ width: "100%", margin: "0 auto" }}>
          {buttons.map((item) => (
            <Col>
              {item.disabled ? (
                <Badge
                  count={
                    <FormatPainterOutlined
                      style={{
                        color: "white",
                        position: "absolute",
                        left: "80px",
                        top: "60px",
                      }}
                    />
                  }
                >
                  <Button
                    style={{ margin: "5px" }}
                    className={`button-menu ${item.value}`}
                    onClick={() => handleChooseCharacter(item.value)}
                  >
                    {item.label}
                  </Button>
                </Badge>
              ) : (
                <Button
                  style={{ margin: "5px" }}
                  className={`button-menu ${item.value}`}
                  onClick={() => handleChooseCharacter(item.value)}
                >
                  {item.label}
                </Button>
              )}
            </Col>
          ))}
          <Divider />
        </Row>
      </section>
      {character && data && (
        <>
          <section
            style={{ backgroundColor: data.primaryColor, padding: "10px" }}
          >
            <Form style={{ height: "35px" }}>
              <Row justify={"start"}>
                {!simulationInProgress ? (
                  <Col span={4}>
                    <Form.Item>
                      <Button onClick={handleStart}>
                        Commencer la simulation
                      </Button>
                    </Form.Item>
                  </Col>
                ) : (
                  <Col span={4}>
                    <Form.Item>
                      <Button onClick={handleReset}>
                        Réinitialiser l'arbre
                      </Button>
                    </Form.Item>
                  </Col>
                )}
              </Row>
            </Form>
          </section>
          {buttons.find(
            (item) => item.value === character && !item.disabled
          ) ? (
            <SectionSkillTree id="container-skill-tree" character={character}>
              <SkillTree
                points={points}
                character={character}
                data={data}
                visual={visual}
                simulationInProgress={simulationInProgress}
              />
            </SectionSkillTree>
          ) : (
            <div style={{ margin: "0 auto", width: "1000px" }}>
              <Image
                src={require(`../asserts/images/${character}/skill_tree.png`)}
                preview={false}
              ></Image>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Menu;
