import styled from "styled-components";
import Profile from "../components/mypage/Profile";
import ProfileButtons from "../components/mypage/ProfileButtons";

const MyPage = () => {
  return (
    <Container>
      <Profile />
      <ProfileButtons />
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  max-width: 480px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default MyPage;
