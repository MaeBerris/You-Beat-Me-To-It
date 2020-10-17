import React from "react";
import styled from "styled-components";
import GenericLabel from "../Labels/GenericLabel";
import { CurrentUserContext } from "../../CurrentUserContext";
import { useParams } from "react-router-dom";
import * as firebase from "firebase";

const Users = () => {
  const { usersList, setUsersList } = React.useContext(CurrentUserContext);
  const { roomId } = useParams();

  React.useEffect(() => {
    const roomPhaseRef = firebase.database().ref(`Rooms/${roomId}/players`);
    roomPhaseRef.on("value", (snapshot) => {
      const players = snapshot.val();
      setUsersList(players);
    });
  }, [setUsersList, roomId]);

  return (
    <Wrapper>
      <GenericLabel>Players:</GenericLabel>
      {usersList !== null ? (
        <List>
          {Object.values(usersList).map((user) => {
            return <User>{user.nickName}</User>;
          })}
        </List>
      ) : null}
    </Wrapper>
  );
};

export default Users;

const Wrapper = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 30px;
`;

const List = styled.div`
  background: white;
  border-radius: 15px;
  padding: 10px;
  width: fit-content;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  & :last-child {
    margin-bottom: 0px;
  }
`;

const User = styled.div`
  margin-bottom: 5px;
`;
