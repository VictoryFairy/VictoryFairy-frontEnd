import styled from "styled-components";

export interface HeaderProps {
  left?: React.ReactNode | null;
  center?: React.ReactNode | null;
  right?: React.ReactNode | null;
}

const Header = ({ left, center, right }: HeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderSection>{left}</HeaderSection>
      <HeaderSection>{center}</HeaderSection>
      <HeaderSection>{right}</HeaderSection>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  height: 64px;
  position: fixed;
  top: 0;
  max-width: 480px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const HeaderSection = styled.div`
  gap: 12px;
`;

export default Header;
