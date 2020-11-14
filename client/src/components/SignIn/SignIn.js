import React from "react";
import styled from "styled-components";
import GenericLabel from "../Labels/GenericLabel";
import Button from "../Button/Button";
import Spinner from "../Spinner/Spinner";
import { CurrentUserContext } from "../../CurrentUserContext";
import { useHistory, useParams } from "react-router-dom";

const SignInHost = ({ buttonHandler, buttonMessage }) => {
  console.log("inSignIn");
  const [nickName, setNickName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { setCurrentUser } = React.useContext(CurrentUserContext);
  const history = useHistory();
  const { roomId } = useParams();
  return (
    <Wrapper>
      <GenericLabel>Nickname:</GenericLabel>
      <Input
        value={nickName}
        onKeyDown={(ev) => {
          if (ev.key === "Enter" && nickName.length >= 1 && !loading) {
            setLoading(true);
            buttonHandler({
              nickName,
              setNickName,
              setCurrentUser,
              history,
              roomId,
              setLoading,
              setError,
            });
          }
        }}
        onChange={(ev) => {
          if (ev.target.value.length > 30) {
          } else {
            setNickName(ev.target.value);
          }
        }}
      />
      <Button
        disabled={nickName.length < 1 || loading}
        handler={() => {
          setLoading(true);
          buttonHandler({
            nickName,
            setNickName,
            setCurrentUser,
            history,
            roomId,
            setLoading,
            setError,
          });
        }}
      >
        {loading ? <Spinner /> : buttonMessage}
      </Button>
      {error && (
        <Error>Something went wrong, please refresh and try again</Error>
      )}
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

  :focus {
    outline: none;
    box-shadow: 0 0 5px black;
  }
`;

const Error = styled.div`
  font-size: 20px;
  color: white;
`;

export default SignInHost;
