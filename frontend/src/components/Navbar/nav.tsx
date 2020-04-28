import React from "react";
import Search from "../Search/search";
import { Link } from "react-router-dom";
import { Theme } from "../../theme";
import { useSelector } from "react-redux";
import { ReduxStore } from "../../reducers/main";

import Recently from "../Recently_Searched/rs";

import "./nav.scss";

const Nav = () => {
  const data = useSelector((store: ReduxStore.Store) => store.results.userData);
  console.log(data);
  return (
    <div className="nav" style={{ backgroundColor: Theme.shadeColor }}>
      <div className="inner-nav">
        <Link to="/" className="logo">
          Followers
        </Link>
        <h2 className="display-name">
          {data ? `Viewing: ${data.viewing.display_name}` : `Search for a user`}
        </h2>
        <div className="searchbar">
          <Search />
        </div>
        <Recently />
      </div>
    </div>
  );
};

export default Nav;
