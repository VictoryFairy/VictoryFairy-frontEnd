import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { typography } from "../../style/typography";
import ArrowRight from "../../assets/Icons/arrow-right.svg?react";
import { usePopup } from "../../hooks/usePopup";
import Text from "../common/Text";

const ProfileButtons = () => {
  const { Popup, isOpen, openPopup } = usePopup();
  const [popupText, setPopupText] = useState("");
  const handleLogoutClick = () => {
    openPopup();
  };

  const navigate = useNavigate();
  return (
    <Container>
      {isOpen && popupText === "로그아웃" && (
        <Popup
          title='확인'
          message='정말 로그아웃 하시겠습니까?'
          type='confirm'
          confirmMessage='로그아웃'
          confirmFunc={() => {
            alert("완료");
          }}
        />
      )}
      {isOpen && popupText === "회원탈퇴" && (
        <Popup
          title='확인'
          message='탈퇴 후 복구가 불가능합니다.<br />탈퇴 하시려면 비밀번호를 입력해주세요.'
          type='test'
          confirmMessage='탈퇴'
          confirmFunc={() => {
            alert("완료");
          }}
          comp={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}>
              <Text variant='caption' color='var(--gray-700)'>
                비밀번호
              </Text>
              <input
                style={{
                  width: "100%",
                  height: "40px",
                  border: "none",
                  borderBottom: "1px solid var(--gray-400)",
                  outline: "none",
                  margin: "5px 0",
                }}
              />
              <Text variant='caption' color='var(--red-600)'>
                입력하신 비밀번호가 일치하지 않습니다.
              </Text>
            </div>
          }
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
        <div
          role='button'
          tabIndex={0}
          onClick={() => {
            setPopupText("로그아웃");
            handleLogoutClick();
          }}>
          로그아웃
        </div>
        <div
          role='button'
          tabIndex={0}
          onClick={() => {
            setPopupText("회원탈퇴");
            handleLogoutClick();
          }}>
          회원탈퇴
        </div>
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
