/* eslint-disable react/jsx-boolean-value */
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkRefreshToken } from "@/api/auth/auth.api";
import { sendGaEvent } from "@/utils/sendGaEvent";
import onBoardingPng from "../assets/images/onboarding/onBoarding.png";
import onBoardingWebp from "../assets/images/onboarding/onBoarding.webp";
import Text from "../components/common/Text";
import { typography } from "@/style/typography";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        await checkRefreshToken();
        navigate("/home");
      } catch (err) {
        navigate("/");
      }
    };

    checkToken();
  }, []);

  const handleClickSignUp = () => {
    sendGaEvent("초기페이지", "회원가입 클릭", "회원가입 버튼");
    navigate("/signup");
  };

  const handleClickLogin = () => {
    sendGaEvent("초기페이지", "이메일로 로그인 클릭", "이메일로 로그인 버튼");
    navigate("/login");
  };

  const handleClickTerms = (type: string) => {
    if (type === "이용약관") {
      sendGaEvent("초기페이지", "이용약관 클릭", "이용약관 버튼");
      window.location.href = "https://www.victoryfairy.com/terms/이용약관";
    } else {
      sendGaEvent(
        "초기페이지",
        "개인정보처리방침 클릭",
        "개인정보처리방침 버튼",
      );
      window.location.href =
        "https://www.victoryfairy.com/terms/개인정보처리방침";
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
          <img src='/kakao.png' alt='카카오 로그인' />
        </SocialButton>
        <SocialButton>
          <img src='/apple.png' alt='애플 로그인' />
        </SocialButton>
        <SocialButton>
          <img src='/google.png' alt='구글 로그인' />
        </SocialButton>
      </SocialLoginContainer>
      <StyledText onClick={handleClickLogin}>이메일로 로그인</StyledText>

      <TermsText variant='caption_long'>
        회원가입을 진행할 경우, 아래의 정책에 대해 동의한 것으로 간주합니다.{" "}
      </TermsText>
      <TermsContainer>
        <Term onClick={() => handleClickTerms("이용약관")}>이용약관</Term>
        <Term onClick={() => handleClickTerms("개인정보처리방침")}>
          개인정보처리방침
        </Term>
      </TermsContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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
  margin-bottom: 20px;

  img {
    width: 200px;
    height: 200px;
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
