import React from "react";
import styled from "styled-components";
import { LobbyContext } from "../../LobbyContext";

const Results = ({ setIsOpen }) => {
  const { playlistState, selectPlaylist } = React.useContext(LobbyContext);
  return (
    <Wrapper className="bob">
      {playlistState.searchResults.map((item) => {
        return (
          <ResultWrapper
            key={item.id}
            onClick={() => {
              selectPlaylist(item);
              setIsOpen(false);
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
