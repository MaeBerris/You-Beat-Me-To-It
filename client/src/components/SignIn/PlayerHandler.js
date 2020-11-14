const PlayerHandler = ({
  nickName,
  setNickName,
  setCurrentUser,
  history,
  roomId,
  setLoading,
  setError,
}) => {
  setLoading(true);
  fetch(`https://you-beat-me-to-it.herokuapp.com/${roomId}/createUser`, {
    method: "POST",
    body: JSON.stringify({
      nickName: nickName,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Something went wrong, please try again");
      }
      return res.json();
    })
    .then((data) => {
      setNickName("");
      setLoading(false);
      setCurrentUser(data.userInfo);
    })
    .catch((err) => {
      setLoading(false);
      setError(err);
      console.log(err);
    });
};

export default PlayerHandler;
