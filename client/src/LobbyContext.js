import React from "react";
import * as firebase from "firebase";

export const LobbyContext = React.createContext(null);

const initialState = {
  searchResults: null,
  selectedPlaylist: {},
  loadState: "idle",
};

function Reducer(state, action) {
  switch (action.type) {
    case "start-search": {
      return { ...state, loadState: "loading" };
    }
    case "receive-playlists": {
      return { ...state, searchResults: action.playlist, loadState: "idle" };
    }
    case "select-playlist": {
      const selectedPlaylist = { [action.playlist.id]: action.playlist };
      return { ...state, selectedPlaylist: selectedPlaylist };
    }
    case "delete-playlist": {
      return { ...state, selectedPlaylist: {} };
    }
    default:
      throw new Error("Unrecognized Action");
  }
}

const LobbyContextProvider = ({ children }) => {
  const [playlistState, dispatch] = React.useReducer(Reducer, initialState);
  const [roomIdState, setRoomId] = React.useState(null);
  const [location, setLocation] = React.useState("lobby");
  const [roomExists, setRoomExists] = React.useState(null);

  React.useEffect(() => {
    const roomLocationRef = firebase
      .database()
      .ref(`Rooms/${roomIdState}/roomLocation`);

    roomLocationRef.on("value", (snapshot) => {
      let locationFromDatabase = snapshot.val();

      setLocation(locationFromDatabase);
    });
    return () => {
      roomLocationRef.off();
    };
  }, [roomIdState, location]);

  const startSearch = () => {
    dispatch({ type: "start-search" });
  };

  const receivePlaylists = (data) => {
    dispatch({ type: "receive-playlists", playlist: data });
  };

  const selectPlaylist = (data) => {
    dispatch({ type: "select-playlist", playlist: data });
  };

  const deletePlaylist = (data) => {
    dispatch({ type: "delete-playlist" });
  };
  return (
    <LobbyContext.Provider
      value={{
        playlistState,
        startSearch,
        receivePlaylists,
        selectPlaylist,
        deletePlaylist,
        roomIdState,
        setRoomId,
        location,
        roomExists,
        setRoomExists,
      }}
    >
      {children}
    </LobbyContext.Provider>
  );
};

export default LobbyContextProvider;
