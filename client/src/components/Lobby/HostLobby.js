import React from "react";
import styled from "styled-components";
import GenericLabel from "../Labels/GenericLabel";
import Button from "../Button/Button";
import Search from "./Search";

const HostLobby = () => {
  return (
    <Wrapper>
      <Search />
      {/* <SelectedPlaylist>
        <GenericLabel>Selected Playlist:</GenericLabel>
      </SelectedPlaylist>
      <Users>
        <GenericLabel>Users:</GenericLabel>
      </Users> */}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  justify-content: space-around;
  align-items: center;
`;

const SelectedPlaylist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-direction: column;
  width: 30%;
`;

const Users = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-direction: column;
  width: 30%;
`;

export default HostLobby;
