import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Layout: React.FC = () => {
  return (
    <LayoutConatiner>
      <Outlet />
    </LayoutConatiner>
  );
};

const LayoutConatiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 480px;
  min-height: 100vh;
  margin: auto;
`;

export default Layout;
