import React from "react";
import COLORS from "../../COLORS";
import styled from "styled-components";
import Button from "../Button/Button";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "../../CurrentUserContext";
import { GameRoomContext } from "../../GameRoomContext";

import { AiFillCrown } from "react-icons/ai";

const GameOverScreen = () => {
  const [reset, setReset] = React.useState(false);
  const { usersList, setCurrentRoomId, currentUser } = React.useContext(
    CurrentUserContext
  );
  const {
    setIsGameOver,
    setRound,
    setTrackUrl,
    setTrackInfo,
    setHistoryArray,
  } = React.useContext(GameRoomContext);
  const { roomId } = useParams();

  React.useEffect(() => {
    setIsGameOver(true);
    return () => {
      setIsGameOver(false);
      setTrackUrl(null);
      setTrackInfo(null);
      setRound(0);
      setHistoryArray([]);
    };
  }, []);

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
      {currentUser.role === "host" ? (
        <ButtonsWrapper>
          <Button
            handler={() => {
              fetch(`/${roomId}/lobbyReset`, {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  setReset(true);
                  console.log(data);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Return to Lobby
          </Button>
          <Button
            handler={() => {
              fetch(`/${roomId}/GameReset`, {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                })
                .catch((err) => console.log(err));
            }}
          >
            Restart Game
          </Button>
        </ButtonsWrapper>
      ) : (
        <Title>
          Plase wait for the host to choose to return to the lobby or to restart
          game.
        </Title>
      )}
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
  width: 100%;
  margin: 20px 0px;
`;
