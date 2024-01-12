import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const LineStyled = styled.span`
  border-left: 3px solid ${(props) => props.color};
  display: inline-block;
  height: ${(props) => props.length}px;
  margin: 0 20px;
  margin-top: -30px;
  transform: rotate(${(props) => props.rotation}deg)
    translate(${(props) => props.translate});
  z-index: -1;
`;

const SkillStyled = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
`;

const Line = ({ top, left, color, translate, rotation, length }) => {
  return (
    <>
      <SkillStyled top={`${top}px`} left={`${left}px`}>
        <LineStyled
          color={color}
          rotation={rotation}
          translate={translate}
          length={length}
        />
      </SkillStyled>
    </>
  );
};

Line.defaultProps = {
  translate: "0,0",
};

Line.propTypes = {
  top: PropTypes.number,
  left: PropTypes.number,
  color: PropTypes.string,
  translate: PropTypes.string,
  rotation: PropTypes.number,
  length: PropTypes.number,
};

export default Line;
