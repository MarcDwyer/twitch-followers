import React from "react";
import Search from "../Search/search";
import { Link } from "react-router-dom";
import { Theme } from "../../theme";

import "./nav.scss";

const Nav = () => {
  return (
    <div className="nav" style={{ backgroundColor: Theme.shadeColor }}>
      <div className="inner-nav">
        <Link to="/" className="logo">
          Simp Checker
        </Link>
        <div className="searchbar">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Nav;
