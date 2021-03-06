import React from "react";
import GameRoom from "./GameRoom";
import GameOver from "./GameOver";
import Spinner from "../Spinner/Spinner";
import { GameRoomContext } from "../../GameRoomContext";
import { CurrentUserContext } from "../../CurrentUserContext";
import { useHistory, useParams } from "react-router-dom";
import ErrorScreen from "../ErrorScreen/ErrorScreen";
import * as firebase from "firebase";

const GameRoomWrapper = () => {
  const {
    round,
    gamePhase,
    gameRoomExists,
    setGameRoomExists,
    setGameStarted,
  } = React.useContext(GameRoomContext);
  const { currentUser, isHostPresent } = React.useContext(CurrentUserContext);

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
        window.location.replace("/");
      }
    };
  }, [history]);

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
