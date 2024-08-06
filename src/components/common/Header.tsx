import styled from "styled-components";

const Header = () => {
  return <HeaderContainer>header</HeaderContainer>;
};

const HeaderContainer = styled.div`
  height: 64px;
  position: fixed;
  top: 0;
  max-width: 480px;
  width: 100%;
`;

export default Header;
