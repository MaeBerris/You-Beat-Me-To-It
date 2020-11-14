import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { GameRoomContext } from "../../GameRoomContext";
import { CurrentUserContext } from "../../CurrentUserContext";
import ProgressBar from "./ProgressBar";
import Cassette from "./Cassette";
import SearchBar from "./SearchBar";
import PreviousSong from "./PreviousSongs";
import * as firebase from "firebase";
import Ranking from "./Ranking";
import { FiVolume, FiVolumeX, FiVolume1, FiVolume2 } from "react-icons/fi";
import { ip } from "../../ip";

const asyncRequest = async (roomId) => {
  await fetch(`${ip}/updatePhase`, {
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

  fetch(`${ip}/updateRound?roomId=${roomId}`, {
    method: "GET",
    headers: { accept: "application/json" },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

const GameRoom = () => {
  const { roomId } = useParams();
  const {
    trackUrl,
    setTrackUrl,
    gamePhase,
    setGamePhase,
    setTrackInfo,
    round,
  } = React.useContext(GameRoomContext);
  const { currentUser } = React.useContext(CurrentUserContext);
  const [time, setTime] = React.useState(5);
  const [volume, setVolume] = React.useState(0.5);

  const audioRef = React.useRef(null);

  React.useEffect(() => {
    audioRef.current.volume = volume;
  }, [audioRef, volume]);

  //This sets the interval for the timer
  React.useEffect(() => {
    let interval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);

    //Host updates the phase when the host timer reaches 0
    if (time === 0 && gamePhase === "loading" && currentUser.role === "host") {
      fetch(`${ip}/updatePhase`, {
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
      asyncRequest(roomId);
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
        if (round > 9) {
          setGamePhase(phase);
          return;
        }
        setTime(30);
        audioRef.current.play();
        console.log("playtrack");
      }
      if (phase === "loading") {
        setTime(5);
        audioRef.current.pause();
        console.log("stopTrack");
      }
      setGamePhase(phase);
    });
    return () => {
      const gamePhaseRef = firebase.database().ref(`Rooms/${roomId}/phase`);
      gamePhaseRef.off();
    };
  }, [roomId, round]);

  //This updates the current song during the loading stage
  React.useEffect(() => {
    if (gamePhase === "loading" && currentUser.role === "host") {
      console.log("in fetch track");
      fetch(`${ip}/updateCurrentTrack`, {
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
    const currentTrackInfo = firebase
      .database()
      .ref(`/Rooms/${roomId}/currentTrack/trackInfo`);
    currentTrackInfo.on("value", (snapshot) => {
      let currentTrackInfo = snapshot.val();
      if (currentTrackInfo) {
        setTrackInfo(currentTrackInfo);
        setTrackUrl(currentTrackInfo.preview);
      }
    });

    return () => {
      currentTrackInfo.off();
    };
  }, [roomId]);

  return (
    <Wrapper>
      <SlidderWrapper>
        <Button
          onClick={() => {
            if (volume > 0) {
              setVolume(0);
              return;
            }
            if (volume === 0) {
              setVolume(0.5);
              return;
            }
          }}
        >
          {volume === 0.5 && <FiVolume size={35} />}
          {volume === 0 && <FiVolumeX size={35} />}
          {volume < 0.5 && volume > 0 && <FiVolume1 size={35} />}
          {volume > 0.5 && <FiVolume2 size={35} />}
        </Button>
        <Slider
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={(ev) => {
            setVolume(ev.target.value / 100);
          }}
        />
      </SlidderWrapper>

      <Player src={trackUrl} ref={audioRef}>
        I'm sorry, your browser doesn't support audio
      </Player>
      <SearchBar />
      <ProgressBar time={time} />
      <Cassette time={time}></Cassette>
      <BottomSection>
        <PreviousSong />
        <Ranking />
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

const Slider = styled.input`
  width: 100%;
`;

const SlidderWrapper = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
  background: white;
  border-radius: 10px;
  width: 50px;
  transition: width 1s, opacity 1s;
  margin-bottom: 15px;

  input:nth-child(2) {
    opacity: 0;
    transition: opacity 0.8s;
  }

  :hover {
    width: 200px;
    input:nth-child(2) {
      opacity: 1;
    }
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  width: 45px;
  height: 45px;
  cursor: pointer;
`;

export default GameRoom;
