import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { GameRoomContext } from "../../GameRoomContext";
import * as firebase from "firebase";

const GameRoom = () => {
  const { roomId } = useParams();
  const { trackUrl, setTrackUrl, gamePhase, setGamePhase } = React.useContext(
    GameRoomContext
  );
  const [time, setTime] = React.useState(5);
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTime(time - 1);
    }, 1000);
    if (time === 0 && gamePhase === "loading") {
      fetch("/updatePhase", {
        method: "PUT",
        body: JSON.stringify({ currentPhase: "loading", roomId: roomId }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTime(30);
        });
    }
    if (time === 0 && gamePhase === "playing") {
      audioRef.current.pause();
      fetch("/updatePhase", {
        method: "PUT",
        body: JSON.stringify({ roomId, currentPhase: "playing" }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTime(5);
        });
    }
    return () => {
      clearInterval(interval);
    };
  }, [time, gamePhase]);

  React.useEffect(() => {
    const gamePhaseRef = firebase.database().ref(`Rooms/${roomId}/phase`);
    gamePhaseRef.on("value", (snapshot) => {
      let phase = snapshot.val();
      setGamePhase(phase);
    });
  }, [roomId]);

  React.useEffect(() => {
    if (gamePhase === "loading") {
      console.log("in fetch track");
      fetch(`/updateCurrentTrack`, {
        method: "PUT",
        body: JSON.stringify({ roomId: roomId }),
        headers: {
          Accept: "applicatition/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTrackUrl(data.selectedSongUrl);
        });
    }
  }, [gamePhase]);

  React.useEffect(() => {
    if (trackUrl !== null && gamePhase === "playing") {
      audioRef.current.play();
    }
  }, [trackUrl, gamePhase]);

  return (
    <Wrapper>
      gameRoom
      <Player src={trackUrl} ref={audioRef}>
        I'm sorry, your browser doesn't supper audio
      </Player>
      <div>{time}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Player = styled.audio``;

export default GameRoom;
