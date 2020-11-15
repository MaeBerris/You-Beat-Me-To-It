import React from "react";
import styled, { keyframes } from "styled-components";
import { GameRoomContext } from "../../GameRoomContext";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "../../CurrentUserContext";
import calculateDistance from "./LevenTest";
import wrong from "../../assets/sounds/wrong.mp3";
import correct from "../../assets/sounds/correct.mp3";
import success from "../../assets/sounds/success.mp3";
import { ip } from "../../ip";

function fetchHelper(roomId, currentUser, correctGuess) {
  fetch(`${ip}/validateAnswer`, {
    method: "PUT",
    body: JSON.stringify({
      currentUser: currentUser,
      roomId: roomId,
      correctGuess,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

const SearchBar = ({ wrongRef, correctRef, successRef }) => {
  const { roomId } = useParams();
  const { currentUser, correctGuess, setCorrectGuess } = React.useContext(
    CurrentUserContext
  );
  const [searchTerm, setSearchTerm] = React.useState("");
  const [placeHolderText, setPlaceHolderText] = React.useState(
    "Prepare for your first song !"
  );

  const { gamePhase, result, setResult, trackInfo, round } = React.useContext(
    GameRoomContext
  );

  React.useEffect(() => {
    if (gamePhase === "loading") {
      setCorrectGuess({ artist: false, songName: false });
      setResult(null);
      setSearchTerm("");

      if (round === 10) {
        setPlaceHolderText("Prepare for final ranking !");
        return;
      }
      if (round === 0) {
        setPlaceHolderText("Prepare for your first song !");
        return;
      }
      setPlaceHolderText("Prepare for next song !");
    }
    if (gamePhase === "playing") {
      setPlaceHolderText("Guess the song and the artist !");
    }
  }, [gamePhase, round]);

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

  React.useEffect(() => {
    if (result === "fail" && wrongRef.current) {
      wrongRef.current.play();
    }
    if (result === "artist" || (result === "songName" && correctRef.current)) {
      correctRef.current.play();
    }
    if (result === "success" && successRef.current) {
      successRef.current.play();
    }
  }, [result, wrongRef, correctRef, successRef]);

  return (
    <Wrapper>
      <audio ref={wrongRef} src={wrong} />
      <audio ref={correctRef} src={correct} />
      <audio ref={successRef} src={success} />
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
          if (
            ev.key === "Enter" &&
            gamePhase === "playing" &&
            result !== "success"
          ) {
            const artist = trackInfo.artist.name.toLowerCase();

            const songName = trackInfo.title_short
              .split("(")[0]
              .toLowerCase()
              .trim();

            const artistResult = calculateDistance(
              searchTerm,
              artist,
              "artist"
            );
            const songNameResult = calculateDistance(
              searchTerm,
              songName,
              "songName"
            );
            const d = new Date();
            const timeStamp = d.getTime();

            setSearchTerm("");

            if (
              artistResult.artist === false &&
              songNameResult.songName === false
            ) {
              setResult("fail");
              return;
            }

            if (artistResult.artist && songNameResult.songName) {
              setResult("success");
              setCorrectGuess({
                artist: true,
                songName: true,
              });
              fetchHelper(roomId, currentUser, {
                artist: true,
                songName: true,
                timeStamp: timeStamp,
                previousGuess: correctGuess,
              });
              return;
            }

            if (artistResult.artist) {
              if (
                correctGuess.songName === true &&
                correctGuess.artist === false
              ) {
                setResult("success");
                setCorrectGuess({ artist: true, songName: true });
                fetchHelper(roomId, currentUser, {
                  artist: true,
                  songName: true,
                  timeStamp: timeStamp,
                  previousGuess: correctGuess,
                });
                return;
              }
              setResult("artist");
              setCorrectGuess({ artist: true, songName: false });
              fetchHelper(roomId, currentUser, {
                artist: true,
                songName: false,
                timeStamp: null,
                previousGuess: correctGuess,
              });
              return;
            }

            if (songNameResult.songName) {
              if (
                correctGuess.songName === false &&
                correctGuess.artist === true
              ) {
                setResult("success");
                setCorrectGuess({ artist: true, songName: true });
                fetchHelper(roomId, currentUser, {
                  artist: true,
                  songName: true,
                  timeStamp: timeStamp,
                  previousGuess: correctGuess,
                });
                return;
              }
              setResult("songName");
              setCorrectGuess({ artist: false, songName: true });
              fetchHelper(roomId, currentUser, {
                artist: false,
                songName: true,
                timeStamp: null,
                previousGuess: correctGuess,
              });
              return;
            }
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
    color: ${(props) => (props.result === "success" ? " #34eb98" : "#eadaf0")};
  }

  :focus {
    outline: none;
  }

  animation: ${(props) => (props.result === "fail" ? Fail : null)} 500ms
    ease-in-out;
`;
