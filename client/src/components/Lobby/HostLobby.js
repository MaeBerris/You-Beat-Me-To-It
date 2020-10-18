import React from "react";
import styled from "styled-components";
import COLORS from "../../COLORS";
import Search from "./Search";
import SelectedPlaylist from "./SelectedPlaylist";
import Users from "./Users";
import SelectedPlaylistPlayer from "./SelectedPlaylistPlayer";
import { CurrentUserContext } from "../../CurrentUserContext";
import { LobbyContext } from "../../LobbyContext";
import { useParams } from "react-router-dom";

const validatePlaylist = async (roomId, playlist) => {
  const promise = await fetch("/validatePlaylist", {
    method: "PUT",
    body: JSON.stringify({ roomId, selectedPlaylist: playlist }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  return promise;
};

const HostLobby = () => {
  const { currentUser } = React.useContext(CurrentUserContext);
  const { playlistState } = React.useContext(LobbyContext);
  const { roomId } = useParams();

  if (currentUser.role === "player") {
    return (
      <Wrapper>
        <BottomSection>
          <SelectedPlaylistPlayer />
          <Users />
        </BottomSection>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Search />
      <BottomSection>
        <SelectedPlaylist />
        <Users />
      </BottomSection>
      <ButtonWrapper>
        <BigButton
          onClick={() =>
            validatePlaylist(roomId, playlistState.selectedPlaylist)
          }
        >
          Start Game !
        </BigButton>
      </ButtonWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  align-items: center;
`;

const BottomSection = styled.div`
  margin-top: 20px;
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
`;

const ButtonWrapper = styled.div`
  margin: 50px;
  display: flex;
  justify-content: center;
`;

const BigButton = styled.button`
  border-radius: 30px;
  /* font-weight: 700; */
  /* font-family: "Echizen"; */
  font-size: 40px;
  padding: 5px 20px;
  cursor: pointer;
  color: white;
  border: none;
  background: linear-gradient(to right, #ff33be, ${COLORS.midnight});
`;

export default HostLobby;
