import Text from "@/components/common/Text";
import Button from "@/components/common/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import onBoarding from "../assets/images/onboarding/onBoarding.png";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Image src={onBoarding} alt='환영 이미지' />
      <Header as='h1' variant='headline'>
        존재하지 않는 페이지입니다
      </Header>
      <Text variant='subtitle_03'>
        아래 버튼을 클릭해 홈으로 이동가능합니다!
      </Text>

      <ButtonContainer>
        <Button size='big' type='button' onClick={() => navigate("/home")}>
          홈으로 이동
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
export default NotFound;
