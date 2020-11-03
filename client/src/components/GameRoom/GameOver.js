import React from "react";
import COLORS from "../../COLORS";
import styled from "styled-components";
import Button from "../Button/Button";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "../../CurrentUserContext";
import { AiFillCrown } from "react-icons/ai";

const GameOverScreen = () => {
  const { usersList, setCurrentRoomId, currentUser } = React.useContext(
    CurrentUserContext
  );

  const { roomId } = useParams();

  React.useEffect(() => {
    setCurrentRoomId(roomId);
  }, [roomId]);

  return (
    <Wrapper>
      <Title>Here is the final ranking !</Title>
      <UsersListWrapper>
        {usersList.map((user, index) => {
          return (
            <UserWrapper key={user.playerId}>
              <InfoWrapper>
                <Rank>{index + 1}.</Rank>

                <UserInfoWrapper>
                  <NameWrapper>
                    {user.role === "host" ? (
                      <Icon
                        style={{
                          color: `${
                            currentUser.playerId === user.playerId
                              ? COLORS.midnight
                              : "black"
                          }`,
                        }}
                      >
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
                  </NameWrapper>
                </UserInfoWrapper>
              </InfoWrapper>
              <ScoreInfoWrapper>
                <Score>{user.points}pts.</Score>
              </ScoreInfoWrapper>
            </UserWrapper>
          );
        })}
      </UsersListWrapper>
      <ButtonsWrapper>
        <Button
          handler={() => {
            fetch(`/lobbyReset?roomId=${roomId}`, {});
          }}
        >
          Return to Lobby
        </Button>
        <Button>Restart Game</Button>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default GameOverScreen;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-family: "Echizen";
  font-size: 60px;
  text-shadow: 2px 2px 2px ${COLORS.midnight};
  color: white;
  margin: 20px 0px;
`;

const UsersListWrapper = styled.div`
  border-radius: 10px;
  padding: 10px;
  font-size: 30px;
  width: 50%;
  background: white;
  transition: 500ms;
  text-shadow: none;
  color: black;
  font-family: "";
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0px;
`;

const InfoWrapper = styled.div`
  display: flex;
  max-width: 80%;
`;

const UserInfoWrapper = styled.div``;

const Rank = styled.h1`
  font-size: 40px;
  font-weight: 800;
  margin-right: 5px;
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  width: fit-content;
  margin-top: 5px;
`;

const Score = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
`;

const ScoreInfoWrapper = styled.div`
  display: flex;
`;

const NameWrapper = styled.div`
  display: flex;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 20px 0px;
`;
