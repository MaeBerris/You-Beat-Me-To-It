import React from "react";
import * as firebase from "firebase";
import { LobbyContext } from "./LobbyContext";
import { CurrentUserContext } from "./CurrentUserContext";

export const GameRoomContext = React.createContext(null);

const GameRoomContextProvider = ({ children }) => {
  const [trackUrl, setTrackUrl] = React.useState(null);
  const [gamePhase, setGamePhase] = React.useState(null);
  const [trackInfo, setTrackInfo] = React.useState(null);
  const [historyArray, setHistoryArray] = React.useState([]);
  const [result, setResult] = React.useState(null);
  const [round, setRound] = React.useState(0);
  const [GameRoomId, setRoomId] = React.useState(null);
  const [gameRoomExists, setGameRoomExists] = React.useState(undefined);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [time, setTime] = React.useState(5);
  const [modal, setModal] = React.useState(false);
  const audioRef = React.useRef(null);
  const { currentUser } = React.useContext(CurrentUserContext);
  const { location } = React.useContext(LobbyContext);
  console.log(time);

  React.useEffect(() => {
    const roundRef = firebase.database().ref(`Rooms/${GameRoomId}/round`);
    roundRef.on("value", (snapshot) => {
      setRound(snapshot.val());
    });

    return () => {
      const roundRef = firebase.database().ref(`Rooms/${GameRoomId}/round`);
      roundRef.off();
    };
  }, [GameRoomId]);

  React.useEffect(() => {
    if (trackInfo) {
      setHistoryArray([...historyArray, trackInfo]);
    }
  }, [trackInfo]);

  //This sets the interval for the timer
  React.useEffect(() => {
    let interval;
    if (location === "gameRoom") {
      interval = setInterval(() => {
        if (time > 0) {
          setTime(time - 1);
        }
      }, 1000);
    }

    //Host updates the phase when the host timer reaches 0
    if (time === 0 && gamePhase === "loading" && currentUser.role === "host") {
      fetch("/updatePhase", {
        method: "PUT",
        body: JSON.stringify({ currentPhase: "loading", roomId: GameRoomId }),
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
        body: JSON.stringify({ roomId: GameRoomId, currentPhase: "playing" }),
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

      fetch(`/updateRound?roomId=${GameRoomId}`, {
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
    const gamePhaseRef = firebase.database().ref(`Rooms/${GameRoomId}/phase`);
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
      const gamePhaseRef = firebase.database().ref(`Rooms/${GameRoomId}/phase`);
      gamePhaseRef.off();
    };
  }, [GameRoomId, round]);

  //This updates the current song during the loading stage
  React.useEffect(() => {
    if (
      gamePhase === "loading" &&
      currentUser.role === "host" &&
      location === "gameRoom"
    ) {
      console.log("in fetch track");
      fetch(`/updateCurrentTrack`, {
        method: "PUT",
        body: JSON.stringify({ roomId: GameRoomId }),
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
  }, [gamePhase, location]);

  React.useEffect(() => {
    const currentTrackInfo = firebase
      .database()
      .ref(`/Rooms/${GameRoomId}/currentTrack/trackInfo`);
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
  }, [GameRoomId]);

  return (
    <GameRoomContext.Provider
      value={{
        trackUrl,
        setTrackUrl,
        gamePhase,
        setGamePhase,
        trackInfo,
        setTrackInfo,
        result,
        setResult,
        historyArray,
        setHistoryArray,
        round,
        setRound,
        setRoomId,
        gameRoomExists,
        setGameRoomExists,
        gameStarted,
        setGameStarted,
        time,
        audioRef,
        modal,
        setModal,
      }}
    >
      {children}
    </GameRoomContext.Provider>
  );
};

export default GameRoomContextProvider;
