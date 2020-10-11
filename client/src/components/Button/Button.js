import React from "react";
import styled from "styled-components";
import COLORS from "../../COLORS";

const Button = ({ children }) => {
  return <Button>{children}</Button>;
};

export default Button;
const Button = styled.button`
  height: 50px;
  border-radius: 30px;
  font-weight: 700;
  padding: 5px 20px;
  font-size: 20px;
  color: white;
  border: none;
  background: linear-gradient(
    to right,
    ${COLORS.midnight},
    ${COLORS.secondary}
  );
`;
