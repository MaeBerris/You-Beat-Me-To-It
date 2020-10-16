import React from "react";
import styled from "styled-components";
import GenericLabel from "../Labels/GenericLabel";
import Button from "../Button/Button";
import Search from "./Search";
import SelectedPlaylist from "./SelectedPlaylist";
const HostLobby = () => {
  return (
    <Wrapper>
      <Search />
      <BottomSection>
        <SelectedPlaylist />
        <div></div>
      </BottomSection>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  align-items: center;
`;

const BottomSection = styled.div`
  margin-top: 20px;
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
`;

export default HostLobby;
