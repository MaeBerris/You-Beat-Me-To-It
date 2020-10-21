import React from "react";
import styled from "styled-components";
import GenericLabel from "../Labels/GenericLabel";
import { useParams } from "react-router-dom";
import { LobbyContext } from "../../LobbyContext";
import * as firebase from "firebase";

const SelectedPlaylistPlayer = () => {
  const { playlistState, selectPlaylist, deletePlaylist } = React.useContext(
    LobbyContext
  );
  const { roomId } = useParams();

  React.useEffect(() => {
    const selectedPlaylistRef = firebase
      .database()
      .ref(`Rooms/${roomId}/selectedPlaylist`);

    selectedPlaylistRef.on("value", (snapshot) => {
      const playlist = snapshot.val();
      console.log("playlistFromFirebas", playlist);
      if (playlist === false) {
        deletePlaylist();
      } else {
        selectPlaylist(Object.values(playlist)[0]);
      }
    });
  }, [roomId]);

  return (
    <Wrapper>
      <GenericLabel>Selected Playlist:</GenericLabel>
      {Object.values(playlistState.selectedPlaylist).map((item) => {
        return (
          <ResultWrapper key={item.id}>
            <Image src={item.picture_medium} />
            <ResultsInfo>
              <Title>{item.title}</Title>
              <Tracks>{item.nb_tracks} tracks</Tracks>
            </ResultsInfo>
          </ResultWrapper>
        );
      })}
    </Wrapper>
  );
};

export default SelectedPlaylistPlayer;

const Wrapper = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 30px;
  padding-right: 20px;
`;

const ResultWrapper = styled.div`
  background: white;
  border-radius: 15px;
  width: fit-content;
  max-width: 100%;
  display: flex;
  padding: 10px;
  position: relative;
  min-width: 50%;
`;

const Image = styled.img`
  width: 75px;
  height: 75px;
  margin-right: 10px;
`;

const ResultsInfo = styled.div`
  width: 100%;
`;

const Title = styled.div`
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Tracks = styled.p`
  font-size: 70%;
  font-weight: 400;
  color: lightgrey;
`;
