import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Theme } from "../../theme";
import "./search.scss";

export const SearchInput = styled.input`
  background-color: ${Theme.lightShade};
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 10px 10px;
  width: 100%;
  height: 100%;
  margin: auto;
  color: inherit;

  ::placeholder {
    color: inherit;
  }
`;
const Search = () => {
  const [search, setSearch] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const { pathname } = history.location;
    if (pathname === "/" && search.length) {
      setSearch("");
    }
  }, [history.location.pathname]);
  return (
    <div className="search">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          history.push(`/${search}`);
        }}
      >
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Lookup a user"
        />
      </form>
    </div>
  );
};

export default Search;
