import { useEffect, useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import Text from "@/components/common/Text";
import { useQuery } from "@tanstack/react-query";
import { MypageUserInfo } from "@/types/UserInfo";
import { useAuthStore } from "@/store/authStore";
import { getMemberInfo } from "../../api/auth/auth.api";
import { useUserStore } from "../../store/userInfo";

interface Record {
  win: number;
  lose: number;
  tie: number;
  cancel: number;
  total: number;
  score: number;
}

interface User {
  id: number;
  email: string;
  nickname: string;
  image: string;
}

const teamNames = [
  "롯데자이언츠",
  "두산베어스",
  "KIA타이거즈",
  "삼성라이온즈",
  "SSG랜더스",
  "NC다이노스",
  "LG트윈스",
  "키움히어로즈",
  "KT위즈",
  "한화이글스",
];

const Profile = () => {
  const { data } = useQuery<MypageUserInfo>({
    queryKey: ["getMemberInfo"],
    queryFn: getMemberInfo,
    refetchOnWindowFocus: true,
  });
  // const { data, refetch: refetchMemberInfo } = useQuery<MypageUserInfo>({
  //   queryKey: ["getMemberInfo"],
  //   queryFn: getMemberInfo,
  //   refetchOnWindowFocus: true,
  // });

  const [record, setRecord] = useState<Record | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { setUserInfo: setUserStoreInfo } = useUserStore();
  const teamId = useAuthStore((state) => state.teamId);

  const updateUserStore = useCallback(() => {
    if (data) {
      setUserStoreInfo(
        data.user.nickname,
        teamNames[teamId - 1],
        data.user.image,
        data.user.email,
      );
      setRecord(data.record);
      setUser(data.user);
    }
  }, [data, teamId]);

  // useEffect(() => {
  //   refetchMemberInfo();
  // }, []);

  useEffect(() => {
    updateUserStore();
  }, [updateUserStore]);

  const winPercentage = useMemo(() => {
    if (record && record.total > 0) {
      return ((record.win / record.total) * 100).toFixed(2);
    }
    return "0.00";
  }, [record]);

  return (
    <Container>
      <Text variant='title_02' color='var(--primary-color)'>
        {data?.user.nickname}님, 안녕하세요!
      </Text>
      <ProfileWrapper>
        <ProfileInfoWrapper>
          <Text variant='subtitle_02' color='var(--primary-color)'>
            승률
          </Text>
          <div>
            <Text variant='display' color='var(--primary-color)'>
              {winPercentage}
            </Text>
            <Text variant='title_02' color='var(--primary-color)'>
              %
            </Text>
          </div>
        </ProfileInfoWrapper>
        <img src={user?.image || "/default-image.png"} alt='Profile' />
        <ProfileInfoWrapper>
          <Text variant='subtitle_02' color='var(--primary-color)'>
            승요력
          </Text>
          <div>
            <Text variant='display' color='var(--primary-color)'>
              {record?.score || "N/A"}
            </Text>
            <Text variant='title_02' color='var(--primary-color)'>
              P
            </Text>
          </div>
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
  justify-content: center;
  align-items: center;
  > img {
    height: 100px;
    width: 100px;
    border-radius: 100%;
    margin: 0 12%;
  }
`;

const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  :nth-child(2) {
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    :nth-child(2) {
      margin-left: 2px;
    }
  }
`;

export default Profile;
