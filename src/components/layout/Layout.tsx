import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../common/Header";
import Bottom from "../common/Bottom";

const Layout = () => {
  return (
    <LayoutConatiner>
      <Header />
      <Outlet />
      <Bottom />
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
  position: relative;
  > div {
    box-sizing: border-box;
    padding: 0 20px;
  }
`;

export default Layout;
