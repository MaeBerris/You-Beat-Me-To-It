const PlayerHandler = (nickName, setNickName, setCurrentUser, history) => {
  fetch("/createUser", {
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
    })
    .catch((err) => console.log(err));
};

export default PlayerHandler;
