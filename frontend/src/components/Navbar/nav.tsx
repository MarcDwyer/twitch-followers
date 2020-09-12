import React from "react";
import Search from "../Search/search";
import { Theme } from "../../theme";
import { FaHome } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import "./nav.scss";

const HomeBtn = styled(FaHome)`
  font-size: 33px;
  position: absolute;
  cursor: pointer;
  margin: auto 0 auto 0;
  left: 8.5px;
  top: 20px;
`;

const Nav = () => {
  const history = useHistory();

  return (
    <div className="nav" style={{ backgroundColor: Theme.shadeColor }}>
      <HomeBtn onClick={() => history.push("/")} />
      <Search />
    </div>
  );
};

export default Nav;
