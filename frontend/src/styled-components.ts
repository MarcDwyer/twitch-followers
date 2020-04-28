import styled from "styled-components";
import { Link } from "react-router-dom";
import { Theme } from "./theme";

export const MyInput = styled.input`
  background-color: #2b2b2b;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 10px 10px;
  width: 100%;
`;

export const RecentLink = styled(Link)`
  background-color: rgba(43,43,43, .25);
  width: 100%;
  display: flex;
  margin: 5px 0 5px 0;

  span {
    padding: 8.5px 8.5px;
    color: ${Theme.color};
  }

  &:hover {
  background-color: rgba(43,43,43, .65);

  }
`;

export const MyLink = styled(Link)`
  width: 100%;
  background-color: rgba(43,43,43, .45);
  text-align: center;
 color: ${Theme.color};
 padding: 5px 5px;

 &:hover {
  background-color: rgba(43,43,43, .75);
   color: inherit;
 }
`;

export const AnchorLink = styled.a`
  width: 100%;
  margin-top: 5px;
  background-color: rgba(43,43,43, .45);
  text-align: center;
 color: ${Theme.color};
 padding: 5px 5px;

 &:hover {
  background-color: rgba(43,43,43, .75);
   color: inherit;
 }
`;
