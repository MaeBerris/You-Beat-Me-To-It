import React from "react";
import styled from "styled-components";
import COLORS from "../../COLORS";

const Background = ({ children }) => {
  return (
    <Wrapper>
      <Shape1></Shape1>
      <Shape2></Shape2>
      <Shape3></Shape3>
      <ChildWrapper>{children}</ChildWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${COLORS.main};
  position: relative;
  overflow: hidden;
  z-index: -10;
`;

const Shape1 = styled.div`
  width: 500px;
  height: 800px;
  border-radius: 50%;
  transform: rotate(20deg);
  position: absolute;
  top: -400px;
  left: -100px;
  background-color: ${COLORS.secondary};
  z-index: -10;
`;

const Shape2 = styled.div`
  width: 500px;
  height: 500px;
  transform: rotate(55deg);
  position: absolute;
  bottom: -450px;
  right: 300px;
  background-color: ${COLORS.tertiary};
  z-index: -10;
`;

const ChildWrapper = styled.div`
  min-height: 100vh;
`;

const Shape3 = styled.div``;

export default Background;
