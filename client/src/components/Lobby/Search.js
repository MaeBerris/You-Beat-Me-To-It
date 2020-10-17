import React from "react";
import styled from "styled-components";
import GenericLabel from "../Labels/GenericLabel";
// import Button from "../Button/Button";
import { LobbyContext } from "../../LobbyContext";
import Results from "./Results";
import Spinner from "../Spinner/Spinner";

function searchToUrl(searchTerm) {
  const searchArray = searchTerm.split(" ");
  const searchString = searchArray.join("%20");
  return searchString;
}

const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isOpen, setIsOpen] = React.useState("false");
  const { playlistState, startSearch, receivePlaylists } = React.useContext(
    LobbyContext
  );
  return (
    <SearchPlaylist>
      <GenericLabel>Search for a playlist:</GenericLabel>
      <TopBar>
        <Input
          value={searchTerm}
          placeholder="Ex: Best of the 80's"
          onChange={(ev) => setSearchTerm(ev.target.value)}
          onKeyDown={(ev) => {
            switch (ev.key) {
              case "Enter": {
                if (searchTerm.length > 1) {
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
                      setIsOpen(true);
                    });
                }
              }
              default: {
              }
            }
          }}
        />
        {playlistState.loadState === "loading" && (
          <SpinnerPosition>
            <Spinner size={35} color={"grey"} />
          </SpinnerPosition>
        )}
      </TopBar>
      {playlistState.loadState === "idle" &&
      playlistState.searchResults !== null &&
      isOpen === true ? (
        <Results setIsOpen={setIsOpen} />
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
  position: relative;
`;

const SpinnerPosition = styled.div`
  width: fit-content;
  position: absolute;
  right: 20px;
  top: 20px;
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
