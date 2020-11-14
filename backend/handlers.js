"use strict";
const { v4: uuidv4 } = require("uuid");
const fetch = require("node-fetch");

const admin = require("firebase-admin");

const { scoreHelper } = require("./scoreHelper");
require("dotenv").config();

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT,
  }),
  databaseURL: process.env.FB_DATABASE_URL,
});

const db = admin.database();

const shortUuidCreator = () => {
  const longUuid = uuidv4();
  const shortUuid = longUuid.split("-");
  return shortUuid[0];
};

const createRoom = (req, res) => {
  try {
    const { nickName } = req.body;
    const host = {
      playerId: shortUuidCreator(),
      role: "host",
      nickName: nickName,
      artist: false,
      songName: false,
      points: 0,
    };
    const RoomId = shortUuidCreator();

    const roomInfo = {
      roomId: RoomId,
      roomLocation: "lobby",
      phase: "loading",
      round: 0,
      players: { [`${host.playerId}`]: host },
      selectedPlaylist: false,
      playlist: false,
      playedTracks: [false],
      currentTrack: {
        timeStamp: false,
        trackInfo: false,
        correctGuesses: { userId: "guess" },
      },
    };

    const RoomKey = db.ref(`Rooms/${RoomId}`);
    RoomKey.set(roomInfo).then(() => {
      res
        .status(201)
        .json({ message: "success", userInfo: host, roomInfo: roomInfo });
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ message: "error", error: error });
  }
};

