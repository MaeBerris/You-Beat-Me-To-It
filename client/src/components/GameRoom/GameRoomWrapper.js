import React from "react";
import GameRoom from "./GameRoom";
import GameOver from "./GameOver";
import Spinner from "../Spinner/Spinner";
import { GameRoomContext } from "../../GameRoomContext";
import { CurrentUserContext } from "../../CurrentUserContext";
import { LobbyContext } from "../../LobbyContext";
import { useHistory, useParams } from "react-router-dom";
import ErrorScreen from "../ErrorScreen/ErrorScreen";
import * as firebase from "firebase";
import { ip } from "../../ip";

const GameRoomWrapper = () => {
  const {
    round,
    gamePhase,
    gameRoomExists,
    setGameRoomExists,
    setGameStarted,
    setHistoryArray,
  } = React.useContext(GameRoomContext);
  const { currentUser, setCurrentUser, isHostPresent } = React.useContext(
    CurrentUserContext
  );
  const { deletePlaylist } = React.useContext(LobbyContext);
  const history = useHistory();
  const { roomId } = useParams();
  console.log(gameRoomExists);

  React.useEffect(() => {
    const roomRef = firebase.database().ref(`Rooms/${roomId}`);

    roomRef.on("value", (snapshot) => {
      setGameRoomExists(snapshot.exists());
    });
  }, [roomId]);

  React.useEffect(() => {
    console.log(history.action);

    return () => {
      if (history.action === "POP") {
        history.push("/");
        setCurrentUser(null);
        setGameStarted(false);
        deletePlaylist();
        setHistoryArray([]);

        fetch(`${ip}/deleteUser`, {
          method: "DELETE",
          body: JSON.stringify({ currentUser, roomId }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
        return;
      }
    };
  }, [history, currentUser, roomId]);

  React.useEffect(() => {
    setGameStarted(true);
  }, []);

  if (gameRoomExists === false) {
    return (
      <ErrorScreen
        title="404 - Room not found"
        message={
          "We're sorry, we couldn't find the room you are trying to join"
        }
      />
    );
  }
  if (isHostPresent === false) {
    return (
      <ErrorScreen
        title="The host has left"
        message="We're sorry, the host has left and the game has ended. Return to the homepage to start a new game."
      />
    );
  }

  if (!currentUser && gameRoomExists) {
    return <>{history.push(`/lobby/${roomId}`)}</>;
  }

  if (round > 9 && gamePhase === "playing" && gameRoomExists === true) {
    return <GameOver />;
  }

  return (
    <>
      {gameRoomExists === true && isHostPresent === true && currentUser ? (
        <GameRoom />
      ) : (
        <Spinner size={50} color={"lightgrey"} />
      )}
    </>
  );
};

export default GameRoomWrapper;
