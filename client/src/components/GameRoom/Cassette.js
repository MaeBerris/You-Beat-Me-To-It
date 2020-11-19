import React from "react";
import styled, { keyframes } from "styled-components";
import cassette from "../../assets/cassette.png";
import COLORS from "../../COLORS";
import { GameRoomContext } from "../../GameRoomContext";

const Cassette = ({ time }) => {
  const { result, trackInfo, gamePhase } = React.useContext(GameRoomContext);
  const [artist, setArtist] = React.useState(null);
  const [songName, setSongName] = React.useState(null);

  React.useEffect(() => {
    if (gamePhase === "loading") {
      setArtist(null);
      setSongName(null);
    }
    if (result === "success") {
      setArtist(trackInfo.artist.name);
      setSongName(trackInfo.title_short);
    }
    if (result === "artist") {
      setArtist(trackInfo.artist.name);
    }
    if (result === "songName") {
      setSongName(trackInfo.title_short);
    }
  }, [result, gamePhase]);

  return (
    <MasterWrapper>
      <Wrapper>
        <Image src={cassette}></Image>
        <Counter>{time}</Counter>
        <CogWrapper gamePhase={gamePhase}>
          <Cog>
            <Peg1></Peg1>
            <Peg2 />
            <Peg3></Peg3>
            <Peg4 />
          </Cog>
        </CogWrapper>
        <CogWrapper2 gamePhase={gamePhase}>
          <Cog>
            <Peg1></Peg1>
            <Peg2 />
            <Peg3></Peg3>
            <Peg4 />
          </Cog>
        </CogWrapper2>
        <Label>
          <SongName>
            <PlaceHolder>
              {songName && (
                <SongNameSpan songName={songName}>
                  {songName && songName}
                </SongNameSpan>
              )}
            </PlaceHolder>

            <Separator>/</Separator>
            <PlaceHolder>
              {artist && (
                <ArtistSpan artist={artist}>{artist && artist}</ArtistSpan>
              )}
            </PlaceHolder>
          </SongName>
        </Label>
      </Wrapper>
    </MasterWrapper>
  );
};

export default Cassette;

const MasterWrapper = styled.div`
  height: 340px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: -50px;
  /* margin-top: 50px; */
  transform: scale(0.8);
`;

const Appear = keyframes`
from{
  width: 0;
}
to{
  width: 100%;
}`;

const SongNameSpan = styled.div`
  font-family: "Permanent Marker", cursive;
  /* font-family: "Echizen"; */
  color: black;
  /* width: 250px; */

  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
  transform-origin: left;
  line-height: 2.3;
  animation: ${(props) =>
      props.songName !== null || props.artist !== null ? Appear : null}
    500ms;
`;

const ArtistSpan = styled.div`
  font-family: "Permanent Marker", cursive;
  /* font-family: "Echizen"; */
  color: black;
  /* width: 250px; */
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
  transform-origin: left;
  line-height: 2.3;
  animation: ${(props) =>
      props.songName !== null || props.artist !== null ? Appear : null}
    500ms ease-in-out;
`;
const PlaceHolder = styled.div`
  width: 50%;
  max-width: 50%;
`;

const Separator = styled.div`
  font-family: "Echizen";
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

const Spin = keyframes`
from{
  transform: rotate(0deg)
}to{
  transform: rotate(360deg)
}`;

const CogWrapper2 = styled.div`
  width: fit-content;
  position: absolute;
  top: 134px;
  right: 141px;
  animation: ${Spin} 2000ms linear infinite forwards;
  animation-play-state: ${(props) =>
    props.gamePhase === "playing" ? "running" : "paused"};
`;

const CogWrapper = styled.div`
  width: fit-content;
  position: absolute;
  top: 135px;
  left: 135px;
  /* animation: ${(props) =>
    props.gamePhase === "playing" ? Spin : null} 2000ms
    linear infinite forwards; */
  animation: ${Spin} 2000ms linear infinite forwards;
  animation-play-state: ${(props) =>
    props.gamePhase === "playing" ? "running" : "paused"};
`;

const Cog = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 4px solid ${COLORS.midnight};
`;

const Peg1 = styled.div`
  position: absolute;
  border-left: 4px solid ${COLORS.midnight};
  height: 15px;
  border-radius: 3px;
  left: 50%;
  bottom: -3px;
  transform: translateX(-2px);
`;

const Peg2 = styled.div`
  position: absolute;
  border-left: 4px solid ${COLORS.midnight};
  border-radius: 3px;
  height: 15px;
  left: 50%;
  top: -3px;
  transform: translateX(-2px);
`;

const Peg3 = styled.div`
  position: absolute;
  border-bottom: 4px solid ${COLORS.midnight};
  border-radius: 3px;
  width: 15px;
  left: -3px;
  top: 50%;
  transform: translateY(-2px);
`;

const Peg4 = styled.div`
  position: absolute;
  border-bottom: 4px solid ${COLORS.midnight};
  border-radius: 3px;
  width: 15px;
  right: -3px;
  top: 50%;
  transform: translateY(-2px);
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
  display: flex;
  /* justify-content: center; */
  color: black;
  text-align: center;
  font-size: 40px;
`;
