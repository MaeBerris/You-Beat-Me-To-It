import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { GameRoomContext } from "../../GameRoomContext";
import { CurrentUserContext } from "../../CurrentUserContext";
import Cassette from "./Cassette";
import SearchBar from "./SearchBar";
import PreviousSong from "./PreviousSongs";
import * as firebase from "firebase";

const GameRoom = () => {
  const { roomId } = useParams();
  const {
    trackUrl,
    setTrackUrl,
    gamePhase,
    setGamePhase,
    trackInfo,
    setTrackInfo,
  } = React.useContext(GameRoomContext);
  const { currentUser } = React.useContext(CurrentUserContext);
  const [time, setTime] = React.useState(5);
  const audioRef = React.useRef(null);

  //This sets the interval for the timer
  React.useEffect(() => {
    let interval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);
    //Host updates the phase when the host timer reaches 0
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
        })
        .catch((err) => console.log(err));

      fetch(`/updateRound?roomId=${roomId}`, {
        method: "GET",
        headers: { accept: "application/json" },
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
    return () => {
      clearInterval(interval);
    };
  }, [time, gamePhase]);

  //This checks for gamePhase change and sets the timer to the appropriate phase
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
    return () => {
      const gamePhaseRef = firebase.database().ref(`Rooms/${roomId}/phase`);
      gamePhaseRef.off();
    };
  }, [roomId]);

  //This updates the current song during the loading stage
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

  //This starts and stops the track
  React.useEffect(() => {
    if (trackUrl !== null && gamePhase === "playing") {
      audioRef.current.play();
    }
    if (trackUrl !== null && gamePhase === "loading") {
      audioRef.current.pause();
    }
  }, [trackUrl, gamePhase]);

  //this gets the current track info
  React.useEffect(() => {
    const currentTrackInfo = firebase
      .database()
      .ref(`/Rooms/${roomId}/currentTrack/trackInfo`);
    currentTrackInfo.on("value", (snapshot) => {
      let currentTrackInfo = snapshot.val();

      setTrackInfo(currentTrackInfo);
      setTrackUrl(currentTrackInfo.preview);
    });
  }, [roomId]);

  return (
    <Wrapper>
      <Player src={trackUrl} ref={audioRef}>
        I'm sorry, your browser doesn't supper audio
      </Player>
      <SearchBar />
      <Cassette time={time}></Cassette>
      <BottomSection>
        <PreviousSong />
        <div></div>
      </BottomSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  padding: 0 40px;
`;

const Player = styled.audio``;

const BottomSection = styled.div`
  margin-top: 20px;
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
`;

export default GameRoom;