const searchPlaylist = (req, res) => {
  try {
    const { searchTerm } = req.query;
    fetch(`https://api.deezer.com/search/playlist?q=${searchTerm}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        res.status(200).json({ searchResults: response.data });
      })
      .catch((err) => res.status(500).json({ message: `${err}` }));
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const createUser = (req, res) => {
  try {
    const { nickName } = req.body;
    const { roomId } = req.params;

    const player = {
      playerId: shortUuidCreator(),
      role: "player",
      nickName: nickName,
      artist: false,
      songName: false,
      points: 0,
    };

    const PlayersRef = db.ref(`Rooms/${roomId}/players`);
    PlayersRef.update({ [`${player.playerId}`]: player }).then(() => {
      res.status(201).json({ message: "success", userInfo: player });
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updatePlaylist = (req, res) => {
  try {
    const { selectedPlaylist, roomId } = req.body;
    let valueToSet = selectedPlaylist;
    if (Object.keys(valueToSet).length === 0) {
      valueToSet = false;
    }
    const playlistRef = db.ref(`Rooms/${roomId}/selectedPlaylist`);
    playlistRef
      .set(valueToSet)
      .then(res.status(200).json({ selectedPlaylist: valueToSet, roomId }));
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const validatePlaylist = async (req, res) => {
  try {
    const { roomId, selectedPlaylist } = req.body;
    const playlistRef = db.ref(`Rooms/${roomId}/selectedPlaylist`);
    playlistRef.set(selectedPlaylist);

    const playlistId = Object.values(selectedPlaylist)[0].id;

    let tracksArray = false;

    await fetch(`https://api.deezer.com/playlist/${playlistId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        tracksArray = response.tracks.data;
      })
      .catch((err) => res.status(500).json({ message: `${err}` }));

    const filteredArray = tracksArray.filter((item) => {
      if (item.readable === true) {
        return true;
      }
    });

    const playlistArrayRef = db.ref(`Rooms/${roomId}/playlist`);

    await playlistArrayRef.set(filteredArray);
    const roomLocation = db.ref(`Rooms/${roomId}`);
    roomLocation.update({ roomLocation: "gameRoom" }).then(
      res.status(200).json({
        roomId,
        selectedPlaylist,
        filteredArray,
      })
    );
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { currentUser, roomId } = req.body;
    console.log(currentUser);
    const userRef = db.ref(`Rooms/${roomId}/players/${currentUser.playerId}`);
    const playersRef = db.ref(`Rooms/${roomId}/players`);
    const roomRef = db.ref(`Rooms/${roomId}`);
    let playersArray;
    await playersRef.once("value", (snapshot) => {
      playersArray = Object.values(snapshot.val());
    });
    if (playersArray.length === 1) {
      roomRef
        .remove()
        .then(res.status(200).json({ message: "deleted room and user" }));
      return;
    }
    userRef.remove().then(res.status(200).json({ message: "deleted user" }));
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const randomUnplayedTrackNumber = async (roomId, playlist) => {
  const playedTracks = db.ref(`/Rooms/${roomId}/playedTracks`);
  let tracksArray;
  await playedTracks.once(
    "value",
    (snapshot) => {
      tracksArray = Object.values(snapshot.val());
    },
    (err) => {
      console.log(err);
    }
  );
  let randomNumber = Math.floor(Math.random() * playlist.length);

  if (playlist.length === tracksArray.length) {
    playedTracks.set([tracksArray[tracksArray.length - 1]]);
    tracksArray = [tracksArray[tracksArray.length - 1]];
  }

  while (tracksArray.includes(randomNumber)) {
    randomNumber = Math.floor(Math.random() * playlist.length);
  }

  playedTracks.push(randomNumber);
  return randomNumber;
};

const updateCurrentTrack = async (req, res) => {
  try {
    const { roomId } = req.body;
    const playlistRef = db.ref(`/Rooms/${roomId}/playlist`);
    const currentTrackRef = db.ref(`/Rooms/${roomId}/currentTrack`);
    const currentTrackInfoRef = db.ref(
      `/Rooms/${roomId}/currentTrack/trackInfo`
    );

    currentTrackRef.update({ correctGuesses: { userId: "guess" } });

    let playlist;
    await playlistRef.once(
      "value",
      (snapshot) => {
        playlist = snapshot.val();
      },
      (err) => {
        console.log(err);
      }
    );
    let songIndex = await randomUnplayedTrackNumber(roomId, playlist);
    currentTrackInfoRef.set(playlist[songIndex]).then(
      res.status(200).json({
        message: "all clear",
        roomId: roomId,
        selectedSongUrl: playlist[songIndex].preview,
        songIndex: songIndex,
        dog: "dog",
      })
    );
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updatePhase = async (req, res) => {
  try {
    const { currentPhase, roomId } = req.body;
    const RoomRef = db.ref(`Rooms/${roomId}`);
    const PhaseRef = db.ref(`Rooms/${roomId}/phase`);
    const d = new Date();
    const timeStamp = d.getTime();
    let phase;
    await PhaseRef.once("value", (snapshot) => {
      console.log(snapshot.val());
      phase = snapshot.val();
    });
    console.log("phase", phase);
    console.log("currentPhase", currentPhase);
    if (phase !== currentPhase) {
      res.status(200).json({ message: "nothing to update" });
      return;
    }
    if (currentPhase === "loading") {
      RoomRef.child("currentTrack").update({ timeStamp: timeStamp });
      RoomRef.update({ phase: "playing" });
      res.status(201).json({ phase: "playing" });
      return;
    }
    if (currentPhase === "playing") {
      RoomRef.update({ phase: "loading" });
      res.status(201).json({ phase: "loading" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const validateAnswer = async (req, res) => {
  try {
    const { currentUser, roomId, correctGuess } = req.body;

    const playerRef = db.ref(`Rooms/${roomId}/players/${currentUser.playerId}`);

    let playerScore;
    await playerRef.once("value", (snapshot) => {
      console.log("snapshot", snapshot.val().points);
      playerScore = snapshot.val().points;
    });

    const timeStampRef = db.ref(`Rooms/${roomId}/currentTrack/timeStamp`);

    let songStartTime;
    await timeStampRef.once("value", (snapshot) => {
      songStartTime = snapshot.val();
    });

    const correctGuessesRef = db.ref(
      `Rooms/${roomId}/currentTrack/correctGuesses`
    );

    let correctGuessTime;
    if (correctGuess.timeStamp) {
      let d = new Date();
      let timeOfAnswer = d.getTime();
      console.log(timeOfAnswer / 1000, correctGuess.timeStamp / 1000);
      correctGuessTime = (timeOfAnswer - songStartTime) / 1000;
    } else {
      correctGuessTime = false;
    }

    if (
      correctGuess.artist &&
      correctGuess.songName &&
      !correctGuess.previousGuess.artist &&
      !correctGuess.previousGuess.songName
    ) {
      await playerRef.update({
        points: playerScore + 10 + scoreHelper(correctGuessTime),
      });
    } else if (correctGuess.artist && correctGuess.songName) {
      await playerRef.update({
        points: playerScore + 5 + scoreHelper(correctGuessTime),
      });
    } else if (
      correctGuess.artist &&
      correctGuess.previousGuess.artist === false
    ) {
      await playerRef.update({ points: playerScore + 5 });
    } else if (
      correctGuess.songName &&
      correctGuess.previousGuess.songName === false
    ) {
      await playerRef.update({ points: playerScore + 5 });
    }

    correctGuessesRef
      .update({
        [`${currentUser.playerId}`]: {
          ...currentUser,
          ...correctGuess,
          time: correctGuessTime,
        },
      })
      .then(res.status(201).json({ message: "update users correct guesses" }));
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateRound = async (req, res) => {
  try {
    const { roomId } = req.query;

    const RoomRef = db.ref(`Rooms/${roomId}`);

    let previousRound;
    await RoomRef.child("round").once("value", (snapshot) => {
      previousRound = snapshot.val();
    });

    RoomRef.update({ round: previousRound + 1 }).then(
      res.status(201).json({ message: `updated round to ${previousRound + 1}` })
    );
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const lobbyReset = async (req, res) => {
  try {
    const { roomId } = req.params;
    const RoomRef = db.ref(`Rooms/${roomId}`);
    const playersRef = db.ref(`Rooms/${roomId}/players`);
    let playersObject;
    await playersRef.once("value", (snapshot) => {
      playersObject = snapshot.val();
    });

    await Object.keys(playersObject).forEach((key) => {
      playersRef.update({
        [`${key}`]: { ...playersObject[`${key}`], points: 0 },
      });
    });
    const roomInfo = {
      roomLocation: "lobby",
      phase: "loading",
      round: 0,
      selectedPlaylist: false,
      playlist: false,
      playedTracks: [false],
      currentTrack: {
        timeStamp: false,
        trackInfo: false,
        correctGuesses: { userId: "guess" },
      },
    };

    RoomRef.update(roomInfo).then(
      res.status(200).json({ message: "reset room" })
    );
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const gameReset = async (req, res) => {
  try {
    const { roomId } = req.params;
    const RoomRef = db.ref(`Rooms/${roomId}`);
    const playersRef = db.ref(`Rooms/${roomId}/players`);
    let playersObject;
    await playersRef.once("value", (snapshot) => {
      playersObject = snapshot.val();
    });

    await Object.keys(playersObject).forEach((key) => {
      playersRef.update({
        [`${key}`]: { ...playersObject[`${key}`], points: 0 },
      });
    });
    const roomInfo = {
      phase: "loading",
      round: 0,
      playedTracks: [false],
      currentTrack: {
        timeStamp: false,
        trackInfo: false,
        correctGuesses: { userId: "guess" },
      },
    };

    RoomRef.update(roomInfo).then(
      res.status(200).json({ message: "reset room" })
    );
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createRoom,
  searchPlaylist,
  createUser,
  updatePlaylist,
  validatePlaylist,
  updateCurrentTrack,
  updatePhase,
  validateAnswer,
  updateRound,
  lobbyReset,
  gameReset,
  deleteUser,
};
