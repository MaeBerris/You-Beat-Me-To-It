import React from "react";
import styled from "styled-components";
import GenericLabel from "../Labels/GenericLabel";
import Button from "../Button/Button";
import { CurrentUserContext } from "../../CurrentUserContext";
import { useHistory } from "react-router-dom";

const SignInHost = () => {
  const [nickName, setNickName] = React.useState("");
  const { setCurrentUser } = React.useContext(CurrentUserContext);
  const history = useHistory();
  return (
    <Wrapper>
      <GenericLabel>Nickname:</GenericLabel>
      <Input
        value={nickName}
        onChange={(ev) => {
          if (ev.target.value.length > 30) {
          } else {
            setNickName(ev.target.value);
          }
        }}
      />
      <Button
        handler={() => {
          console.log("inEvent");
          fetch("/createRoom", {
            method: "POST",
            body: JSON.stringify({
              nickName: nickName,
            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setNickName("");
              setCurrentUser(data.userInfo);
              console.log("data", data);
              history.push(`/lobby/${data.roomInfo.roomId}`);
            })
            .catch((err) => console.log(err));
        }}
      >
        Create Private Game
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-top: 100px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 400px;
  height: 50px;
  color: black;
  border-radius: 30px;
  border: none;
  text-align: center;
  font-size: 40px;
  margin-bottom: 15px;
`;

export default SignInHost;
