const hostHandler = ({
  nickName,
  setNickName,
  setCurrentUser,
  history,
  setLoading,
  setError,
}) => {
  setLoading(true);
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
    .then((res) => {
      if (!res.ok) {
        throw new Error("Something went wrong, refresh and try again");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      setNickName("");
      setCurrentUser(data.userInfo);
      setLoading(false);
      history.push(`/lobby/${data.roomInfo.roomId}`);
    })
    .catch((err) => {
      setLoading(false);
      setError(err);
      console.log(err);
    });
};

export default hostHandler;
