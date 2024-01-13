import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button, Col, Divider, Row, Tooltip, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";

const BlocStyled = styled.div`
  position: absolute;
  top: 30px;
  left: -400px;
  background-color: white;
  width: 500px;
  height: 200px;
  font-size: 25px;
  border-radius: 5px;
`;

const DivLevel = styled.div`
  font-size: 50px;
  text-align: center;
  margin: 20px;
`;

const DivPoints = styled.div`
  font-size: 20px;
  text-align: center;
  margin: 2px;
  opacity: 1;
`;

const StyledImage = styled.img`
  position: relative;
  width: 35px;
  height: 35px;
  margin: 2px;
  border: 2px solid ${(props) => props.color};
  border-radius: ${(props) => (props.isSquare ? "0" : "50")}px;
`;

const DashBoard = ({
  remainingPoints,
  selectedSkills,
  level,
  simulationInProgress,
  skillColor,
  character
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleCopied = () => {
    let res = "Liste des talents au niveau "+level+":\n";
    let usedIds = []

    selectedSkills
      .filter((item) => item.isSquare)
      .forEach((item) => {
        res += "  - " + item.text;
        const skillsWithImprovement = selectedSkills.filter(
          (x) => !x.isSquare && x.improvementOf !== null && x.improvementOf[0] === item.id
        )
        skillsWithImprovement.forEach(y  => {
          res += " + "+ y.text
          usedIds.push(y.id)
        })
        res += '\n'
      });

      console.log(usedIds)
    selectedSkills
      .filter((item) => !item.isSquare && !usedIds.includes(item.id))
      .forEach((item) => {
        res += "  - " + item.text + "\n";
      });
    navigator.clipboard.writeText(res);

    messageApi.open({
      type: "success",
      content: "Liste des talents copiés !",
    });
  };
  return (
    simulationInProgress && (
      <>
        {contextHolder}
        <BlocStyled>
          <Row>
            <Col span={10}>
              <DivLevel>{`Niv. ${level}`}</DivLevel>
              <Divider style={{ margin: 0 }} />
              <DivPoints>
                <span style={{ fontWeight: 600 }}>{remainingPoints}</span>{" "}
                points restantes à dépenser
              </DivPoints>
            </Col>
            <Button
              style={{ position: "absolute", left: "175px" }}
              icon={<CopyOutlined />}
              disabled={selectedSkills.length === 0}
              onClick={handleCopied}
            />
            <Col>
              <div style={{ overflow: "auto", width: "288px", height: "97px" }}>
                {selectedSkills.map(
                  (item) =>
                    item.isSquare && (
                      <Tooltip title={item.text} placement="bottom">
                        <StyledImage
                          color={skillColor}
                          isSquare={item.isSquare}
                          src={require(`../../asserts/images/${character}/${item.image}.jpg`)}
                        />
                      </Tooltip>
                    )
                )}
              </div>
              <Divider style={{ margin: 0 }} />
              <div style={{ overflow: "auto", width: "288px", height: "97px" }}>
                {selectedSkills.map(
                  (item) =>
                    !item.isSquare && (
                      <Tooltip title={item.text} placement="bottom">
                        <StyledImage
                          color={skillColor}
                          isSquare={item.isSquare}
                          src={require(`../../asserts/images/${character}/${item.image}.jpg`)}
                        />
                      </Tooltip>
                    )
                )}
              </div>
            </Col>
          </Row>
        </BlocStyled>
      </>
    )
  );
};

DashBoard.propTypes = {
  remainingPoints: PropTypes.number,
  selectedSkills: PropTypes.array,
  level: PropTypes.number,
  simulationInProgress: PropTypes.bool,
  skillColor: PropTypes.string,
  character: PropTypes.string,
};

export default DashBoard;
