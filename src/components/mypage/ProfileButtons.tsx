import styled from "styled-components";
import { typography } from "../../style/typography";

const ProfileButtons = () => {
  return (
    <Container>
      <Button type='button'>응원팀 변경</Button>
      <Button type='button'>프로필 수정</Button>
      <Button type='button'>문의 사항</Button>
      <Button type='button'>로그아웃</Button>
      <span>회원탈퇴</span>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  background-color: var(--white);
  gap: 25px;
  margin-top: 10px;
  > span {
    margin-top: 20px;
    ${typography.title_02}
    cursor: pointer;
  }
`;

const Button = styled.button`
  ${typography.title_02};
  height: 48px;
  width: 80%;
  background-color: var(--white);
  border: 1px solid var(--gray-900);
  border-radius: 8px;
  padding: 12px 16px;
  gap: 10px;
  cursor: pointer;
`;

export default ProfileButtons;
