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

const createDataBase = async () => {
  // const createRooms = db.ref("Rooms");
  // const createRoom1 = createRooms.child("Room2");
  // createRoom1.set({
  //   users: [{ username: "mae", points: 0 }],
  //   phase: "loading",
  // });
  // return;

  const RoomRef = db.ref("Rooms/Room2/users");
  const userRef = await RoomRef.push({ name: "Joan Mama", points: 3000 });
  setTimeout(() => {
    userRef.update({ points: 5555, lavender: "smelly" });
  }, 10000);
};
createDataBase();
