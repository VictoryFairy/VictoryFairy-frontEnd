import styled from "styled-components";
import { typography } from "../../style/typography";

const Profile = () => {
  return (
    <Container>
      <ProfileWrapper>
        <ProfileImgWrapper src='https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/28/e4727123-666e-4603-a2fa-b2478b3130bd.jpg' />
        <ProfileRankWrapper>
          <ProfileNameWrapper>
            <span>유재석</span>
            <button type='button'>생성</button>
          </ProfileNameWrapper>
          <ProfilePerWrapper>
            <div>
              <span>승률</span>
              <span>80</span>
            </div>
            <div>
              <span>승요력</span>
              <span>50P</span>
            </div>
          </ProfilePerWrapper>
        </ProfileRankWrapper>
      </ProfileWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 169px;
  width: 100%;
  gap: 25px;
  padding: 20px 0;
  box-sizing: border-box;
`;

const ProfileWrapper = styled.div`
  height: 129px;
  width: 80%;
  gap: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const ProfileImgWrapper = styled.img`
  width: 129px;
  height: 129px;
  border-radius: 100%;
`;

const ProfileRankWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 141px;
  height: 117px;
`;

const ProfileNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 140px;
  height: 28px;
  gap: 10px;
  > span {
    ${typography.headline}
    color:var(--gray-700)
  }
  > button {
    ${typography.subtitle_01}
    width: 66px;
    height: 24px;
    border-radius: 4px;
    padding: 4px 8px;
    gap: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: #1d92fe;
    color: var(--white);
    cursor: pointer;
  }
`;

const ProfilePerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    width: 53px;
    height: 60px;
    gap: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > span {
      color: #545f71;
    }
    > span:first-child {
      ${typography.title_02}
    }
    > span:nth-child(2) {
      ${typography.display}
    }
  }
`;
export default Profile;
