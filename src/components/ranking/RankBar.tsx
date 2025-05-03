// RankBar.tsx (업데이트: 정규화 개선, 점수 차이 확대, 동점일 경우 모두 최대 높이)

import { useState, useEffect } from "react";
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
import styled, { keyframes } from "styled-components";
import { useAuthStore } from "@/store/authStore";
import Text from "../common/Text";

const teamColor = [
  ["#456089", "#041E42", "#BBC4D5"], // 1 롯데
  ["#4D5278", "#131230", "#BCBFCF"], // 2 두산
  ["#F63B45", "#EC0029", "#FFC9CF"], // 3 기아
  ["#1CB9FF", "#0059A6", "#B3E6FF"], // 4 삼성
  ["#E75152", "#BE262C", "#FBCCD2"], // 5 SSG
  ["#59A0D3", "#1D467D", "#BDDCEF"], // 6 NC
  ["#E31D46", "#C40037", "#FBCBD6"], // 7 LG
  ["#F8449F", "#D1187D", "#F9BFDF"], // 8 키움
  ["#9D9D9D", "#000000", "#E9E9E9"], // 9 KT
  ["#FFC41F", "#FF6600", "#FFEAB1"], // 10 한화
];

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface RankData {
  rank: number;
  score: number;
  nickname: string;
  userId?: number;
}

interface RankBarProps {
  data: RankData[] | null;
  tab: number;
  rank: 1 | 2 | 3;
}

const RankBar = ({ data, tab, rank }: RankBarProps) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [datas, setDatas] = useState<number[]>([]);
  const teamId = useAuthStore((state) => state.teamId);
  const [propTab, setPropTab] = useState<number>(tab === 0 ? teamId : tab);

  useEffect(() => {
    if (tab === 0) {
      setPropTab(teamId);
    } else {
      setPropTab(tab);
    }

    const baseData = [
      { rank: 1, label: "Point 0", height: 0 },
      { rank: 2, label: "Point 0", height: 0 },
      { rank: 3, label: "Point 0", height: 0 },
    ];

    data?.forEach((item) => {
      const target = baseData.find((b) => b.rank === item.rank);
      if (target) {
        target.label = `Point ${item.score}`;
        target.height = item.score;
      }
    });

    const scores = baseData.map((b) => b.height);
    const isAllZero = scores.every((s) => s === 0);

    const normalizedData = baseData.map((b) => {
      if (isAllZero || b.height === 0) {
        return { ...b, height: 0 };
      }

      // ✅ 등수 기준으로 고정 높이 부여
      const heightByRank = { 1: 100, 2: 75, 3: 50 };
      return {
        rank: b.rank,
        label: b.label,
        height: heightByRank[b.rank as 1 | 2 | 3],
      };
    });

    const target = normalizedData.find((b) => b.rank === rank);
    if (target) {
      setLabels([target.label]);
      setDatas([target.height]);
    } else {
      setLabels(["Point 0"]);
      setDatas([0]);
    }
  }, [data, tab, teamId, rank]);

  const rankIndex = rank - 1;
  const colorSet = teamColor[propTab - 1] || ["#ccc"];

  const chartData: ChartData<"bar", number[], string> = {
    labels,
    datasets: [
      {
        data: datas,
        backgroundColor: colorSet[rankIndex] || colorSet[0],
        borderColor: colorSet[rankIndex] || colorSet[0],
        borderWidth: 1,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: false,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
        bottom: 0,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { display: false },
      },
      y: {
        ticks: { display: false },
        grid: { display: false },
        border: { display: false },
        min: 0,
        max: 100,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: { display: false },
    },
    animation: false,
  };

  return (
    <BarWrapper>
      <Bar data={chartData} options={options} />
      <LabelWrapper>
        <Text variant='caption' color='gray'>
          {labels[0]}
        </Text>
      </LabelWrapper>
    </BarWrapper>
  );
};

const BarWrapper = styled.div`
  width: 100px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5px;

  > canvas {
    width: 100% !important;
    animation: ${fadeIn} 0.8s ease-out;
  }
`;

const LabelWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default RankBar;
