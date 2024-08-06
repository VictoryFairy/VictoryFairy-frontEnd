import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Layout = () => {
  return (
    <LayoutConatiner>
      <Header />
      <MainWrapper>
        <Outlet />
      </MainWrapper>
      <Footer />
    </LayoutConatiner>
  );
};

const LayoutConatiner = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 480px;
  min-height: 100vh;
  margin: auto;
  position: relative;
`;

const MainWrapper = styled.main`
  height: 100vh;
  padding-top: 60px;
  padding-bottom: 60px;
`;

export default Layout;
