import React from "react";
import Search from "../Search/search";
import { Link } from "react-router-dom";

import "./nav.scss";

const Nav = () => {
  return (
    <div className="nav">
      <div className="inner-nav">
        <Link to="/" className="logo">
          Simp Checker
        </Link>
        <Search />
      </div>
    </div>
  );
};

export default Nav;
