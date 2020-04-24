import React from "react";

import Search from "../Search/search";

import "./homepage.scss";

const Homepage = () => {
  return (
    <div className="main-homepage">
      <h2>Search for a user</h2>
      <Search />
    </div>
  );
};

export default Homepage;
