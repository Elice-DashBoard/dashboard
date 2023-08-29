import React from "react";
import styled from "styled-components";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <MainContainer>
      <Header />
      <SubContainer>{children}</SubContainer>
    </MainContainer>
  );
};

export default Layout;

const MainContainer = styled.div`
  position: relative;
  height: calc(100vh - 6rem);
`;

const SubContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
