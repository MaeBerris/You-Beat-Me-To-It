import React from "react";
import GameRoom from "./GameRoom";
import GameOver from "./GameOver";
import { GameRoomContext } from "../../GameRoomContext";
import { CurrentUserContext } from "../../CurrentUserContext";
import { useHistory, useParams } from "react-router-dom";
import FourOFour from "../FourOFour/FourOFour";
import * as firebase from "firebase";

const GameRoomWrapper = () => {
  const {
    round,
    gamePhase,
    gameRoomExists,
    setGameRoomExists,
    setGameStarted,
  } = React.useContext(GameRoomContext);
  const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext);
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

        fetch("/deleteUser", {
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

  if (round > 9 && gamePhase === "playing" && gameRoomExists === true) {
    return <GameOver />;
  }

  return <>{gameRoomExists === true && <GameRoom />}</>;
};

export default GameRoomWrapper;
