/* eslint-disable react/jsx-boolean-value */
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { checkRefreshToken } from "@/api/auth/auth.api";
import { sendGaEvent } from "@/utils/sendGaEvent";
import { typography } from "@/style/typography";
import { usePopup } from "@/hooks/usePopup";
import axiosInstance from "@/api/axios";
import { useAuthStore } from "@/store/authStore";
import Text from "../components/common/Text";
import onBoardingWebp from "../assets/images/onboarding/onBoarding.webp";
import onBoardingPng from "../assets/images/onboarding/onBoarding.png";

type AuthProvider = "kakao" | "apple" | "google";

const BASE_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const navigate = useNavigate();
  const { renderPopup, openPopup, closePopup } = usePopup();
  const { loginAction } = useAuthStore();

  useEffect(() => {
    const checkToken = async () => {
      try {
        // URL 쿼리 파라미터 확인 (소셜 로그인 콜백)
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get("status");

        if (status) {
          // 상태에 따른 처리
          switch (status) {
            case "LOGIN":
              const response = await axiosInstance.post(
                `${BASE_URL}/auth/token/issue`,
              );
              loginAction(response.data.acToken, response.data.teamId);
              navigate("/home");
              window.history.replaceState(
                {},
                document.title,
                window.location.pathname,
              );

              break;
            case "SIGNUP":
              const response2 = await axiosInstance.post(
                `${BASE_URL}/auth/token/issue`,
              );
              loginAction(response2.data.acToken, response2.data.teamId);
              navigate("/team-selection");

              break;
            case "DUPLICATE":
              // 모달 팝업 사용 - 여기서 return 추가
              openPopup({
                title: "계정 중복",
                message:
                  "같은 이메일로 가입된 계정이 있습니다. 해당 계정으로 로그인 후 마이페이지에서  연동해주세요.",
                buttons: [
                  {
                    label: "확인",
                    variant: "confirm",
                    onClick: () => {
                      window.history.replaceState(
                        {},
                        document.title,
                        window.location.pathname,
                      );

                      closePopup();
                      navigate("/login");
                    },
                  },
                ],
              });
              return; // 여기서 함수 종료
            case "FAIL":
              // 실패 시에도 모달 사용 - 여기서 return 추가
              openPopup({
                title: "로그인 실패",
                message: "로그인에 실패했습니다. 다시 시도해주세요.",
                buttons: [
                  {
                    label: "확인",
                    variant: "confirm",
                    onClick: () => {
                      window.history.replaceState(
                        {},
                        document.title,
                        window.location.pathname,
                      );
                      closePopup();
                    },
                  },
                ],
              });
              return; // 여기서 함수 종료
            default:
              navigate("/");
          }
        } else {
          // 일반적인 페이지 접근 시
          await checkRefreshToken();
          navigate("/home");
        }
      } catch (err) {
        navigate("/");
      }
    };

    checkToken();
  }, [navigate, openPopup, closePopup]);

  // postMessage 이벤트 리스너
  useEffect(() => {
    let isHandled = false; // 중복 처리 방지를 위한 플래그 추가

    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== window.origin) return;
      if (event.data?.type !== "SOCIAL_LOGIN_RESULT") return;
      if (isHandled) return; // 이미 처리된 경우 리턴

      isHandled = true; // 처리 시작 표시
      const { status, flowType, pid, provider } = event.data.payload;

      // console.log("소셜 로그인 결과", status, flowType, pid, provider);

      if (status === "fail") {
        openPopup({
          title: "로그인 실패",
          message:
            "소셜 로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.",
          buttons: [
            {
              label: "확인",
              variant: "confirm",
              onClick: closePopup,
            },
          ],
        });
        return;
      }

      try {
        const response = await axiosInstance.post(
          `${BASE_URL}/auth/login/${provider}/handle`,
          { pid },
          { withCredentials: true },
        );

        // 응답 데이터로 로그인 처리
        const { acToken, teamId, teamName } = response.data;
        // console.log("응답 데이터", response, acToken, teamId, teamName);
        loginAction(acToken, teamId);

        // teamId가 없으면 회원가입 플로우로 간주
        if (!teamId) {
          navigate("/team-selection");
        } else {
          navigate("/home");
        }
      } catch (error: any) {
        if (error.response?.status === 409) {
          // 계정 중복 처리
          openPopup({
            title: "계정 중복",
            message:
              "같은 이메일로 가입된 계정이 있습니다. 해당 계정으로 로그인 후 마이페이지에서 연동해주세요.",
            buttons: [
              {
                label: "확인",
                variant: "confirm",
                onClick: () => {
                  closePopup();
                  navigate("/login");
                },
              },
            ],
          });
        } else {
          // 기타 오류 처리
          openPopup({
            title: "오류",
            message: "처리 중 오류가 발생했습니다. 다시 시도해주세요.",
            buttons: [
              {
                label: "확인",
                variant: "confirm",
                onClick: closePopup,
              },
            ],
          });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      isHandled = false; // 클린업 시 플래그 초기화
    };
  }, [navigate, loginAction, openPopup, closePopup]);

  // const handleClickSignUp = () => {
  //   sendGaEvent("초기페이지", "회원가입 클릭", "회원가입 버튼");
  //   navigate("/signup");
  // };

  const handleClickLogin = () => {
    sendGaEvent("초기페이지", "이메일로 로그인 클릭", "이메일로 로그인 버튼");
    navigate("/login");
  };

  const handleClickSocialLogin = useCallback(
    (provider: AuthProvider) => {
      sendGaEvent("초기페이지", "소셜 로그인 클릭", "소셜 로그인 버튼");

      // 소셜 로그인 요청 URL
      const url = `${BASE_URL}/auth/login/${provider}`;

      const loginWindow = window.open(url, "_blank");

      if (!loginWindow) {
        openPopup({
          title: "알림",
          message:
            "팝업이 차단되었습니다. 팝업 차단을 해제하고 다시 시도해주세요.",
          buttons: [
            {
              label: "확인",
              variant: "confirm",
              onClick: closePopup,
            },
          ],
        });
      }
    },
    [openPopup, closePopup],
  );

  const handleClickTerms = (type: string) => {
    if (type === "이용약관") {
      sendGaEvent("초기페이지", "이용약관 클릭", "이용약관 버튼");
      // window.location.href =
      //   "https://confused-cell-b3a.notion.site/1a70e990a12080f29f14e5effb1e9fab";
      window.open(
        "https://confused-cell-b3a.notion.site/1a70e990a12080f29f14e5effb1e9fab",
        "_blank",
      );
    } else {
      sendGaEvent(
        "초기페이지",
        "개인정보처리방침 클릭",
        "개인정보처리방침 버튼",
      );
      window.open(
        "https://confused-cell-b3a.notion.site/1a70e990a12080b9b766c44ea68bdf65",
        "_blank",
      );
    }
  };

  return (
    <Container>
      <Image>
        <source srcSet={onBoardingWebp} type='image/webp' />
        <img src={onBoardingPng} alt='승리요정 이미지' />
      </Image>
      <TextContainer>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text variant='display'>승리요정과 함께</Text>
          <Text variant='display'>응원할 준비가 되셨나요?</Text>
        </div>
        <Text variant='body_long_02' color='#545763'>
          서비스 이용을 위해 로그인을 진행해주세요.
        </Text>
      </TextContainer>

      <SocialLoginContainer>
        <SocialButton>
          <img
            src='/kakao.png'
            alt='카카오 로그인'
            onClick={() => handleClickSocialLogin("kakao")}
          />
        </SocialButton>
        <SocialButton>
          <img
            src='/apple.png'
            alt='애플 로그인'
            onClick={() => handleClickSocialLogin("apple")}
          />
        </SocialButton>
        <SocialButton>
          <img
            src='/google.png'
            alt='구글 로그인'
            onClick={() => handleClickSocialLogin("google")}
          />
        </SocialButton>
      </SocialLoginContainer>
      <StyledText onClick={handleClickLogin}>이메일로 로그인</StyledText>

      <TermsText variant='caption_long'>
        회원가입을 진행할 경우, 아래의 정책에 대해 동의한 것으로
        간주합니다.{" "}
      </TermsText>
      <TermsContainer>
        <Term onClick={() => handleClickTerms("이용약관")}>이용약관</Term>
        <Term onClick={() => handleClickTerms("개인정보처리방침")}>
          개인정보처리방침
        </Term>
      </TermsContainer>
      {renderPopup()}
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
`;

const Image = styled.picture`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  img {
    width: 290px;
    height: 290px;
    object-fit: contain;
  }
`;

const TextContainer = styled.div`
  text-align: center;
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const SocialLoginContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
`;

const SocialButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: none;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

const TermsText = styled(Text)``;

const StyledText = styled.p`
  ${typography.body_01}
  border-bottom: 1px solid #545763;
  cursor: pointer;
  color: #545763;
  margin-bottom: 50px;
`;

const TermsContainer = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Term = styled.span`
  ${typography.subtitle_01}
  cursor: pointer;
  font-weight: 600;
  border-bottom: 1px solid #545763;
  display: inline-block;
`;

export default Home;
