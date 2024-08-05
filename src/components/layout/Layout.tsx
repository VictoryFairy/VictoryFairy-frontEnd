import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const LayoutConatiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 480px;
  height: 852px;
  margin: auto;
`;

const Layout: React.FC = () => {
  return (
    <LayoutConatiner>
      <Outlet />
    </LayoutConatiner>
  );
};

export default Layout;
