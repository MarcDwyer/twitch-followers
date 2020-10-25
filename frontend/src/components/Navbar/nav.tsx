import React from "react";
import Search from "../Search/search";
import { Theme } from "../../theme";
import { FaHome } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import "./nav.scss";
import { observer } from "mobx-react-lite";
import Loader from "react-loader-spinner";
import TData from "../../stores/tdata";

const HomeBtn = styled(FaHome)`
  font-size: 33px;
  position: absolute;
  cursor: pointer;
  margin: auto 0 auto 0;
  left: 8.5px;
  top: 20px;
`;

type Props = {
  tData: TData;
};
const Nav = observer(({ tData }: Props) => {
  const history = useHistory();
  return (
    <div className="nav" style={{ backgroundColor: Theme.shadeColor }}>
      <HomeBtn onClick={() => history.push("/")} />
      <div className="search-loader">
        <div className="loader">
          {tData.isLoading && (
            <Loader
              type="Puff"
              color={Theme.reallyLight}
              height={25}
              width={25}
            />
          )}
        </div>
        <Search />
      </div>
    </div>
  );
});

export default Nav;
