import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { GameRoomContext } from "../../GameRoomContext";
import { CurrentUserContext } from "../../CurrentUserContext";
import Cassette from "./Cassette";
import * as firebase from "firebase";

const GameRoom = () => {
  const { roomId } = useParams();
  const { trackUrl, setTrackUrl, gamePhase, setGamePhase } = React.useContext(
    GameRoomContext
  );
  const { currentUser } = React.useContext(CurrentUserContext);
  const [time, setTime] = React.useState(5);
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTime(time - 1);
    }, 1000);
    if (time === 0 && gamePhase === "loading" && currentUser.role === "host") {
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
        });
    }
    if (time === 0 && gamePhase === "playing" && currentUser.role === "host") {
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
      if (phase === "playing") {
        setTime(30);
      }
      if (phase === "loading") {
        setTime(5);
      }
      setGamePhase(phase);
    });
  }, [roomId]);

  React.useEffect(() => {
    if (gamePhase === "loading" && currentUser.role === "host") {
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
          // setTrackUrl(data.selectedSongUrl);
        });
    }
  }, [gamePhase]);

  React.useEffect(() => {
    if (trackUrl !== null && gamePhase === "playing") {
      setTime(30);
      audioRef.current.play();
    }
    if (gamePhase === "loading") {
      setTime(5);
    }
  }, [trackUrl, gamePhase]);

  React.useEffect(() => {
    const currentTrackInfo = firebase
      .database()
      .ref(`/Rooms/${roomId}/currentTrack/trackInfo`);
    currentTrackInfo.on("value", (snapshot) => {
      let currentTrackInfo = snapshot.val();
      setTrackUrl(currentTrackInfo.preview);
    });
  }, [roomId]);

  return (
    <Wrapper>
      <Player src={trackUrl} ref={audioRef}>
        I'm sorry, your browser doesn't supper audio
      </Player>
      <Cassette time={time}></Cassette>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Player = styled.audio``;

export default GameRoom;
