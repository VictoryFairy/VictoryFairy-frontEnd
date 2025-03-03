import styled, { css } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { typography } from "@/style/typography";
import { sendGaEvent } from "@/utils/sendGaEvent";
import Icon from "./Icon";

interface IconProps {
  $isActive: boolean;
}

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <FooterContainer>
      <IconWrapper
        onClick={() => {
          sendGaEvent("footer", "홈 탭 클릭", "홈");
          navigate("/home");
        }}
        $isActive={location.pathname === "/home"}>
        <Icon icon='IcHome' />
        <span>홈</span>
      </IconWrapper>
      <IconWrapper
        onClick={() => {
          sendGaEvent("footer", "랭킹 탭 클릭", "랭킹");
          navigate("/ranking");
        }}
        $isActive={location.pathname === "/ranking"}>
        <Icon icon='IcRanking' />
        <span>랭킹</span>
      </IconWrapper>
      <IconWrapper
        onClick={() => {
          sendGaEvent("footer", "정보 탭 클릭", "정보");
          navigate("/info");
        }}
        $isActive={location.pathname === "/info"}>
        <Icon icon='IcInfo' />
        <span>정보</span>
      </IconWrapper>
      <IconWrapper
        onClick={() => {
          sendGaEvent("footer", "마이페이지 탭 클릭", "마이페이지");
          navigate("/mypage");
        }}
        $isActive={location.pathname.startsWith("/mypage")}>
        <Icon icon='IcMypage' />
        <span>마이페이지</span>
      </IconWrapper>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  background-color: var(--white);
  height: 76px;
  position: fixed;
  bottom: 0;
  max-width: 480px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div<IconProps>`
  ${({ $isActive }) =>
    $isActive
      ? css`
          ${typography.title_01}
          color: ${({ theme }) => theme.colors.primary};
          svg {
            stroke: ${({ theme }) => theme.colors.primary};
            fill: ${({ theme }) => theme.colors.primary};
          }
        `
      : css`
          ${typography.subtitle_02}
          color:var(--gray-400);
          svg {
            stroke: var(--gray-400);
            fill: var(--gray-400);
          }
        `}
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 98.5px;
  height: 56px;
  border: 1px 0 0 0;
  cursor: pointer;
  span {
    margin-top: 5px;
  }
  > svg * {
    stroke-width: 0.1;
  }
`;

export default Footer;
