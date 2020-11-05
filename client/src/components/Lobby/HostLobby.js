import React from "react";
import styled from "styled-components";
import COLORS from "../../COLORS";
import Search from "./Search";
import SelectedPlaylist from "./SelectedPlaylist";
import Users from "./Users";
import SelectedPlaylistPlayer from "./SelectedPlaylistPlayer";
import { CurrentUserContext } from "../../CurrentUserContext";
import { LobbyContext } from "../../LobbyContext";
import { useParams, useHistory } from "react-router-dom";
import * as firebase from "firebase";

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

// const changeRoomLocation = async (roomId) => {
//   const promise = await fetch(`/changeRoomLocation?roomId=${roomId}`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
//   return promise;
// };

const HostLobby = () => {
  const { currentUser } = React.useContext(CurrentUserContext);
  const { playlistState, setRoomId, location } = React.useContext(LobbyContext);
  const { roomId } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    setRoomId(roomId);
  }, []);

  React.useEffect(() => {
    console.log(history.action);

    return () => {
      console.log(history.action);
      if (history.action === "POP")
        if (window.confirm("do you really want to leave ?")) {
          fetch("/deleteUser", {
            method: "DELETE",
            body: JSON.stringify({ currentUser, roomId }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => console.log(data));
          return;
        } else {
          history.push(`/lobby/${roomId}`);
        }
    };
  }, [history]);

  React.useEffect(() => {
    if (location === "gameRoom") {
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
        <BigButton
          onClick={async () => {
            if (Object.keys(playlistState.selectedPlaylist).length > 0) {
              await validatePlaylist(roomId, playlistState.selectedPlaylist);
            }
          }}
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

const Text = styled.div`
  font-family: "Echizen";
  font-size: 60px;
  text-align: center;
  color: white;
  margin: 50px 0;
  text-shadow: 2px 2px 2px ${COLORS.midnight};
`;

export default HostLobby;
