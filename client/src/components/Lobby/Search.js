import React from "react";
import styled from "styled-components";
import GenericLabel from "../Labels/GenericLabel";
// import Button from "../Button/Button";
import { LobbyContext } from "../../LobbyContext";

function searchToUrl(searchTerm) {
  const searchArray = searchTerm.split(" ");
  const searchString = searchArray.join("%20");
  return searchString;
}

const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const {
    playlistState,
    startSearch,
    receivePlaylists,
    selectPlaylist,
    deletePlaylist,
  } = React.useContext(LobbyContext);
  return (
    <SearchPlaylist>
      <GenericLabel>Search for a playlist:</GenericLabel>
      <TopBar>
        <Input
          value={searchTerm}
          placeholder="Ex: Best of the 80's"
          onChange={(ev) => setSearchTerm(ev.target.value)}
          onKeyDown={(ev) => {
            console.log(ev.key);
            switch (ev.key) {
              case "Enter": {
                startSearch();
                let string = searchToUrl(searchTerm);
                fetch(`/searchPlaylist?searchTerm=${string}`, {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data);
                    receivePlaylists(data.searchResults);
                  });
              }
            }
          }}
        />
        {/* <Button
          handler={() => {
            let string = searchToUrl(searchTerm);
            fetch(`/searchPlaylist?searchTerm=${string}`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((data) => console.log(data));
          }}
        >
          Search
        </Button> */}
      </TopBar>

      {playlistState.loadState === "idle" &&
      playlistState.searchResults !== null ? (
        <Results>
          {playlistState.searchResults.map((item) => {
            return <p>{item.title}</p>;
          })}
        </Results>
      ) : null}
    </SearchPlaylist>
  );
};

export default Search;

const SearchPlaylist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 55px;
  color: black;
  border-radius: 40px;
  border: none;
  text-align: left;
  font-size: 40px;
  padding: 0 30px;
  margin-top: 10px;

  &::placeholder {
    color: #eadaf0;
  }
`;

const Results = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 5px;
  font-size: 30px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
`;
