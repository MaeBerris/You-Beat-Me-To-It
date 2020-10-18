import React from "react";
import styled from "styled-components";
import COLORS from "../../COLORS";

const Button = ({ children, handler }) => {
  return <StyledButton onClick={handler}>{children}</StyledButton>;
};

export default Button;

const StyledButton = styled.button`
  height: 50px;
  border-radius: 30px;
  font-weight: 700;
  padding: 5px 20px;
  font-size: 20px;
  cursor: pointer;
  color: white;
  border: none;
  background: linear-gradient(
    to right,
    ${COLORS.tertiary},
    ${COLORS.secondary}
  );
`;
