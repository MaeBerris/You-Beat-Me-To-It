import React from "react";

export const GameRoomContext = React.createContext(null);

const GameRoomContextProvider = ({ children }) => {
  const [trackUrl, setTrackUrl] = React.useState(null);
  const [gamePhase, setGamePhase] = React.useState(null);
  const [tracksInfoArray, setTracksInfoArray] = React.useState([]);
  const [result, setResult] = React.useState(null);
  console.log("inContext", gamePhase);
  return (
    <GameRoomContext.Provider
      value={{
        trackUrl,
        setTrackUrl,
        gamePhase,
        setGamePhase,
        tracksInfoArray,
        setTracksInfoArray,
        result,
        setResult,
      }}
    >
      {children}
    </GameRoomContext.Provider>
  );
};

export default GameRoomContextProvider;
