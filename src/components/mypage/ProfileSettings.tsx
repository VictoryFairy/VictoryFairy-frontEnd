import { useState, useCallback, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { usePopup } from "@/hooks/usePopup";
import { logout } from "@/api/mypage/mypage.api";
import Text from "../common/Text";
import { useUserStore } from "../../store/userInfo";
import Icon from "../common/Icon";
import { isIOS } from "react-device-detect";

const ProfileSettings = () => {
  const { renderPopup, openPopup, closePopup } = usePopup();

  const navigate = useNavigate();
  const { renderPopup, openPopup, closePopup } = usePopup();

  const navigate = useNavigate();
  const { supportTeam } = useUserStore((state) => ({
    supportTeam: state.supportTeam,
  }));

  const mutationLogout = useMutation<void, Error>({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/");
      localStorage.clear();
    },
    onError: (error) => {
      console.error("로그아웃 중 오류 발생:", error);
    },
  });

  const handleLogoutClick = () => {
    openPopup({
      title: "로그아웃",
      message: "정말 로그아웃 하시겠습니까?",
      buttons: [
        {
          label: "취소",
          variant: "cancel",
          onClick: closePopup,
        },
        {
          label: "로그아웃",
          variant: "confirm",
          onClick: () => mutationLogout.mutate(),
        },
      ],
    });
  };
  const { supportTeam } = useUserStore((state) => ({
    supportTeam: state.supportTeam,
  }));

  const mutationLogout = useMutation<void, Error>({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/");
      localStorage.clear();
    },
    onError: (error) => {
      console.error("로그아웃 중 오류 발생:", error);
    },
  });

  const handleLogoutClick = () => {
    openPopup({
      title: "로그아웃",
      message: "정말 로그아웃 하시겠습니까?",
      buttons: [
        {
          label: "취소",
          variant: "cancel",
          onClick: closePopup,
        },
        {
          label: "로그아웃",
          variant: "confirm",
          onClick: () => mutationLogout.mutate(),
        },
      ],
    });
  };
  return (
    <Container>
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
        <Icon icon='IcArrowRight' />
      </ProfileWrapper>
      <ProfileWrapper
        role='button'
        tabIndex={0}
        onClick={() => navigate("/mypage/team")}>
        <Text variant='body_02' color='var(--primary-color)'>
          응원팀 변경
        </Text>
        <ProfileTeamWrapper>
          <Text variant='subtitle_02' color='var(--primary-color)'>
            {supportTeam}
          </Text>
          <Icon icon='IcArrowRight' />
        </ProfileTeamWrapper>
      </ProfileWrapper>
      {!isIOS && (
        <ProfileWrapper
          role='button'
          tabIndex={0}
          onClick={() => navigate("/mypage/login")}>
          <Text variant='body_02' color='var(--primary-color)'>
            간편 로그인 설정
          </Text>
          <Icon icon='IcArrowRight' />
        </ProfileWrapper>
      )}
      <ProfileWrapper
        role='button'
        tabIndex={0}
        onClick={() => navigate("/mypage/changePassword")}>
        <Text variant='body_02' color='var(--primary-color)'>
          비밀번호 변경
        </Text>
        <Icon icon='IcArrowRight' />
      </ProfileWrapper>
      <ProfileLastWrapper
        onClick={() => {
          window.open(
            "https://docs.google.com/forms/d/e/1FAIpQLSepo0-LOyIaJivXopayvuO-hWVrKy6xcSiLc5OaKHrMm42JZw/viewform",
            "_blank",
          );
        }}>
        <Text variant='body_02' color='var(--primary-color)'>
          문의 사항
        </Text>
        <Icon icon='IcArrowRight' />
      </ProfileLastWrapper>
      <ProfileLogWrapper>
        <div
          role='button'
          tabIndex={0}
          onClick={() => {
            handleLogoutClick();
          }}>
          <Text variant='subtitle_02' color='var(--red-600)'>
            로그아웃
          </Text>
        </div>
        <div
          role='button'
          tabIndex={0}
          onClick={() => {
            navigate("/mypage/withDraw");
          }}>
          <Text variant='subtitle_02' color='var(--gray-400)'>
            회원탈퇴
          </Text>
        </div>
      </ProfileLogWrapper>
      {renderPopup()}
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
  margin: 15px 0;
  padding: 10px 20px 30px 20px;
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
    border-right: 1px solid var(--gray-100);
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

export default ProfileSettings;
