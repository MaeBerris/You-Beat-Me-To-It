import React, { useRef } from "react";
import styled, { keyframes } from "styled-components";
import COLORS from "../../COLORS";
import { GameRoomContext } from "../../GameRoomContext";
import { CurrentUserContext } from "../../CurrentUserContext";

const ProgressBar = () => {
  const { gamePhase } = React.useContext(GameRoomContext);
  const { currentTrackGuesses } = React.useContext(CurrentUserContext);
  const barRef = React.useRef(null);

  const calculateGuessPosition = (time) => {
    if (barRef !== null) {
      console.log("barWidth", barRef.current.clientWidth);
      let position = (time * barRef.current.clientWidth) / 30;
      position.toFixed(0);
      return position;
    }
  };
  return (
    <Wrapper>
      <Bar gamePhase={gamePhase} ref={barRef}></Bar>
      {Object.values(currentTrackGuesses).map((guess) => {
        if (guess.artist && guess.songName) {
          return (
            <Guess position={calculateGuessPosition(guess.time)}>
              {guess.nickName}
              <Tip />
            </Guess>
          );
        }
      })}
    </Wrapper>
  );
};

export default ProgressBar;

const Wrapper = styled.div`
  width: 100%;
  background: #eadaf0;
  height: 10px;
  border-radius: 40px;
  margin-top: 10px;
  position: relative;
`;

const Transform = keyframes`
0%{
  transform:scaleX(1)
}100%{
  transform: scaleX(0)
}
`;
const Bar = styled.div`
  height: 10px;
  width: 100%;
  border-radius: 40px;
  background: #ff33be;
  transform-origin: right;
  animation: ${(props) => (props.gamePhase === "playing" ? Transform : null)}
    31000ms linear;
`;

const Guess = styled.div`
  width: 150px;
  font-size: 15px;
  border-radius: 10px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  margin-top: 10px;
  position: absolute;
  top: 10px;
  left: ${(props) => props.position}px;
  transform: translateX(-50%);
  z-index: 5;
`;

const Tip = styled.div`
  position: absolute;
  z-index: -5;
  background: white;
  height: 30px;
  width: 30px;
  transform: rotate(45deg) translateX(-20%) translateY(-20%);
`;
