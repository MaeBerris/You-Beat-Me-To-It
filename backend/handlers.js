"use strict";
const { v4: uuidv4 } = require("uuid");
const fetch = require("node-fetch");

const admin = require("firebase-admin");

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
  const { nickName } = req.body;
  const host = {
    playerId: shortUuidCreator(),
    role: "host",
    nickName: nickName,
    points: 0,
  };
  // const RoomId = shortUuidCreator();
  const RoomId = "room1";

  const roomInfo = {
    roomId: RoomId,
    roomLocation: "lobby",
    phase: "loading",
    players: { host: host },
    selectedPlaylistId: false,
    playlist: false,
    currentTrack: {
      trackId: false,
      trackTitle: false,
      artist: false,
      correctGuesses: [false],
    },
  };

  const RoomKey = db.ref(`Rooms/${RoomId}`);
  RoomKey.set(roomInfo).then(() => {
    res
      .status(201)
      .json({ message: "success", userInfo: host, roomInfo: roomInfo });
  });
};

const searchPlaylist = (req, res) => {
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
      console.log(response);
      res.status(200).json({ searchResults: response.data });
    })
    .catch((err) => res.status(500).json({ message: `${err}` }));
};

const createUser = (req, res) => {
  console.log("in createUser");
  const { nickName, roomId } = req.body;
  const player = {
    playerId: shortUuidCreator(),
    role: "player",
    nickName: nickName,
    points: 0,
  };

  const PlayersRef = db.ref(`Rooms/${roomId}/players`);
  PlayersRef.push(player).then(() => {
    res.status(201).json({ message: "success", userInfo: player });
  });
};

module.exports = {
  createRoom,
  searchPlaylist,
  createUser,
};

// const queryDatabase = async (key) => {
//   const ref = db.ref(key);
//   let data;
//   await ref.once(
//     "value",
//     (snapshot) => {
//       data = snapshot.val();
//     },
//     (err) => {
//       console.log(err);
//     }
//   );

//   return data;
// };
// const getUser = async (email) => {
//   const data = (await queryDatabase("appUsers")) || {};
//   console.log("data", data);

//   const dataValue = Object.keys(data)
//     .map((item) => data[item])
//     .find((obj) => obj.email === email);

//   return dataValue || false;
// };

// const startLoop = (req, res) => {
//   const { roomId } = req.query;
//   const RoomRef = db.ref(`Rooms/${roomId}`);
//   let phase = "loading";
//   let firstPass = true;
//   let time = 0;
//   let round = 1;
//   setInterval(() => {
//     // console.log(time);
//     if (time % 1000 === 0) {
//       console.log(time / 1000);
//     }

//     let isGameOver = round > 5;
//     if (isGameOver) {
//       RoomRef.update({ phase: "gameOver" });
//       phase = "gameOver";
//     }
//     if (phase === "loading" && firstPass === true) {
//       //at the end of the loading phase, start the playPhase
//       console.log("loading");
//       let gamePhaseTimeout = setTimeout(() => {
//         RoomRef.update({ phase: "play" });
//         phase = "play";
//         firstPass = true;
//       }, 5000);
//       firstPass = false;
//     }
//     if (phase === "play" && firstPass === true) {
//       //at the end of the play phase, start loading phase
//       console.log("playing");
//       let playTimeout = setTimeout(() => {
//         RoomRef.update({ phase: "loading" });
//         phase = "loading";
//         firstPass = true;
//         round = round + 1;
//       }, 5000);
//       firstPass = false;
//     }
//     if (phase === "gameOver" && firstPass === true) {
//       console.log("gameOver");
//       let gameOverTimeout = setTimeout(() => {
//         RoomRef.update({ phase: "loading" });
//         phase = "loading";
//         round = 1;
//         firstPass = true;
//       }, 5000);
//       firstPass = false;
//     }
//     time = time + 100;
//   }, 100);

//   res.status(200).json("gameLoop Started");
// };

// React.useEffect(() => {
//   const gamePhaseRef = db.ref("Rooms/RoomId/phase");
//   gamePhaseRef.on("value", (snapshot) => {
//     const gamePhase = snapshot.val();
//     setGamePhase(gamePhase);
//   });

//   if (gamePhase === "loading") {
//     fetch(`/getCurrentSong/${gameRoomId}`).then(setCurrentSong(RESPONSE));
//     setTimer(5000);
//   }

//   if (gamePhase === "play") {
//     deezerPlayer.play(currentSong);
//     setTimer(30000);
//   }
//   if (gamePhase === "gameOver") {
//     setTimer(5000);
//     setDisplayPodium(true);
//   }
// }, [setGamePhase, gamePhase]);

const dataStructure = {
  Rooms: {
    //RoomUuid
    "abcd-345": {
      roomId: "abcd-345",
      roomLocation: "gameRoom",
      phase: "play",
      players: [
        {
          playerId: "q234",
          role: "host",
          userName: "PetitePoire",
          points: 300,
        },
        {
          playerId: "23po",
          role: "player",
          userName: "LucyTheWinner",
          points: 5500,
        },
      ],
      selectedPlaylistId: "123456",
      playlist: {
        //...deezerData
      },
      currentTrack: {
        trackId: "2045",
        trackTitle: "She Loves You",
        artist: "The Beatles",
        correctGuesses: [
          {
            playerId: "q234",
            userName: "PetitePoire",
            pointsAwarded: 300,
            time: 23.52,
          },
        ],
      },
    },
  },
};
