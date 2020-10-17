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
      <GenericLabel>Users:</GenericLabel>
      {usersList !== null ? (
        <List>
          {Object.values(usersList).map((user) => {
            return <div>{user.nickName}</div>;
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
`;
