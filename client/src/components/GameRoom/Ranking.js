import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import GenericLabel from "../Labels/GenericLabel";
import { GameRoomContext } from "../../GameRoomContext";
import * as firebase from "firebase";

const Ranking = () => {
  return (
    <Wrapper>
      <GenericLabel>Ranking: </GenericLabel>
      <UsersListWrapper></UsersListWrapper>
    </Wrapper>
  );
};
export default Ranking;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 30px;
  margin-bottom: 50px;
  padding-right: 30px;
`;

const UsersListWrapper = styled.div`
  border-radius: 10px;
  padding: 10px;
  font-size: 30px;
  width: 100%;
  min-height: 100px;
  background: white;
  transition: 500ms;
`;
