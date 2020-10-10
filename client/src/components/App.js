import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import * as firebase from "firebase";

import { AppContext } from "./AppContext";

const App = () => {
  const { appUser, signInWithGoogle, handleSignOut, message } = useContext(
    AppContext
  );
  const [phaseState, setPhaseState] = React.useState("");
  const [time, setTime] = React.useState(5);
  const [timerIsActive, setTimerIsActive] = React.useState(false);

  React.useEffect(() => {
    let interval = null;
    if (timerIsActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setTime(5);
    }
    return () => clearInterval(interval);
  }, [timerIsActive, time]);

  React.useEffect(() => {
    const roomPhaseRef = firebase.database().ref("Rooms/Room1/phase");
    roomPhaseRef.on("value", (snapshot) => {
      const phase = snapshot.val();
      setPhaseState(phase);
    });
    if (phaseState === "play") {
      setTimerIsActive(true);
    } else {
      setTimerIsActive(false);
    }
  }, [phaseState]);
  return (
    <StyledPageWrapper>
      <StyledHeader>
        {appUser && appUser.email ? (
          <StyledUserContainer>
            <Avatar src={appUser.photoURL} />
            <p>{appUser.displayName}</p>
            <button onClick={handleSignOut}>Sign Out</button>
          </StyledUserContainer>
        ) : (
          <button onClick={signInWithGoogle}>Sign In</button>
        )}
      </StyledHeader>
      {phaseState === "play" ? <div>{time}</div> : <div></div>}

      <StyledContainer>{phaseState}</StyledContainer>
    </StyledPageWrapper>
  );
};

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.nav`
  background: #eaeaea;
  padding: 6px 14px;
  min-height: 48px;
`;

const StyledUserContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

const StyledContainer = styled.div`
  background: #fafafa;
  min-height: 400px;
  padding: 14px;
`;

export default App;
