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
  width: calc(100% + 40px);
  margin: 0 -20px;
  display: flex;
  flex-direction: column;
  background-color: var(--gray-50);
  overflow-y: scroll;
  > div ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default MyPage;
