import { useState, useCallback, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { usePopup } from "@/hooks/usePopup";
import { logout, passwordChk, withdrawal } from "@/api/mypage/mypage.api";
import Text from "../common/Text";
import { useUserStore } from "../../store/userInfo";
import Icon from "../common/Icon";
import WithDrawPopup from "./WithDrawPopup";
import { isIOS } from "react-device-detect";

const ProfileButtons = () => {
  const [isOpenDraw, setIsOpenDraw] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  // const openWithDrawPopup = useCallback(() => {
  //   setIsOpenDraw(true);
  // }, []);

  const closeWithDrawPopup = useCallback(() => {
    setIsOpenDraw(false);
  }, []);
  const { renderPopup, openPopup, closePopup } = usePopup();
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

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

  // const handleWithDrawClik = () => {
  //   openWithDrawPopup();
  // };

  // const isIOS =
  //   /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  //   !/Chrome|Firefox|Safari/.test(navigator.userAgent);

  const navigate = useNavigate();
  const { supportTeam } = useUserStore((state) => ({
    supportTeam: state.supportTeam,
  }));
  // const { logoutAction } = useAuthStore((state) => ({
  //   logoutAction: state.logoutAction,
  // }));

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

  const withdraw = useMutation<void, Error>({
    mutationFn: withdrawal,
    onSuccess: () => {
      navigate("/");
      localStorage.clear();
    },
    onError: (error) => {
      console.error("로그아웃 중 오류 발생:", error);
    },
  });

  const mutationPasswordChk = useMutation<any, Error, string>({
    mutationFn: passwordChk,
    onSuccess: (data) => {
      setIsPasswordValid(data.isCorrect);
    },
    onError: (error) => {
      console.error("비밀번호 체크 중 오류 발생:", error);
    },
  });

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword = e.target.value;
      setPassword(newPassword);

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      if (newPassword) {
        debounceTimeoutRef.current = setTimeout(() => {
          mutationPasswordChk.mutate(newPassword);
        }, 300);
      } else {
        setIsPasswordValid(false);
      }
    },
    [],
  );
  return (
    <Container>
      {isOpenDraw && (
        <WithDrawPopup
          title='확인'
          message='탈퇴 후 복구가 불가능합니다.<br />탈퇴 하시려면 비밀번호를 입력해주세요.'
          confirmMessage='탈퇴'
          closePopup={closeWithDrawPopup}
          confirmFunc={() => {
            withdraw.mutate();
          }}
          active={isPasswordValid}
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
              <div
                style={{
                  width: "100%",
                  position: "relative",
                }}>
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={onPasswordChange}
                  value={password}
                  style={{
                    width: "100%",
                    height: "40px",
                    border: "none",
                    borderBottom: "1px solid var(--gray-400)",
                    outline: "none",
                    margin: "5px 0",
                    paddingRight: "40px",
                  }}
                />
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "20px",
                    height: "20px",
                  }}>
                  {showPassword ? (
                    <Icon icon='IcShow' />
                  ) : (
                    <Icon icon='IcHide' />
                  )}
                </button>
              </div>

              {isPasswordValid === false && (
                <Text variant='caption' color='var(--red-600)'>
                  입력하신 비밀번호가 일치하지 않습니다.
                </Text>
              )}
            </div>
          }
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

export default ProfileButtons;
