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
import styled from "styled-components";
import { useAuthStore } from "@/store/authStore";

const teamColor = [
  ["#456089", "#041E42", "#BBC4D5"], //1 롯데
  ["#4D5278", "#131230", "#BCBFCF"], //2 두산
  ["#F63B45", "#EC0029", "#FFC9CF"], //3 기아
  ["#1CB9FF", "#0059A6", "#B3E6FF"], //4 삼성
  ["#E75152", "#BE262C", "#FBCCD2"], //5 SSG
  ["#59A0D3", "#1D467D", "#BDDCEF"], //6 NC
  ["#E31D46", "#C40037", "#FBCBD6"], //7 LG
  ["#F8449F", "#D1187D", "#F9BFDF"], //8 키움
  ["#9D9D9D", "#000000", "#E9E9E9"], //9 KT
  ["#FFC41F", "#FF6600", "#FFEAB1"], //10 한화
];

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
  image: string;
  nickname: string;
  userId?: number;
}

interface RankBarProps {
  data: RankData[] | null;
}

const RankBar = ({ data }: RankBarProps) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [datas, setDatas] = useState<number[]>([]);
  const teamId = useAuthStore((state) => state.teamId);

  useEffect(() => {
    const sortedData = [
      { point: "Point 0", score: 0 },
      { point: "Point 0", score: 0 },
      { point: "Point 0", score: 0 },
    ];

    data?.forEach((item) => {
      if (item.rank === 2) {
        sortedData[0] = { point: `Point ${item.score}`, score: item.score };
      } else if (item.rank === 1) {
        sortedData[1] = { point: `Point ${item.score}`, score: item.score };
      } else if (item.rank === 3) {
        sortedData[2] = { point: `Point ${item.score}`, score: item.score };
      }
    });

    setLabels(sortedData.map((item) => item.point));
    setDatas(sortedData.map((item) => item.score));
  }, [data]);

  const chartData: ChartData<"bar", number[], string> = {
    labels,
    datasets: [
      {
        data: datas,
        backgroundColor: teamColor[teamId - 1],
        borderColor: teamColor[teamId - 1],
        borderWidth: 1,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
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
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <BarWrapper>
      <Bar data={chartData} options={options} />
    </BarWrapper>
  );
};

const BarWrapper = styled.div`
  width: 100%;
  display: flex;
  padding-right: 10px;
  > canvas {
    width: 100% !important;
    height: 120px !important;
  }
`;

export default RankBar;
