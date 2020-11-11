import React from "react";
import styled, { keyframes } from "styled-components";
import GenericLabel from "../Labels/GenericLabel";
import COLORS from "../../COLORS";
import { CurrentUserContext } from "../../CurrentUserContext";
import { useParams } from "react-router-dom";
import { AiFillCrown } from "react-icons/ai";

const Users = () => {
  const { usersList, currentUser, setCurrentRoomId } = React.useContext(
    CurrentUserContext
  );

  const { roomId } = useParams();
  const [isCopied, setIsCopied] = React.useState(false);

  React.useEffect(() => {
    setCurrentRoomId(roomId);
  }, [roomId]);

  return (
    <Wrapper>
      <GenericLabel>Players:</GenericLabel>
      {usersList !== null ? (
        <List>
          {usersList.map((user, index) => {
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
          <StyledButton
            isCopied={isCopied}
            onClick={() => {
              setIsCopied(true);
              navigator.clipboard.writeText(window.location);
            }}
            onAnimationEnd={() => {
              setIsCopied(false);
            }}
          >
            {isCopied ? "Copied !" : "Copy Invite Link"}
          </StyledButton>
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

const ColorsAnimation = keyframes`
0%{
  background-position: 0% 0%;
  );
}20%{
  background-position: 100% 0%;
} 80% {
  background-position: 100% 0%;
}
100%{
  background-position: 0% 0%;
}`;

const StyledButton = styled.button`
  height: 50px;
  border-radius: 30px;
  font-weight: 700;
  width: 80%;
  padding: 5px 20px;
  font-size: 20px;
  cursor: pointer;
  color: white;
  border: none;
  background: linear-gradient(
    to right,
    ${COLORS.tertiary},
    ${COLORS.secondary},
    #34eb98,
    #34eb98,
    #34eb98
  );
  background-size: 300% 100%;
  overflow: hidden;
  animation: ${(Props) => (Props.isCopied ? ColorsAnimation : null)} 2000ms
    ease-in-out;

  :focus {
    outline: none;
  }
`;
