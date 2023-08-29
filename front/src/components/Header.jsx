import React from "react";
import styled from "styled-components";

const Header = () => {
  return <HeaderTag>헤더</HeaderTag>;
};

export default Header;

const HeaderTag = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
  max-height: 6rem;
  padding: 2rem;
  background-color: #565656;
  color: #fff;
`;
