import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

const SearchInput = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <div className="search">
      <Search
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        enterButton
      />
    </div>
  );
};

export default SearchInput;
