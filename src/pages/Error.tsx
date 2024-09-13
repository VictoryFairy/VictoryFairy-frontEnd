import Text from "@/components/common/Text";
import Button from "@/components/common/Button";
import styled from "styled-components";
import onBoarding from "../assets/images/onboarding/onBoarding.png";

const Error = () => {
  return (
    <Container>
      <Image src={onBoarding} alt='환영 이미지' />
      <Header as='h1' variant='headline'>
        승요님들 죄송합니다
      </Header>
      <Text variant='subtitle_03'>서비스에 문제가 생겼습니다</Text>
      <Text variant='subtitle_03'>최대한 빨리 서비스 복구하겠습니다!!</Text>

      <ButtonContainer>
        <Button
          size='big'
          type='button'
          onClick={() => window.location.reload()}>
          새로고침
        </Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
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
export default Error;
