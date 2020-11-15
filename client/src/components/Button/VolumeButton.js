import React from "react";
import styled from "styled-components";
import { FiVolume, FiVolumeX, FiVolume1, FiVolume2 } from "react-icons/fi";

const VolumeButton = ({ volume, setVolume }) => {
  return (
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
  );
};

export default VolumeButton;

const Slider = styled.input`
  width: 100%;
`;

const SlidderWrapper = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
  background: white;
  border-radius: 10px;
  width: 55px;
  transition: width 1s, opacity 1s;
  margin-bottom: 15px;
  position: absolute;
  top: 0;
  left: 40px;

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
  width: 50px;
  height: 50px;
  cursor: pointer;

  :focus {
    outline: none;
  }
`;
