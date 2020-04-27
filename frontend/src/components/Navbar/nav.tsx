import React from "react";
import Search from "../Search/search";
import { Link } from "react-router-dom";
import { Theme } from "../../theme";

import Recently from "../Recently_Searched/rs";

import "./nav.scss";

const Nav = () => {
  return (
    <div className="nav" style={{ backgroundColor: Theme.shadeColor }}>
      <div className="inner-nav">
        <Link to="/" className="logo">
          Followers
        </Link>
        <div className="searchbar">
          <Search />
        </div>
        <Recently />
      </div>
    </div>
  );
};

export default Nav;
