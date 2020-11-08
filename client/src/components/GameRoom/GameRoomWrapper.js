import React from "react";
import GameRoom from "./GameRoom";
import GameOver from "./GameOver";
import { GameRoomContext } from "../../GameRoomContext";
import { CurrentUserContext } from "../../CurrentUserContext";
import { useHistory, useParams } from "react-router-dom";
import { LobbyContext } from "../../LobbyContext";
import FourOFour from "../ErrorScreens/FourOFour";
import * as firebase from "firebase";

const GameRoomWrapper = () => {
  const {
    round,
    setRound,
    setHistoryArray,
    gamePhase,
    gameRoomExists,
    setGameRoomExists,
    setGameStarted,
    setModal,
    isGameOver,
  } = React.useContext(GameRoomContext);
  const { currentUser } = React.useContext(CurrentUserContext);
  const history = useHistory();
  const { roomId } = useParams();
  const { location, deletePlaylist } = React.useContext(LobbyContext);

  React.useEffect(() => {
    console.log("location", location);
    if (location !== "gameRoom") {
      history.push(`/lobby/${roomId}`);
    }
    return () => {
      setRound(0);
      deletePlaylist();
      setHistoryArray([]);
    };
  }, [location, roomId]);

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
        console.log("return");
        setModal(true);
        console.log("cancel");
        history.push(`/gameroom/${roomId}`);
      }
    };
  }, [history]);

  React.useEffect(() => {
    setGameStarted(true);
  }, []);

  if (gameRoomExists === false) {
    return <FourOFour />;
  }

  if (!currentUser && gameRoomExists) {
    return <div>game in progrss</div>;
  }

  if (round > 1 && gamePhase === "playing" && gameRoomExists === true) {
    return <GameOver />;
  }

  return <>{gameRoomExists === true && isGameOver === false && <GameRoom />}</>;
};

export default GameRoomWrapper;
