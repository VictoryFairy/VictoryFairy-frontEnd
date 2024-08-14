import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { typography } from "../../style/typography";
import ArrowRight from "../../assets/Icons/arrow-right.svg?react";
import { usePopup } from "../../hooks/usePopup";

const ProfileButtons = () => {
  const { Popup, isOpen, openPopup } = usePopup();
  const handleLogoutClick = () => {
    openPopup();
  };
  const navigate = useNavigate();
  return (
    <Container>
      {isOpen && (
        <Popup
          title='확인'
          message='정말 로그아웃하시겠습니까?'
          type='confirm'
          confirmMessage='로그아웃'
          confirmFunc={() => {
            alert("완료");
          }}
        />
      )}
      <span>정보 수정</span>
      <ProfileWrapper
        role='button'
        tabIndex={0}
        onClick={() => navigate("/mypage/profile")}>
        <span>프로필 수정</span>
        <ArrowRight />
      </ProfileWrapper>
      <ProfileWrapper
        role='button'
        tabIndex={0}
        onClick={() => navigate("/mypage/team")}>
        <span>응원팀 변경</span>
        <ProfileTeamWrapper>
          <span>LG 트윈스</span>
          <ArrowRight />
        </ProfileTeamWrapper>
      </ProfileWrapper>
      <ProfileLastWrapper>
        <span>문의 사항</span>
        <ArrowRight />
      </ProfileLastWrapper>
      <ProfileLogWrapper>
        <div role='button' tabIndex={0} onClick={handleLogoutClick}>
          로그아웃
        </div>
        <div>회원탈퇴</div>
      </ProfileLogWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: left;
  background-color: var(--white);
  margin-top: 15px;
  padding: 0 20px;
  > span {
    margin: 20px 0;
    ${typography.title_02}
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 8px 0;
  border-bottom: 1px solid var(--gray-100);
  cursor: pointer;

  svg {
    fill: var(--gray-900);
  }
  ${typography.body_02}
`;
const ProfileLastWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 8px 0;
  cursor: pointer;

  svg {
    fill: var(--gray-900);
  }
  ${typography.body_02}
`;

const ProfileLogWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  > :nth-child(1) {
    border-right: 1px solid black;
    color: var(--red-600);
  }
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    padding: 0 15px;
    ${typography.subtitle_02}
    cursor: pointer;
  }
`;

const ProfileTeamWrapper = styled.div`
  display: flex;
  align-items: center;
  :nth-child(1) {
    margin-right: 5px;
  }
`;
export default ProfileButtons;
