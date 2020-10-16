import React from "react";
import styled from "styled-components";
import GenericLabel from "../Labels/GenericLabel";
import { LobbyContext } from "../../LobbyContext";
import { FiX } from "react-icons/fi";
const SelectedPlaylist = () => {
  const { playlistState, deletePlaylist } = React.useContext(LobbyContext);

  return (
    <Wrapper>
      <GenericLabel>Selected Playlist:</GenericLabel>
      {Object.values(playlistState.selectedPlaylist).map((item) => {
        return (
          <ResultWrapper key={item.id} onClick={() => {}}>
            <Image src={item.picture_medium} />
            <ResultsInfo>
              <Title>{item.title}</Title>
              <Tracks>{item.nb_tracks} tracks</Tracks>
            </ResultsInfo>
            <Icon
              onClick={(ev) => {
                deletePlaylist(item);
              }}
            >
              <FiX size={35} color={"lightgray"} />
            </Icon>
          </ResultWrapper>
        );
      })}
    </Wrapper>
  );
};

export default SelectedPlaylist;

const Wrapper = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 30px;
`;

const ResultWrapper = styled.div`
  background: white;
  border-radius: 15px;
  width: 100%;
  display: flex;
  padding: 10px;
  position: relative;
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
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Tracks = styled.p`
  font-size: 70%;
  font-weight: 400;
  color: lightgrey;
`;

const Icon = styled.button`
  color: red;
  position: absolute;
  border: none;
  cursor: pointer;
  top: 0;
  right: 0;
  background: none;
`;
