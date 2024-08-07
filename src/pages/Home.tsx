import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Image
        src='https://static-cdn.sporki.com/news/sportschosun/20238/1000397/c_2023081801001381300185091.jpg'
        alt='환영 이미지'
      />
      <Title>환영합니다!</Title>
      <Subtitle>우리팀의 승리를 책임지는 승리요정!</Subtitle>
      <Subtitle>지금 바로 시작해보세요.</Subtitle>

      <ButtonContainer>
        <Button
          type='button'
          variant='primary'
          onClick={() => navigate("/signup")}>
          회원가입
        </Button>
        <Button
          type='button'
          variant='secondary'
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
  padding: 20px;
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

const Title = styled.h1`
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  margin: 4px 0;
  text-align: center;
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
