import React from "react";
import styled from "styled-components";
import GenericLabel from "../Labels/GenericLabel";
import Button from "../Button/Button";
import LobbyContext from "../../LobbyContext";

function searchToUrl(searchTerm) {
  const searchArray = searchTerm.split(" ");
  const searchString = searchArray.join("%20");
  return searchString;
}

const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const {}
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
      <Results>No Results</Results>
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
  height: 75px;
  color: black;
  border-radius: 40px;
  border: none;
  text-align: left;
  font-size: 60px;
  padding: 0 30px;
  margin-top: 10px;

  &::placeholder {
    color: lightgray;
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
