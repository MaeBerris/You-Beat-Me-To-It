import React from "react";
import styled from "styled-components";
import Label from "../Labels/GenericLabel";
import COLORS from "../../COLORS";
import Spinner from "../Spinner/Spinner";
import { GameRoomContext } from "../../GameRoomContext";
import { useParams } from "react-router-dom";

const GameInProgress = () => {
  const { roomId } = useParams();
  const { round, setRoomId } = React.useContext(GameRoomContext);
  React.useEffect(() => {
    setRoomId(roomId);
  }, []);
  return (
    <Wrapper>
      <Label>The Game is in Progress</Label>
      <Message>
        Please be patient while the game is in progress. You will be able to
        join when the game ends and the host returns to the lobby.
      </Message>
      <RoundCounter>
        The game you are trying to join is on round :{" "}
        <RoundSpan>
          {" "}
          {round <= 9 ? round + 1 : round}
          /10
        </RoundSpan>
      </RoundCounter>
      <Spinner color={COLORS.midnight} size={40} />
    </Wrapper>
  );
};
export default GameInProgress;

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

const RoundCounter = styled.div`
  margin-top: 10px;
  font-family: "Echizen";
  text-shadow: 2px 2px ${COLORS.midnight};
  color: white;
  font-size: 40px;
  width: 60%;
  text-align: center;
`;

const RoundSpan = styled.span`
  font-size: 40px;
  color: ${COLORS.secondary};
  text-shadow: 2px 2px white;
  font-family: "Echizen";
`;
