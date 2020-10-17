import React from "react";
import styled, { keyframes } from "styled-components";
import { LobbyContext } from "../../LobbyContext";

const Results = ({ setIsOpen }) => {
  const { playlistState, selectPlaylist } = React.useContext(LobbyContext);
  const [animation, setAnimation] = React.useState("open");
  return (
    <Wrapper
      className="bob"
      animation={animation}
      onAnimationEnd={() => {
        console.log("in Animation function");
        if (animation === "close") {
          setIsOpen(false);
        }
      }}
    >
      {playlistState.searchResults.map((item) => {
        return (
          <ResultWrapper
            key={item.id}
            onClick={() => {
              selectPlaylist(item);
              // setIsOpen(false);
              setAnimation("close");
            }}
          >
            <Image src={item.picture_medium} />
            <ResultsInfo>
              <Title>{item.title}</Title>
              <Tracks>{item.nb_tracks} tracks</Tracks>
            </ResultsInfo>
          </ResultWrapper>
        );
      })}
    </Wrapper>
  );
};

export default Results;

const Open = keyframes`
from{
  transform: scaleY(0)
}to{
  transform: scaleY(1)
}
`;

const Close = keyframes`
from{
  transform: scaleY(1)
}to{
  transform: scaleY(0)
}
`;

const Wrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  font-size: 30px;
  max-height: 300px;
  overflow: scroll;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: white;
  margin-bottom: 15px;
  overflow-x: hidden;
  transform-origin: top;
  animation: ${(props) => (props.animation === "open" ? Open : Close)} 220ms
    ease-in-out;
  animation-fill-mode: forwards;
`;

const ResultWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  cursor: pointer;
  :hover {
    background: #eadaf0;
  }
`;

const Image = styled.img`
  width: 75px;
  height: 75px;
  margin-right: 10px;
`;

const ResultsInfo = styled.div`
  width: 100%;
`;

const Title = styled.div`
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Tracks = styled.p`
  font-size: 70%;
  font-weight: 400;
  color: lightgrey;
`;
