import React from "react";
import styled, { keyframes } from "styled-components";
import { GameRoomContext } from "../../GameRoomContext";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "../../CurrentUserContext";

const SearchBar = () => {
  const { roomId } = useParams();
  const { currentUser } = React.useContext(CurrentUserContext);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [placeHolderText, setPlaceHolderText] = React.useState(
    "Prepare for next song !"
  );

  const { gamePhase, result, setResult } = React.useContext(GameRoomContext);

  React.useEffect(() => {
    if (gamePhase === "loading") {
      setResult(null);
      setSearchTerm("");
      setPlaceHolderText("Prepare for next song !");
    }
    if (gamePhase === "playing") {
      setPlaceHolderText("Guess the song and the artist !");
    }
  }, [gamePhase]);

  React.useEffect(() => {
    if (result === "success") {
      setPlaceHolderText("You got the correct answer !");
    }
    if (result === "artist") {
      setPlaceHolderText("Now guess the song name !");
    }
    if (result === "songName") {
      setPlaceHolderText("Now guess the artist !");
    }
  }, [result]);

  return (
    <Wrapper>
      <Input
        result={result}
        value={searchTerm}
        placeholder={placeHolderText}
        onChange={(ev) => {
          setSearchTerm(ev.target.value);
        }}
        onAnimationEnd={(ev) => {
          setResult(null);
        }}
        onKeyDown={(ev) => {
          if (ev.key === "Enter" && gamePhase === "playing") {
            fetch("/validateAnswer", {
              method: "PATCH",
              body: JSON.stringify({
                currentUser: currentUser,
                roomId: roomId,
                searchTerm: searchTerm.trim(),
              }),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                setSearchTerm("");
                if (!data.artist && !data.songName) {
                  setResult("fail");
                  return;
                }
                if (data.artist && data.songName) {
                  setResult("success");
                  return;
                }
                if (data.artist) {
                  console.log("data artits", data.artist);
                  setResult("artist");
                  return;
                }
                if (data.songName) {
                  setResult("songName");
                  return;
                }
              });
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

const Fail = keyframes`
0%{
  transform: translateX(0)
}
20%{
  transform: translateX(15px)
}
40%{
  transform: translateX(0px)
}
60%{
  transform: translateX(-15px)
}
100%{
  transform: translateX(0px)
}
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

  :focus {
    outline: none;
  }

  animation: ${(props) => (props.result === "fail" ? Fail : null)} 500ms
    ease-in-out;
`;
