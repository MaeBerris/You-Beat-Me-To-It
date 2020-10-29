import React from "react";
import styled, { keyframes } from "styled-components";
import GenericLabel from "../Labels/GenericLabel";
import { GameRoomContext } from "../../GameRoomContext";
import { useParams } from "react-router-dom";
import * as firebase from "firebase";

const PreviousSong = () => {
  const { roomId } = useParams();
  const { historyArray } = React.useContext(GameRoomContext);
  const [round, setRound] = React.useState(0);

  React.useEffect(() => {
    const roundRef = firebase.database().ref(`Rooms/${roomId}/round`);
    roundRef.on("value", (snapshot) => {
      setRound(snapshot.val());
    });

    return () => {
      roundRef.off();
    };
  }, [roomId]);

  return (
    <Wrapper>
      <GenericLabel>Previous Songs:</GenericLabel>
      <SongListWrapper>
        {historyArray
          .map((song, index) => {
            if (index < round) {
              return (
                <SongInfoWrapper key={song.title_short}>
                  <SongArt src={song.album.cover_medium} />
                  <InfoSection>
                    <Title>{song.title_short}</Title>
                    <Artist>{song.artist.name}</Artist>
                  </InfoSection>
                </SongInfoWrapper>
              );
            }
          })
          .reverse()}
      </SongListWrapper>
    </Wrapper>
  );
};
export default PreviousSong;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 30px;
  margin-bottom: 50px;
`;
const Appear = keyframes`
0%{
  opacity: 0;
  transform: translateY(-100%)

}100%{
  opacity: 1;
  transform: translateY(0)

}`;

const SongListWrapper = styled.div`
  border-radius: 10px;
  padding: 10px;
  font-size: 30px;
  width: 80%;
  min-height: 100px;
  background: white;
  transition: 500ms;
`;

const SongInfoWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
  animation: ${Appear} 800ms ease-in-out;
  transform-origin: left;
`;

const SongArt = styled.img`
  width: 75px;
  height: 75px;
  margin-right: 10px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span``;

const Artist = styled.span`
  font-style: italic;
`;
