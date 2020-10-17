import React from "react";
import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";

const Spinner = ({ size, color }) => {
  return (
    <Wrapper color={color}>
      <SpinWheel size={size} />
    </Wrapper>
  );
};

export default Spinner;

const Wrapper = styled.div`
  width: fit-content;
  color: ${(props) => props.color};
`;

const Spin = keyframes`
from{
  transform: rotate(0deg)
}to{
  transform: rotate(360deg)
}`;

const SpinWheel = styled(FiLoader)`
  animation: ${Spin} 2000ms linear infinite;
`;
