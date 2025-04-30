import { useEffect, useMemo, useState } from "react";
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
import Text from "../common/Text";
import Button from "../common/Button";
import RankPopup from "./RankPopup";
import Icon from "../common/Icon";
import RankTextComp from "./RankTextComp";
import MyRankComp from "./MyRankComp";
import RankBar from "./RankBar";
import { useUserStore } from "@/store/userInfo";

const RankingTab = () => {
  const [teamId, setTeamId] = useState<number>(0);
  const [teamTab, setTeamTab] = useState<string>("전체");
  const [top, setTop] = useState<Rank[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [withUser, setWithUser] = useState<Rank[] | null>(null);
  const [user, setUser] = useState<MyInfo | null>(null);
  const userMe = useMemo(() => {
    return withUser?.find((my) => my.userId === user?.userId);
  }, [withUser, user]);
  const supportTeam = useUserStore((state) => state.supportTeam);

  const firstRank = top?.find((element) => element.rank === 1);
  const secondRank = top?.find((element) => element.rank === 2);
  const thirdRank = top?.find((element) => element.rank === 3);
  const today = new Date();

  const todayDay = `${today.getFullYear()}.${(today.getMonth() + 1).toString().padStart(2, "0")}.${today.getDate().toString().padStart(2, "0")}`;

  const handleClickTeam = (value: number) => {
    const selectedTeam = teams.find((team) => team.id === value);
    if (selectedTeam) {
      setTeamTab(selectedTeam.name);
      setTeamId(selectedTeam.id);
    }
  };

  const sortedTeams = useMemo(() => {
    return [
      ...teams.filter((team) => team.name === "전체"),
      ...teams.filter((team) => team.name.replace(/\s/g, "") === supportTeam),
      ...teams
        .filter(
          (team) =>
            team.name !== "전체" &&
            team.name.replace(/\s/g, "") !== supportTeam,
        )
        .sort((a, b) => a.name.localeCompare(b.name, "ko-KR")),
    ];
  }, [teams, supportTeam]);

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
      <TeamTabWrapper>
        {sortedTeams.map((element, index) => {
          return (
            <Button
              style={{
                color:
                  teamTab === element.name ? "var(--white)" : "var(--gray-400)",
                border:
                  teamTab === element.name
                    ? "none"
                    : "1px solid var(--gray-100)",
              }}
              styletype={teamTab === element.name ? "default" : "outline"}
              key={index}
              onClick={() => {
                handleClickTeam(element.id);
              }}>
              <Text variant='subtitle_01'>{element.name}</Text>
            </Button>
          );
        })}
      </TeamTabWrapper>
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
  padding: 20px 0;
  > div::-webkit-scrollbar {
    display: none;
  }
`;

const TeamTabWrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  padding-bottom: 10px;
  > button {
    cursor: pointer;
    flex: 0 0 auto;
    width: 100px;
    height: 32px;
    border-radius: 4px;
    padding: 8px 12px;
    gap: 7px;
    border: 1px solid var(--gray-100);
    margin-right: 10px;
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

const RankItem = styled.div``;

const FirstRankWrapper = styled.div<{ $teamId: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    background-color: ${({ $teamId }) => teams[$teamId].color};
  }
  > img {
    width: 100px;
    border-radius: 100%;
    height: 100px;
  }
  > span {
    margin-top: 7px;
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
export default RankingTab;
