import styled from "styled-components";
import Profile from "../components/mypage/Profile";

const MyPage = () => {
  return (
    <Container>
      <Profile />
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default MyPage;
