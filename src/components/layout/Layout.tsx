import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header, { HeaderProps } from "../common/Header";
import Footer from "../common/Footer";

const Layout = ({ left, center, right }: HeaderProps) => {
  return (
    <LayoutConatiner>
      <Header left={left} center={center} right={right} />
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
