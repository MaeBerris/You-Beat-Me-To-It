import React from "react";
import styled, { keyframes } from "styled-components";
import COLORS from "../../COLORS";
import Search from "./Search";
import SelectedPlaylist from "./SelectedPlaylist";
import Users from "./Users";
import SelectedPlaylistPlayer from "./SelectedPlaylistPlayer";
import Spinner from "../Spinner/Spinner";
import { CurrentUserContext } from "../../CurrentUserContext";
import { LobbyContext } from "../../LobbyContext";
import { GameRoomContext } from "../../GameRoomContext";
import { useParams, useHistory } from "react-router-dom";

const validatePlaylist = async (roomId, playlist) => {
  const promise = await new Promise((resolve, reject) => {
    fetch("/validatePlaylist", {
      method: "PUT",
      body: JSON.stringify({ roomId, selectedPlaylist: playlist }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });

  return promise;
};

const HostLobby = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { currentUser } = React.useContext(CurrentUserContext);
  const { playlistState, location } = React.useContext(LobbyContext);
  const { gameStarted } = React.useContext(GameRoomContext);
  const { roomId } = useParams();
  const history = useHistory();
  console.log("error", error);
  React.useEffect(() => {
    if (location === "gameRoom" && gameStarted === false) {
      history.push(`/gameroom/${roomId}`);
    }
  }, [roomId, location]);

  if (currentUser.role === "player") {
    return (
      <Wrapper>
        <BottomSection>
          <SelectedPlaylistPlayer />
          <Users />
        </BottomSection>
        <Text>
          Please wait for the host to select a playlist and to start game ...
        </Text>
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
        {error && <ErrorMessage>Please select a playlist</ErrorMessage>}
        <BigButton
          onClick={async () => {
            if (Object.keys(playlistState.selectedPlaylist).length > 0) {
              setError(false);
              setLoading(true);
              await validatePlaylist(roomId, playlistState.selectedPlaylist);
            } else {
              setError(true);
            }
          }}
        >
          {loading ? <Spinner /> : "Start Game"}
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
  align-items: center;
  flex-direction: column;
  position: relative;
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
  transition: filter 0.3s;

  :hover {
    filter: saturate(150%);
  }
  :focus {
    outline: none;
    border: 1px solid white;
    border-radius: 30px;
  }
`;

const ErrorAnimation = keyframes`
from{
  opacity: 0;
  transform: translateY(100%)
}to{
  opacity: 1;
  transform: translateY(0%)
}`;

const ErrorMessage = styled.div`
  font-size: 20px;
  color: white;
  animation: ${ErrorAnimation} 200ms ease-in-out;
  position: absolute;
  top: -25px;
`;

const Text = styled.div`
  font-family: "Echizen";
  font-size: 60px;
  text-align: center;
  color: white;
  margin: 50px 0;
  text-shadow: 2px 2px 2px ${COLORS.midnight};
`;

export default HostLobby;
