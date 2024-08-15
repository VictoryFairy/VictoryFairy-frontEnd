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
import Text from "../common/Text";
import Button from "../common/Button";
import RankPopup from "./RankPopup";
import Icon from "../common/Icon";
import RankTextComp from "./RankTextComp";
import MyRankComp from "./MyRankComp";

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
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
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
        <RankTextComp />
        <MyRankWrapper>
          <MyRankComp />
        </MyRankWrapper>
        <RankTextComp />
        <ConfirmRank>
          <button type='button' onClick={handleOpen}>
            <Text variant='title_01' color='var(--gray-400)'>
              전체 랭킹 확인 하기
            </Text>
          </button>

          <Icon icon='IcArrowRight' style={{ fill: "var(--gray-400)" }} />
        </ConfirmRank>
      </RankTextWrapper>
      <Overlay isVisible={isOpen} onClick={handleClose} />

      <RankPopup isOpen={isOpen} handleClose={handleClose} />
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
`;

const Overlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  z-index: 1000;
`;
export default RankingTab;
