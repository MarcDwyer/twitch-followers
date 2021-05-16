import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { Theme } from "../../theme";
import "./search.scss";
import { observer } from "mobx-react-lite";
import { makeObservable, observable, observe } from "mobx";

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
  const [query, setQuery] = useState("");
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/") {
      setQuery("");
    }
  }, [location.pathname]);
  return (
    <div className="search">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          history.push(`/${query}`);
        }}
      >
        <SearchInput
          value={query}
          onChange={(e) => {
            const val = e.target.value;
            setQuery(val);
          }}
          placeholder="Lookup a user"
        />
      </form>
    </div>
  );
};
export default Search;
