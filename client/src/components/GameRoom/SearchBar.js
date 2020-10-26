import React from "react";
import styled from "styled-components";
import { GameRoomContext } from "../../GameRoomContext";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [placeHolderText, setPlaceHolderText] = React.useState(
    "Prepare for next song !"
  );
  const { gamePhase } = React.useContext(GameRoomContext);

  React.useEffect(() => {
    if (gamePhase === "loading") {
      setSearchTerm("");
      setPlaceHolderText("Prepare for next song !");
    }
    if (gamePhase === "playing") {
      setPlaceHolderText("Guess the song and the artist !");
    }
  }, [gamePhase]);

  return (
    <Wrapper>
      <Input
        value={searchTerm}
        placeholder={placeHolderText}
        onChange={(ev) => {
          setSearchTerm(ev.target.value);
        }}
        onKeyDown={(ev) => {
          if (ev.key === "Enter" && gamePhase === "playing") {
            console.log(searchTerm);
            console.log(searchTerm.trim());
          }
        }}
      />
    </Wrapper>
  );
};
export default SearchBar;

const Wrapper = styled.div`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 55px;
  color: black;
  border-radius: 40px;
  border: none;
  text-align: left;
  font-size: 40px;
  padding: 0 30px;
  margin-top: 10px;

  &::placeholder {
    color: #eadaf0;
  }
`;
