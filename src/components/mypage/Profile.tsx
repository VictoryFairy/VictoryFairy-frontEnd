import { useEffect } from "react";
import styled from "styled-components";
import Text from "@/components/common/Text";
import { useQuery } from "@tanstack/react-query";
import { MypageUserInfo } from "@/types/UserInfo";
import { useAuthStore } from "@/store/authStore";
import { getMemberInfo } from "../../api/auth/auth.api";
import { useUserStore } from "../../store/userInfo";

const teamNames = [
  "LG트윈스",
  "두산베어스",
  "한화이글스",
  "삼성라이온즈",
  "KT위즈",
  "SSG랜더스",
  "NC다이노스",
  "KIA타이거즈",
  "롯데자이언츠",
  "키움히어로즈",
];

const Profile = () => {
  // const [userInfo, setUserInfo] = useState<Omit<
  //   MypageUserInfo,
  //   "registeredGames"
  // > | null>(null);

  const { data } = useQuery<MypageUserInfo>({
    queryKey: ["getMemberInfo"],
    queryFn: getMemberInfo,
  });

  const { setUserInfo: setUserStoreInfo } = useUserStore();
  const nickname = useUserStore((state) => state.nickname);
  const teamId = useAuthStore((state) => state.teamId);

  useEffect(() => {
    if (data) {
      // const userInfos = {
      //   email: data.email,
      //   nickname: data.nickname,
      //   score: data.score,
      //   supportTeam: data.supportTeam,
      //   supportTeamId: data.supportTeamId,
      // };
      // setUserInfo(userInfos);
      console.log(data);
      setUserStoreInfo(data.user.nickname, teamNames[teamId]);
    } else {
      // setUserInfo(null);
    }
  }, [data]);

  return (
    <Container>
      <Text variant='title_02' color='var(--primary-color)'>
        {nickname}님, 안녕하세요!
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
