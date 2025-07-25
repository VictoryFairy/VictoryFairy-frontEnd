import { useEffect, useMemo, useState } from "react";
import { DetailHelmet } from "./helmets/DetailHelmet";
import styled from "styled-components";
import {
  ApiResponse,
  getNearbyRank,
  getTopRank,
  MyInfo,
} from "@/api/rank/rank.api";
import { useQuery } from "@tanstack/react-query";
import { Rank } from "@/types/Rank";
import { teams } from "@/utils/getTeamInfo";
import Text from "@/components/common/Text";
import RankPopup from "@/components/ranking/RankPopup";
import Icon from "@/components/common/Icon";
import RankTextComp from "@/components/ranking/RankTextComp";
import MyRankComp from "@/components/ranking/MyRankComp";
import RankBar from "@/components/ranking/RankBar";
import RankingTabMenu from "@/components/ranking/RankingTabMenu";

const Ranking = () => {
  const [teamId, setTeamId] = useState<number>(0);
  const [teamTab, setTeamTab] = useState<string>("전체");
  const [top, setTop] = useState<Rank[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [withUser, setWithUser] = useState<Rank[] | null>(null);
  const [user, setUser] = useState<MyInfo | null>(null);
  const userMe = useMemo(() => {
    return withUser?.find((my) => my.userId === user?.userId);
  }, [withUser, user]);

  const firstRank = top?.find((element) => element.rank === 1);
  const secondRank = top?.find((element) => element.rank === 2);
  const thirdRank = top?.find((element) => element.rank === 3);
  const today = new Date();

  const todayDay = `${today.getFullYear()}.${(today.getMonth() + 1).toString().padStart(2, "0")}.${today.getDate().toString().padStart(2, "0")}`;

  function textChange(text: string) {
    if (text?.length > 4) {
      return `${text.slice(0, 4)}..`;
    }
    return text;
  }
  const { data: topRank } = useQuery<Omit<ApiResponse, "user" | "withUser">>({
    queryKey: ["getTopRank", { teamId }],
    queryFn: () => getTopRank(teamId),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
  });

  const { data: nearBy } = useQuery<Omit<ApiResponse, "top">>({
    queryKey: ["getNearbyRank", { teamId }],
    queryFn: () => getNearbyRank(teamId),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (topRank) {
      setTop(topRank.top);
    }
  }, [topRank]);

  useEffect(() => {
    if (nearBy) {
      setUser(nearBy.user);
      setWithUser(nearBy.nearBy);
    }
  }, [nearBy]);

  useEffect(() => {
    if (userMe) {
      localStorage.setItem("userMe", JSON.stringify(userMe));
    }
  }, [userMe]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <Container>
      <DetailHelmet
        title='랭킹'
        eventDetail='승리요정 랭킹'
        pageTitle='랭킹'
        url='sngyo.com/ranking'
      />

      <RankingTabMenu
        setTeamId={setTeamId}
        teamTab={teamTab}
        setTeamTab={setTeamTab}
      />
      <RankTopWrapper>
        <TextWrapper>
          <div>
            <Text variant='title_02'>오늘의 랭킹</Text>
            <Text variant='caption'>{todayDay} 기준</Text>
          </div>
          <Text variant='caption'>
            전체 경기에 대한 랭킹 정보를 제공합니다.
          </Text>
        </TextWrapper>
        <RankProfileWrapper>
          <RankWithBar>
            <RankWrapper>
              <img
                src={
                  secondRank?.image ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
              />
              <Text variant='title_02'>
                {textChange(secondRank?.nickname || "-")}
              </Text>
              <div>2</div>
            </RankWrapper>
            <RankBar data={top} tab={teamId} rank={2} />
          </RankWithBar>
          <RankWithBar>
            <FirstRankWrapper $teamId={teamId}>
              <img
                src={
                  firstRank?.image ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
              />
              <Text variant='title_02'>
                {textChange(firstRank?.nickname || "-")}
              </Text>
              <div>1</div>
            </FirstRankWrapper>
            <RankBar data={top} tab={teamId} rank={1} />
          </RankWithBar>
          <RankWithBar>
            <RankWrapper>
              <img
                src={
                  thirdRank?.image ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
              />
              <Text variant='title_02'>
                {textChange(thirdRank?.nickname || "-")}
              </Text>
              <div>3</div>
            </RankWrapper>
            <RankBar data={top} tab={teamId} rank={3} />
          </RankWithBar>
        </RankProfileWrapper>
      </RankTopWrapper>

      <RankTextWrapper>
        {withUser?.map((element) => {
          if (userMe?.rank && element.rank < userMe.rank)
            return (
              <RankTextComp
                key={element.userId}
                rank={element.rank}
                score={element.score}
                image={element.image}
                nickname={element.nickname}
                userId={element.userId}
              />
            );
          return null;
        })}

        {withUser?.map((element) => {
          if (user && userMe && element.userId === userMe.userId)
            return (
              <MyRankWrapper key={element.userId}>
                <MyRankComp
                  totalGames={user.totalGames}
                  win={user.win}
                  withUser={userMe || null}
                />
              </MyRankWrapper>
            );
          return null;
        })}

        {withUser?.map((element) => {
          if (userMe?.rank && element.rank > userMe.rank)
            return (
              <RankTextComp
                key={element.userId}
                rank={element.rank}
                score={element.score}
                image={element.image}
                nickname={element.nickname}
                userId={element.userId}
              />
            );
          return null;
        })}

        <ConfirmRank>
          <button type='button' onClick={handleOpen}>
            <Text variant='title_01' color='var(--gray-400)'>
              전체 랭킹 확인 하기
            </Text>
          </button>

          <Icon icon='IcArrowRight' style={{ fill: "var(--gray-400)" }} />
        </ConfirmRank>
      </RankTextWrapper>
      <Overlay $isVisible={isOpen} onClick={handleClose} />

      <RankPopup
        isOpen={isOpen}
        teamId={teamId}
        withUser={userMe}
        totalGames={user?.totalGames}
        win={user?.win}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 60px;
  > div::-webkit-scrollbar {
    display: none;
  }
`;

const RankTopWrapper = styled.div`
  height: 400px;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  gap: 20px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  > :nth-child(2) {
    color: #767676;
    margin: 5px 0;
  }
  > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    > :nth-child(2) {
      color: var(--primary-color);
      margin-left: 15px;
    }
  }
`;
const RankProfileWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  > :nth-child(2) {
    margin: 0 20px;
  }
`;

const RankWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  > img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
  }
  > div {
    position: absolute;
    width: 32px;
    height: 32px;
    border-radius: 100%;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    background-color: var(--gray-400);
  }
  > span {
    margin-top: 7px;
  }
`;
const RankWithBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FirstRankWrapper = styled(RankWrapper)<{ $teamId: number }>`
  > div {
    background-color: ${({ $teamId }) =>
      teams[$teamId]?.color || "var(--gray-400)"};
  }
  > img {
    width: 100px;
    height: 100px;
  }
`;

export const RankTextWrapper = styled.div`
  width: 100%;
  height: 370px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const MyRankWrapper = styled.div`
  width: 100%;
  border-radius: 8px;
  padding: 10px 20px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  :nth-child(3) {
    margin-bottom: 10px;
  }
`;

const ConfirmRank = styled.span`
  color: var(--gray-400);
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  > svg {
    width: 16px;
    height: 16px;
  }
  > button {
    cursor: pointer;
  }
`;

const Overlay = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
  z-index: 1000;
`;
export default Ranking;
