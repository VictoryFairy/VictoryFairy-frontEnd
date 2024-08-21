import { getVersusRecord } from "@/api/home/home.api";
import Text from "@/components/common/Text";
import CircleChart from "@/components/main/CircleChart";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

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

interface TeamStats {
  total: number;
  win: number;
}

interface TeamStatsData {
  totalWin: number;
  homeWin: number;
  oppTeam: {
    [teamId: string]: TeamStats;
  };
}

const DetailRate = () => {
  const teamId = useAuthStore((state) => state.teamId);
  const location = useLocation();
  const { datas } = location.state || {};

  const winPercentage = () => {
    if (datas && datas.total > 0) {
      return ((datas.win / datas.total) * 100).toFixed(2);
    }
    return "0.00";
  };

  const { data } = useQuery<TeamStatsData>({
    queryKey: ["getVersusRecord"],
    queryFn: getVersusRecord,
  });

  const teamIds = Object.keys(data?.oppTeam || {});

  useEffect(() => {
    console.log(data);
    console.log(teamIds);
  }, [data, teamIds]);

  return (
    <Container>
      <RateWrapper>
        <Text variant='title_02'>내 승률</Text>
        <Text variant='display'>
          {winPercentage()}
          <Text variant='headline'>%</Text>
        </Text>
        <Text>
          {datas.total}전 {datas.win}승 {datas.lose}패 {datas.tie}무
        </Text>
      </RateWrapper>
      {data && <CircleChart teamData={data} />}
      <TeamRateWrapper>
        <Text variant='title_02'>각 구단 별 승률</Text>
        <TeamWrapper>
          {teamNames.map((element, index) => {
            const teamNum = (index + 1).toString();

            const total = data?.oppTeam[teamNum]?.total || 0;
            const win = data?.oppTeam[teamNum]?.win || 0;
            if (index + 1 !== teamId) {
              return (
                <Team key={index}>
                  <span>{element}</span>
                  <span>
                    {Number.isNaN((win / total) * 100)
                      ? "0"
                      : `${((win / total) * 100).toFixed(0)}`}
                    <Text variant='headline'>%</Text>
                  </span>
                </Team>
              );
            }
            return null;
          })}
        </TeamWrapper>
      </TeamRateWrapper>
    </Container>
  );
};

const Container = styled.div`
  overflow: auto;
  height: 100%;
  max-width: 480px;
  margin: 0 -20px;
  width: calc(100% + 40px);
  display: flex;
  background-color: var(--gray-50);
  flex-direction: column;
`;

const RateWrapper = styled.div`
  background-color: white;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 10px;
  > span {
    margin-bottom: 5px;
  }
`;

const TeamRateWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  padding: 0 20px;
  padding-top: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const TeamWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  > div {
    padding: 15px 8px;
    border: 1px solid var(--gray-100);
    width: 30%;
  }
`;

const Team = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  :nth-child(1) {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -1%;
    margin-bottom: 10px;
    text-align: left;
  }
  :nth-child(2) {
    text-align: right;
    font-weight: 700;
    font-size: 32px;
    line-height: 32px;
    letter-spacing: 1px;
  }
`;

export default DetailRate;
