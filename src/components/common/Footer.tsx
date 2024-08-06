import styled, { css } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { typography } from "../../style/typography";
import HomeIcon from "../../assets/Icons/home.svg?react";
import RankingIcon from "../../assets/Icons/ranking.svg?react";
import InfoIcon from "../../assets/Icons/info.svg?react";
import MyPageIcon from "../../assets/Icons/mypage.svg?react";

interface IconProps {
  isActive?: boolean;
}

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <FooterContainer>
      <IconWrapper
        onClick={() => navigate("/")}
        isActive={location.pathname === "/"}>
        <HomeIcon />
        <span>홈</span>
      </IconWrapper>
      <IconWrapper
      // onClick={() => navigate("/")}
      // isActive={location.pathname === "/"}
      >
        <RankingIcon />
        <span>랭킹</span>
      </IconWrapper>
      <IconWrapper
      // onClick={() => navigate("/")}
      // isActive={location.pathname === "/"}
      >
        <InfoIcon />
        <span>정보</span>
      </IconWrapper>
      <IconWrapper
      // onClick={() => navigate("/")}
      // isActive={location.pathname === "/"}
      >
        <MyPageIcon />
        <span>마이페이지</span>
      </IconWrapper>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  height: 64px;
  position: fixed;
  bottom: 0;
  max-width: 480px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const IconWrapper = styled.div<IconProps>`
  ${({ isActive }) =>
    isActive
      ? css`
          ${typography.title_01}
          color:var(--primary-color);
          svg {
            stroke: var(--primary-color);
            fill: var(--primary-color);
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
