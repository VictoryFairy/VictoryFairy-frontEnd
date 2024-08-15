import { useState } from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { typography } from "@/style/typography";
import ArrowRight from "@/assets/Icons/arrow-right.svg?react";
import Text from "../common/Text";
import Button from "../common/Button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const labels = ["100포인트", "300포인트", "200포인트"];

const data: ChartData<"bar", number[], string> = {
  labels,
  datasets: [
    {
      data: [65, 80, 59],
      backgroundColor: ["#545763", "#2F3036", "#BABCC3"],
      borderColor: ["#545763", "#2F3036", "#BABCC3"],
      borderWidth: 1,
    },
  ],
};

const options: ChartOptions<"bar"> = {
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        color: "#898C9B",
        font: {
          size: 9,
          weight: 400,
        },
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        display: false,
      },
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};
const team: Team["name"][] = [
  "전체",
  "LG트윈스",
  "두산베어스",
  "SSG렌더스",
  "KT위즈",
  "한화이글스",
  "NC다이노스",
  "롯데자이언츠",
  "KIA타이거즈",
  "키움히어로즈",
  "삼성라이온즈",
];

interface Team {
  name:
    | "전체"
    | "LG트윈스"
    | "두산베어스"
    | "SSG렌더스"
    | "KT위즈"
    | "한화이글스"
    | "NC다이노스"
    | "롯데자이언츠"
    | "KIA타이거즈"
    | "키움히어로즈"
    | "삼성라이온즈";
}

const RankingTab = () => {
  const [teamTab, setTeamTab] = useState<Team["name"]>("전체");
  const handleClickTeam = (value: Team["name"]) => {
    setTeamTab(value);
  };
  return (
    <Container>
      <TeamTabWrapper>
        {team.map((element, index) => {
          return (
            <Button
              style={{
                color: teamTab === element ? "var(--white)" : "var(--gray-400)",
              }}
              styleType={teamTab === element ? "default" : "outline"}
              key={index}
              onClick={() => {
                handleClickTeam(element);
              }}>
              <Text variant='subtitle_01'>{element}</Text>
            </Button>
          );
        })}
      </TeamTabWrapper>
      <RankTopWrapper>
        <TextWrapper>
          <div>
            <Text variant='title_02'>오늘의 랭킹</Text>
            <Text variant='caption'>2024.05.24 기준</Text>
          </div>
          <Text variant='caption'>오늘 경기에 대한 랭킹 정보만 보여집니다</Text>
        </TextWrapper>
        <RankProfileWrapper>
          <RankWrapper>
            <img src='https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/28/e4727123-666e-4603-a2fa-b2478b3130bd.jpg' />
            <Text variant='title_02'>홍길동</Text>
            <div>2</div>
          </RankWrapper>
          <FirstRankWrapper>
            <img src='https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/28/e4727123-666e-4603-a2fa-b2478b3130bd.jpg' />
            <Text variant='title_02'>홍길동</Text>
            <div>1</div>
          </FirstRankWrapper>
          <RankWrapper>
            <img src='https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/28/e4727123-666e-4603-a2fa-b2478b3130bd.jpg' />
            <Text variant='title_02'>홍길동</Text>
            <div>3</div>
          </RankWrapper>
        </RankProfileWrapper>
        <BarWrapper>
          <Bar data={data} options={options} />
        </BarWrapper>
      </RankTopWrapper>
      <RankTextWrapper>
        <RankText>
          <RankTextLeft>
            <span>15</span>
            <img
              src='https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/28/e4727123-666e-4603-a2fa-b2478b3130bd.jpg'
              alt='#'
            />
            <Text variant='title_01' color='var(--gray-400)'>
              김예지
            </Text>
          </RankTextLeft>
          <Text variant='title_01' color='var(--gray-400)'>
            00P
          </Text>
        </RankText>
        <MyRankWrapper>
          <MyRank>
            <RankTextLeft>
              <span>15</span>
              <img
                src='https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/28/e4727123-666e-4603-a2fa-b2478b3130bd.jpg'
                alt='#'
              />
              <Text variant='title_01'>김예지</Text>
            </RankTextLeft>
            <RankTextRight>
              <Text variant='title_01' color='var(--primary-color)'>
                00P
              </Text>
              <Button>
                <Text variant='subtitle_01' color='var(--white)'>
                  up^
                </Text>
              </Button>
            </RankTextRight>
          </MyRank>
          <MyRanks>
            <Text variant='subtitle_01' color='var(--gray-900)'>
              나의 승률
            </Text>
            <Text variant='caption' color='var(--gray-900)'>
              00%
            </Text>
          </MyRanks>
          <MyRanks>
            <Text variant='subtitle_01' color='var(--gray-900)'>
              직관 경기 누적수
            </Text>
            <Text variant='caption' color='var(--gray-900)'>
              5회
            </Text>
          </MyRanks>
        </MyRankWrapper>
        <RankText>
          <RankTextLeft>
            <span>15</span>
            <img
              src='https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/28/e4727123-666e-4603-a2fa-b2478b3130bd.jpg'
              alt='#'
            />
            <Text variant='title_01' color='var(--gray-400)'>
              김예지
            </Text>
          </RankTextLeft>
          <Text variant='title_01' color='var(--gray-400)'>
            00P
          </Text>
        </RankText>
        <ConfirmRank>
          <Text variant='title_01' color='var(--gray-400)'>
            전체 랭킹 확인 하기
          </Text>
          <ArrowRight />
        </ConfirmRank>
      </RankTextWrapper>
    </Container>
  );
};

const Container = styled.div`
  overflow: scroll;
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
    ${typography.subtitle_01}
    margin-right: 10px;
  }
`;

const RankTopWrapper = styled.div`
  height: 384px;
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
  margin: 0 10px;
  align-items: flex-end;
  justify-content: space-between;
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
    ${typography.subtitle_02}
  }
  > span {
    margin-top: 7px;
  }
`;

const FirstRankWrapper = styled.div`
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
    background-color: var(--primary-color);
    ${typography.subtitle_02}
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

const BarWrapper = styled.div`
  width: 100%;
  display: flex;
  > canvas {
    width: 100% !important;
    height: 120px !important;
  }
`;

const RankTextWrapper = styled.div`
  width: 100%;
  height: 370px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const RankText = styled.div`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RankTextLeft = styled.div`
  img {
    width: 28px;
    height: 28px;
    border-radius: 100%;
    margin: 0 10px;
  }
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
const MyRank = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--gray-100);
  padding: 15px 0;
`;

const RankTextRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    width: 54px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
  }
`;

const MyRanks = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 16px;
  margin-top: 15px;
`;

const ConfirmRank = styled.span`
  color: var(--gray-400);
  margin: 20px 0;
  > svg {
    fill: var(--gray-400);
  }
`;
export default RankingTab;
