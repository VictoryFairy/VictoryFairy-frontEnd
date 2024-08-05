import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Layout = () => {
  return (
    <LayoutConatiner>
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
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

const OutletWrapper = styled.div`
  margin: 0 20px;
`;

export default Layout;
