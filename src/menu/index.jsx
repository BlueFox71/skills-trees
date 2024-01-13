import { Button, Col, Divider, Form, Row } from "antd";
import { CHARACTER_CLASS } from "../utils/enum";
import { useState } from "react";

import SkillTree from "../skillTree";
import styled from "styled-components";
import { getBackgroundSection, getDataSkillTree } from "../utils/data";

const SectionSkillTree = styled.section`
  background-image: url(${(props) => getBackgroundSection(props.character)});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 1800px;
  opacity: 1;
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
      disabled: true,
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
      disabled: true,
    },
    {
      label: "Voleur",
      value: CHARACTER_CLASS.VOLEUR,
      disabled: true,
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
    console.log(classCharacter)
    setCharacter(classCharacter);
    setData(getDataSkillTree(classCharacter));
  };

  const handleStart = () => {
    setSimulationInProgress(true);
    setPoints(data.count);
    setVisual(false);
  };

  const handleReset = () => {
    setPoints(data.count);
    setSimulationInProgress(false);
  };
  return (
    <div style={{ backgroundColor: "#272a35" }}>
      <section style={{ paddingTop: "50px" }}>
        <Row align={"center"} style={{ width: "60%", margin: "0 auto" }}>
          {buttons.map((item) => (
            <Col span={4}>
              <Button
                style={{ margin: "5px" }}
                className={`button-menu ${item.value}`}
                onClick={() => handleChooseCharacter(item.value)}
                disabled={item.disabled}
              >
                {item.label}
              </Button>
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
          <SectionSkillTree
            id="container-skill-tree"
            style={{ width: "100%" }}
            character={character}
          >
            <SkillTree
              points={points}
              character={character}
              data={data}
              visual={visual}
              simulationInProgress={simulationInProgress}
            />
          </SectionSkillTree>
        </>
      )}
    </div>
  );
};

export default Menu;
