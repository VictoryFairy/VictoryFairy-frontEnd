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
  height: calc(100% + 60px);
  overflow: hidden;
  max-width: 480px;
  width: calc(100% + 40px);
  margin: 0 -20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: var(--gray-50);
`;

export default MyPage;
