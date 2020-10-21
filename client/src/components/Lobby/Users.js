import React from "react";
import styled from "styled-components";
import GenericLabel from "../Labels/GenericLabel";
import Button from "../Button/Button";
import COLORS from "../../COLORS";
import { CurrentUserContext } from "../../CurrentUserContext";
import { useParams } from "react-router-dom";
import * as firebase from "firebase";
import { AiFillCrown } from "react-icons/ai";

const Users = () => {
  const { usersList, setUsersList, currentUser } = React.useContext(
    CurrentUserContext
  );
  const { roomId } = useParams();

  React.useEffect(() => {
    const PlayersRef = firebase.database().ref(`Rooms/${roomId}/players`);
    PlayersRef.on("value", (snapshot) => {
      const players = snapshot.val();
      setUsersList(players);
    });
  }, [setUsersList, roomId]);

  return (
    <Wrapper>
      <GenericLabel>Players:</GenericLabel>
      {usersList !== null ? (
        <List>
          {Object.values(usersList).map((user, index) => {
            return (
              <User
                key={user.nickName + index}
                style={{
                  color: `${
                    currentUser.playerId === user.playerId
                      ? COLORS.midnight
                      : "black"
                  }`,
                }}
              >
                {user.role === "host" ? (
                  <Icon>
                    <AiFillCrown />
                  </Icon>
                ) : null}
                {user.nickName}
              </User>
            );
          })}
          <Button
            handler={() => {
              navigator.clipboard.writeText(window.location);
            }}
          >
            Copy Invite Link
          </Button>
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
  padding: 10px 30px;
  min-width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const User = styled.div`
  margin-bottom: 5px;
  position: relative;
`;

const Icon = styled.div`
  width: fit-content;
  position: absolute;
  left: 0;
  transform: translateX(-100%);
  margin: 0;
`;
