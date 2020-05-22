import React from "react";
import Search from "../Search/search";
import { Link } from "react-router-dom";
import { Theme } from "../../theme";
import { useSelector } from "react-redux";
import { ReduxStore } from "../../reducers/main";
import { FaTwitch } from "react-icons/fa";

import Recently from "../Recently_Searched/rs";

import "./nav.scss";

const Nav = () => {
  const viewing = useSelector(
    (store: ReduxStore.Store) => store.appData.userData?.viewing,
  );
  console.log(viewing);
  return (
    <div className="nav" style={{ backgroundColor: Theme.shadeColor }}>
      <div className="inner-nav">
        <Link to="/" className="logo">
          Followers
        </Link>
        <div className="user-info">
          {viewing && (
            <React.Fragment>
              <span className="display-name">
                {viewing.display_name}
              </span>
              <a
                href={`https://www.twitch.tv/${viewing.name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitch color="#5b24c2" />
              </a>
            </React.Fragment>
          )}
        </div>
        <div className="searchbar">
          <Search />
        </div>
        <Recently />
      </div>
    </div>
  );
};

export default Nav;
