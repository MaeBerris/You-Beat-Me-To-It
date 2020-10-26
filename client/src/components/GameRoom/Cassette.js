import React from "react";
import styled from "styled-components";
import cassette from "../../assets/cassette.png";
import COLORS from "../../COLORS";

const Cassette = ({ time }) => {
  return (
    <Wrapper>
      <Image src={cassette}></Image>
      <Counter>{time}</Counter>
      <Label>
        <SongName>Like a Virgin by Madonna</SongName>
        {/* <SongArtist>Madonna</SongArtist> */}
      </Label>
    </Wrapper>
  );
};

export default Cassette;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 50px;
  /* margin-top: 50px; */
  transform: scale(0.8);
`;

const Image = styled.img`
  filter: invert(21%) sepia(23%) saturate(7482%) hue-rotate(259deg)
    brightness(87%) contrast(91%);
`;

const Counter = styled.div`
  width: fit-content;
  position: absolute;
  top: 140px;
  font-size: 60px;
  color: ${COLORS.midnight};
  font-family: "Digital";
`;

const Label = styled.div`
  border: 4px solid ${COLORS.midnight};
  display: flex;
  flex-direction: column;
  background: white;
  position: absolute;
  width: 500px;
  padding: 10px 50px;
  top: 45px;
  /* text-shadow: 2px 2px 2px ${COLORS.midnight}; */
`;

const SongName = styled.div`
  border-bottom: 2px solid ${COLORS.midnight};
  height: 35px;
  font-family: "Echizen";
  color: black;
  text-align: center;
  font-size: 40px;
`;
