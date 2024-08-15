import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ArrowRight from "../../assets/Icons/arrow-right.svg?react";
import { usePopup } from "../../hooks/usePopup";
import Text from "../common/Text";

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
      <Text variant='title_02' color='var(--primary-color)'>
        정보 수정
      </Text>
      <ProfileWrapper
        role='button'
        tabIndex={0}
        onClick={() => navigate("/mypage/profile")}>
        <Text variant='body_02' color='var(--primary-color)'>
          프로필 설정
        </Text>
        <ArrowRight />
      </ProfileWrapper>
      <ProfileWrapper
        role='button'
        tabIndex={0}
        onClick={() => navigate("/mypage/team")}>
        <Text variant='body_02' color='var(--primary-color)'>
          응원팀 변경{" "}
        </Text>
        <ProfileTeamWrapper>
          <Text variant='subtitle_02' color='var(--primary-color)'>
            LG 트윈스
          </Text>
          <ArrowRight />
        </ProfileTeamWrapper>
      </ProfileWrapper>
      <ProfileLastWrapper>
        <Text variant='body_02' color='var(--primary-color)'>
          문의 사항
        </Text>
        <ArrowRight />
      </ProfileLastWrapper>
      <ProfileLogWrapper>
        <div role='button' tabIndex={0} onClick={handleLogoutClick}>
          <Text variant='subtitle_02' color='var(--red-600)'>
            로그아웃
          </Text>
        </div>
        <Text variant='subtitle_02' color='var(--gray-400)'>
          회원탈퇴
        </Text>
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
  padding: 10px 20px;
  > span {
    margin: 20px 0;
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
`;

const ProfileLogWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  > :nth-child(1) {
    border-right: 1px solid var(--gray-400);
    padding: 0 15px;
    cursor: pointer;
  }
  > :nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
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
