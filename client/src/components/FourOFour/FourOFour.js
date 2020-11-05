import React from "react";
import styled from "styled-components";
import Label from "../Labels/GenericLabel";
import COLORS from "../../COLORS";

const FourOFour = () => {
  return (
    <Wrapper>
      <Label>404 - Room not found</Label>
      <Message>
        I'm sorry, the room you are trying to join doesn't exist
      </Message>
    </Wrapper>
  );
};
export default FourOFour;

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
`;
