import React from "react";
import styled from "styled-components";
import { GameRoomContext } from "../../GameRoomContext";

import ProgressBar from "./ProgressBar";
import Cassette from "./Cassette";
import SearchBar from "./SearchBar";
import PreviousSong from "./PreviousSongs";

import Ranking from "./Ranking";
import { FiVolume, FiVolumeX, FiVolume1, FiVolume2 } from "react-icons/fi";
import Modal from "../Modal/Modal";

const GameRoom = () => {
  const { trackUrl, modal, time, audioRef } = React.useContext(GameRoomContext);

  const [volume, setVolume] = React.useState(0.5);

  React.useEffect(() => {
    audioRef.current.volume = volume;
  }, [audioRef, volume]);

  console.log("modal", modal);

  return (
    <Wrapper>
      {modal && <Modal />}
      <SlidderWrapper>
        <Button
          onClick={() => {
            if (volume > 0) {
              setVolume(0);
              return;
            }
            if (volume === 0) {
              setVolume(0.5);
              return;
            }
          }}
        >
          {volume === 0.5 && <FiVolume size={35} />}
          {volume === 0 && <FiVolumeX size={35} />}
          {volume < 0.5 && volume > 0 && <FiVolume1 size={35} />}
          {volume > 0.5 && <FiVolume2 size={35} />}
        </Button>
        <Slider
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={(ev) => {
            setVolume(ev.target.value / 100);
          }}
        />
      </SlidderWrapper>

      <Player src={trackUrl} ref={audioRef}>
        I'm sorry, your browser doesn't support audio
      </Player>
      <SearchBar />
      <ProgressBar />
      <Cassette time={time}></Cassette>
      <BottomSection>
        <PreviousSong />
        <Ranking />
      </BottomSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  padding: 0 40px;
`;

const Player = styled.audio``;

const BottomSection = styled.div`
  margin-top: 20px;
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
`;

const Slider = styled.input`
  width: 100%;
`;

const SlidderWrapper = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
  background: white;
  border-radius: 10px;
  width: 50px;
  transition: width 1s, opacity 1s;
  margin-bottom: 15px;

  input:nth-child(2) {
    opacity: 0;
    transition: opacity 0.8s;
  }

  :hover {
    width: 200px;
    input:nth-child(2) {
      opacity: 1;
    }
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  width: 45px;
  height: 45px;
  cursor: pointer;
`;

export default GameRoom;
