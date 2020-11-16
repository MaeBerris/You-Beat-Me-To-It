import React from "react";
import styled, { keyframes } from "styled-components";
import { GameRoomContext } from "../../GameRoomContext";
import { CurrentUserContext } from "../../CurrentUserContext";

const ProgressBar = ({ time }) => {
  const { gamePhase } = React.useContext(GameRoomContext);
  const { currentTrackGuesses } = React.useContext(CurrentUserContext);
  const barRef = React.useRef(null);

  const calculateGuessPosition = (time) => {
    if (barRef !== null) {
      let position = (time * barRef.current.clientWidth) / 31;
      position.toFixed(0);
      return position;
    }
  };
  return (
    <Wrapper>
      <Bar gamePhase={gamePhase} ref={barRef} time={time}></Bar>
      {currentTrackGuesses &&
        Object.values(currentTrackGuesses).map((guess) => {
          if (guess.artist && guess.songName) {
            return (
              <Guess
                position={calculateGuessPosition(guess.time)}
                key={guess.nickName}
              >
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

const Transform = (time) => keyframes`
0%{
  transform:scaleX(${time / 30})
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
  animation: ${(props) =>
      props.gamePhase === "playing" ? Transform(props.time) : null}
    ${(props) => props.time * 1030}ms linear;
`;

const Guess = styled.div`
  max-width: 150px;
  min-width: 90px;
  font-size: 15px;
  text-align: center;
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
