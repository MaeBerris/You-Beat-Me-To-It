import React from "react";

export const GameRoomContext = React.createContext(null);

const GameRoomContextProvider = ({ children }) => {
  const [trackUrl, setTrackUrl] = React.useState(null);
  const [gamePhase, setGamePhase] = React.useState(null);
  const [trackInfo, setTrackInfo] = React.useState(null);
  const [historyArray, setHistoryArray] = React.useState([]);
  const [result, setResult] = React.useState(null);

  console.log("inContextPhase", gamePhase);

  React.useEffect(() => {
    if (trackInfo) {
      setHistoryArray([...historyArray, trackInfo]);
    }
  }, [trackInfo]);

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
      }}
    >
      {children}
    </GameRoomContext.Provider>
  );
};

export default GameRoomContextProvider;
