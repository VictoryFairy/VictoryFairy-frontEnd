import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header, { HeaderProps } from "../common/Header";
import Footer from "../common/Footer";

interface LayoutProps extends HeaderProps {
  footer?: boolean;
}

const Layout = ({ left, center, right, footer = true }: LayoutProps) => {
  return (
    <LayoutConatiner>
      <Header left={left} center={center} right={right} />
      <MainWrapper>
        <Outlet />
      </MainWrapper>
      {footer && <Footer />}
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
  padding: 60px 20px;
`;

export default Layout;
