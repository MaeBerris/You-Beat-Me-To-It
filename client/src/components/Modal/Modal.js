import React from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import { useHistory, useParams } from "react-router-dom";
import { CurrentUserContext } from "../../CurrentUserContext";
import { GameRoomContext } from "../../GameRoomContext";

const Modal = () => {
  const history = useHistory();
  const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext);
  const { setModal } = React.useContext(GameRoomContext);
  const { roomId } = useParams();
  return (
    <Wrapper>
      <ModalWrapper>
        <Title>Do you really wanna leave ?</Title>
        <Description>All of your points will be lost.</Description>
        <ButtonsWrapper>
          <Button
            handler={() => {
              fetch("/deleteUser", {
                method: "DELETE",
                body: JSON.stringify({ currentUser, roomId }),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  history.push("/");
                  setCurrentUser(null);
                  console.log(data);
                });
            }}
          >
            Leave
          </Button>
          <Button
            handler={() => {
              setModal(false);
            }}
          >
            Stay
          </Button>
        </ButtonsWrapper>
      </ModalWrapper>
    </Wrapper>
  );
};

export default Modal;

const Wrapper = styled.div`
  min-height: 100vh;
  height: 130%;
  width: 100vw;
  top: -30px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 400;
`;

const ModalWrapper = styled.div`
  width: 30%;
  padding: 10px;
  border-radius: 30px;
  background: white;
  text-align: center;
  opacity: 100%;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 5px;
`;

const Description = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
`;
