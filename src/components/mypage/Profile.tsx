import styled from "styled-components";
import Text from "@/components/common/Text";

const Profile = () => {
  return (
    <Container>
      <Text variant='title_02' color='var(--primary-color)'>
        김예지님, 안녕하세요!
      </Text>
      <ProfileWrapper>
        <ProfileInfoWrapper>
          <Text variant='subtitle_02' color='var(--primary-color)'>
            승률
          </Text>
          <Text variant='display' color='var(--primary-color)'>
            80
            <Text variant='title_02' color='var(--primary-color)'>
              %
            </Text>
          </Text>
        </ProfileInfoWrapper>
        <img
          src='https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/28/e4727123-666e-4603-a2fa-b2478b3130bd.jpg'
          alt='#'
        />
        <ProfileInfoWrapper>
          <Text variant='subtitle_02' color='var(--primary-color)'>
            승요력
          </Text>
          <Text variant='display' color='var(--primary-color)'>
            3000
            <Text variant='title_02' color='var(--primary-color)'>
              P
            </Text>
          </Text>
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
  :nth-child(2) {
    height: 46px;
    display: flex;
    align-items: center;
    > span {
      padding-left: 2px;
    }
  }
`;

export default Profile;
