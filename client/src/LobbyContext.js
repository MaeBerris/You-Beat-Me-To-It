import React from "react";

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
  const [roomId, setRoomId] = React.useState(null);
  console.log(roomId);
  console.log("playlistState", playlistState);
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
        roomId,
        setRoomId,
      }}
    >
      {children}
    </LobbyContext.Provider>
  );
};

export default LobbyContextProvider;

// export const SeatContext = React.createContext();

// const initialState = {
//   hasLoaded: false,
//   seats: null,
//   numOfRows: 0,
//   seatsPerRow: 0,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "receive-seat-info-from-server": {
//       console.log("action", action);
//       return {
//         ...state,
//         hasLoaded: true,
//         seats: action.seats,
//         numOfRows: action.numOfRows,
//         seatsPerRow: action.seatsPerRow,
//       };
//     }
//     default:
//       throw new Error("Unrecognized Action");
//   }
// }

// export const SeatProvider = ({ children }) => {
//   const [state, dispatch] = React.useReducer(reducer, initialState);

//   const receiveSeatInfoFromServer = (data) => {
//     dispatch({
//       type: "receive-seat-info-from-server",
//       ...data,
//     });
//   };

//   //to add markSeatAsPurchased ?? see exercise 1

//   return (
//     <SeatContext.Provider
//       value={{ state, actions: { receiveSeatInfoFromServer } }}
//     >
//       {children}
//     </SeatContext.Provider>
//   );
// };
