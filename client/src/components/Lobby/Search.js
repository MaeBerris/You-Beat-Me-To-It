import React from "react";
import styled from "styled-components";
import GenericLabel from "../Labels/GenericLabel";
import Button from "../Button/Button";

function searchToUrl(searchTerm) {
  const searchArray = searchTerm.split(" ");
  const searchString = searchArray.join("%20");
  return searchString;
}

const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  return (
    <SearchPlaylist>
      <GenericLabel>Search for a playlist:</GenericLabel>
      <TopBar>
        <Input
          value={searchTerm}
          onChange={(ev) => setSearchTerm(ev.target.value)}
        />
        <Button
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
        </Button>
      </TopBar>
      <Results>No Results</Results>
    </SearchPlaylist>
  );
};

export default Search;

const SearchPlaylist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 70%;
  color: black;
  border-radius: 30px;
  border: none;
  text-align: center;
  font-size: 40px;
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
