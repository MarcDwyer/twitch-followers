import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { MyInput } from "../../styled-components";

const SearchInput = () => {
  const [search, setSearch] = useState<string>("");
  const history = useHistory();

  return (
    <div className="search">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          history.push(`/${search}`);
        }}
      >
        <MyInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Lookup a user"
        />
      </form>
    </div>
  );
};

export default SearchInput;
