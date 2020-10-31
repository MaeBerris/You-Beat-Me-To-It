import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import GenericLabel from "../Labels/GenericLabel";
import { CurrentUserContext } from "../../CurrentUserContext";
import { AiFillCrown } from "react-icons/ai";
import COLORS from "../../COLORS";

const Ranking = () => {
  const { usersList, setCurrentRoomId, currentUser } = React.useContext(
    CurrentUserContext
  );

  const { roomId } = useParams();

  React.useEffect(() => {
    setCurrentRoomId(roomId);
  }, [roomId]);

  return (
    <Wrapper>
      <GenericLabel>Ranking: </GenericLabel>
      <UsersListWrapper>
        {usersList.map((user, index) => {
          return (
            <UserWrapper key={user.playerId}>
              <Rank>{index + 1}.</Rank>
              {user.role === "host" ? (
                <Icon>
                  <AiFillCrown />
                </Icon>
              ) : null}
              <UserName
                style={{
                  color: `${
                    currentUser.playerId === user.playerId
                      ? COLORS.midnight
                      : "black"
                  }`,
                }}
              >
                {user.nickName}
              </UserName>
              <Score>{user.points}pts.</Score>
            </UserWrapper>
          );
        })}
      </UsersListWrapper>
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
  padding: 10 30px;
  font-size: 30px;
  width: 100%;
  min-height: 100px;
  background: white;
  transition: 500ms;
`;

const UserWrapper = styled.div`
  display: flex;
`;

const Rank = styled.h1`
  font-size: 40px;
  font-weight: 800;
`;

const Icon = styled.div`
  width: fit-content;
`;

const Score = styled.div``;

const UserName = styled.div``;
