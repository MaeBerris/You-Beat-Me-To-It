const hostHandler = (nickName, setNickName, setCurrentUser, history) => {
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
};

export default hostHandler;
