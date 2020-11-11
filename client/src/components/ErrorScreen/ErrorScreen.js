import React from "react";
import styled from "styled-components";
import Label from "../Labels/GenericLabel";
import COLORS from "../../COLORS";
import Spinner from "../Spinner/Spinner";

const ErrorScreen = ({ title, message, spinner }) => {
  return (
    <Wrapper>
      <Label>{title}</Label>
      <Message>{message}</Message>
      {spinner && <Spinner color={COLORS.midnight} size={40} />}
    </Wrapper>
  );
};
export default ErrorScreen;

const Wrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  margin-top: 5px;
  font-family: "Echizen";
  text-shadow: 2px 2px ${COLORS.midnight};
  color: white;
  font-size: 40px;
  width: 60%;
  text-align: center;
`;
