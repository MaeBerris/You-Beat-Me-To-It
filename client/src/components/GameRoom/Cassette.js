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
  margin-bottom: 10px;
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
  font-family: "Echizen";
  color: black;
  /* width: 250px; */

  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 40px;
  transform-origin: left;
  animation: ${(props) =>
      props.songName !== null || props.artist !== null ? Appear : null}
    500ms;
`;

const ArtistSpan = styled.div`
  font-family: "Echizen";
  color: black;
  /* width: 250px; */
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 40px;
  transform-origin: left;
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
