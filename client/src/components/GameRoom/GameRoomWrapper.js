import React from "react";
import GameRoom from "./GameRoom";
import GameOver from "./GameOver";
import { GameRoomContext } from "../../GameRoomContext";

const GameRoomWrapper = () => {
  const { round, gamePhase } = React.useContext(GameRoomContext);

  if (round > 1 && gamePhase === "playing") {
    return <GameOver />;
  }

  return (
    <>
      <GameRoom />
    </>
  );
};

export default GameRoomWrapper;
