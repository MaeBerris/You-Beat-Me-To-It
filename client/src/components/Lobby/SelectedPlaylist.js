import React from "react";
import styled from "styled-components";
import GenericLabel from "../Labels/GenericLabel";
import { useParams } from "react-router-dom";
import { LobbyContext } from "../../LobbyContext";
import { FiX } from "react-icons/fi";

const SelectedPlaylist = () => {
  const { playlistState, deletePlaylist } = React.useContext(LobbyContext);
  const { roomId } = useParams();

  React.useEffect(() => {
    fetch("/updatePlaylist", {
      method: "PUT",
      body: JSON.stringify({
        selectedPlaylist: playlistState.selectedPlaylist,
        roomId: roomId,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [playlistState.selectedPlaylist, roomId]);

  return (
    <Wrapper>
      <GenericLabel>Selected Playlist:</GenericLabel>
      {Object.values(playlistState.selectedPlaylist).map((item) => {
        return (
          <ResultWrapper key={item.id} onClick={() => {}}>
            <Image src={item.picture_medium} />
            <ResultsInfo>
              <Title>{item.title}</Title>
              <Tracks>{item.nb_tracks} tracks</Tracks>
            </ResultsInfo>
            <Icon
              onClick={(ev) => {
                deletePlaylist(item);
              }}
            >
              <FiX size={35} color={"lightgray"} />
            </Icon>
          </ResultWrapper>
        );
      })}
    </Wrapper>
  );
};

export default SelectedPlaylist;

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

const Icon = styled.button`
  color: red;
  position: absolute;
  border: none;
  cursor: pointer;
  top: 0;
  right: 0;
  background: none;
`;
