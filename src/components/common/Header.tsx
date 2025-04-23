import styled from "styled-components";
import { typography } from "@/style/typography";

export interface HeaderProps {
  left?: React.ReactNode | null;
  center?: React.ReactNode | null;
  right?: React.ReactNode | null;
}

const Header = ({ left, center, right }: HeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderSection>{left}</HeaderSection>
      <HeaderSection>
        {/* 직관 기록 페이지에서 사용, 추후 리팩터링 필요 */}
        <CenterText>{center}</CenterText>
      </HeaderSection>
      <HeaderSection>{right}</HeaderSection>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  :nth-child(2) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  height: 64px;
  position: fixed;
  top: 0;
  max-width: 480px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: var(--white);
  z-index: 1;
`;

const HeaderSection = styled.div`
  gap: 12px;
`;

const CenterText = styled.div`
  ${typography.headline}
`;

export default Header;
