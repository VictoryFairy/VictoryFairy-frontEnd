import styled from "styled-components";
import { typography } from "../../style/typography";

const Profile = () => {
  return (
    <Container>
      <div>김예지님, 안녕하세요!</div>
      <ProfileWrapper>
        <ProfileInfoWrapper>
          <span>승률</span>
          <span>
            80<span>%</span>
          </span>
        </ProfileInfoWrapper>
        <img
          src='https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/28/e4727123-666e-4603-a2fa-b2478b3130bd.jpg'
          alt='#'
        />
        <ProfileInfoWrapper>
          <span>승요력</span>
          <span>
            3000<span>P</span>
          </span>
        </ProfileInfoWrapper>
      </ProfileWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 172px;
  padding: 20px 0;
  gap: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: var(--white);
  > :nth-child(1) {
    ${typography.title_02}
  }
`;

const ProfileWrapper = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  > img {
    height: 100px;
    width: 100px;
    border-radius: 100%;
  }
`;

const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  :nth-child(1) {
    ${typography.subtitle_02}
  }
  :nth-child(2) {
    height: 46px;
    display: flex;
    align-items: center;
    ${typography.display}
    >span {
      ${typography.title_02}
      padding-left: 2px;
    }
  }
`;

export default Profile;
