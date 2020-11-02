import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import GenericLabel from "../Labels/GenericLabel";
import { CurrentUserContext } from "../../CurrentUserContext";
import { AiFillCrown } from "react-icons/ai";
import COLORS from "../../COLORS";

const correctGuessOutput = (usersCorrectGuess) => {
  console.log(usersCorrectGuess);
  if (usersCorrectGuess.artist && usersCorrectGuess.songName)
    return `in ${usersCorrectGuess.time.toFixed(2)} seconds`;
  if (usersCorrectGuess.artist) {
    return "The artist";
  }
  if (usersCorrectGuess.songName) {
    return "The song's name ";
  }
};

const Ranking = () => {
  const {
    usersList,
    setCurrentRoomId,
    currentUser,
    currentTrackGuesses,
  } = React.useContext(CurrentUserContext);

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
                  <CorrectGuessWrapper>
                    Guessed:{" "}
                    {currentTrackGuesses[`${user.playerId}`] && (
                      <span>
                        {correctGuessOutput(
                          currentTrackGuesses[`${user.playerId}`]
                        )}
                      </span>
                    )}
                  </CorrectGuessWrapper>
                </UserInfoWrapper>
              </InfoWrapper>
              <ScoreInfoWrapper>
                <Score>{user.points}pts.</Score>
              </ScoreInfoWrapper>
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
  padding: 10px;
  font-size: 30px;
  width: 100%;
  background: white;
  transition: 500ms;
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

const Time = styled.div`
  font-style: italic;
  font-weight: 400;
  font-size: 20px;
  color: grey;
  display: flex;
  align-items: center;
`;

const ScoreInfoWrapper = styled.div`
  display: flex;
`;

const CorrectGuessWrapper = styled.div`
  font-size: 20px;
`;

const NameWrapper = styled.div`
  display: flex;
`;
