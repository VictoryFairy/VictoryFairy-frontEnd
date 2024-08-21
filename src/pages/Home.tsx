/* eslint-disable react/jsx-boolean-value */
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkRefreshToken } from "@/api/auth/auth.api";
import Button from "../components/common/Button";
import onBoarding from "../assets/images/onboarding/onBoarding.png";
import Text from "../components/common/Text";

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

  return (
    <Container>
      <Image src={onBoarding} alt='환영 이미지' />
      <Header as='h1' variant='headline'>
        환영합니다!
      </Header>
      <Text variant='subtitle_03'>우리팀의 승리를 책임지는 승리요정!</Text>
      <Text variant='subtitle_03'>지금 바로 시작해보세요.</Text>

      <ButtonContainer>
        <Button size='big' type='button' onClick={() => navigate("/signup")}>
          회원가입
        </Button>
        <Button
          size='big'
          styleType='text'
          type='button'
          onClick={() => navigate("/login")}>
          로그인
        </Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
`;

const Image = styled.img`
  width: 100%;
  max-width: 70%;
  height: 300px;
  object-fit: cover;
  margin-bottom: 20px;
`;
const Header = styled(Text)`
  margin-bottom: 20px;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 480px;
  box-sizing: border-box;
  margin-top: 80px;

  button {
    width: 100%;
    margin-bottom: 10px;
  }
`;

export default Home;
