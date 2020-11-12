const hostHandler = ({ nickName, setNickName, setCurrentUser, history }) => {
  fetch("https://you-beat-me-to-it.herokuapp.com/createRoom", {
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
      history.push(`/lobby/${data.roomInfo.roomId}`);
    })
    .catch((err) => console.log(err));
};

export default hostHandler;
