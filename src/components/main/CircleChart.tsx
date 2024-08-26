import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Legend, ChartOptions } from "chart.js";
import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";
import styled from "styled-components";
import { useAuthStore } from "@/store/authStore";
import Text from "../common/Text";

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

const color = [
  ["#041E42", "#D00F31", "#898C9B", "#BABCC3"], // 1 롯데
  ["#131230", "#ED1C24", "#898C9B", "#BABCC3"], // 2 두산
  ["#EC0029", "#05141F", "#898C9B", "#BABCC3"], // 3 기아
  ["#0059A6", "#000000", "#898C9B", "#BABCC3"], // 4 삼성
  ["#BE262C", "#F1C344", "#898C9B", "#BABCC3"], // 5 SSG
  ["#1D467D", "#BEA079", "#898C9B", "#BABCC3"], // 6 NC
  ["#C40037", "#000000", "#898C9B", "#BABCC3"], // 7 LG
  ["#D1187D", "#620015", "#898C9B", "#BABCC3"], // 8 키움
  ["#000000", "#EF1925", "#898C9B", "#BABCC3"], // 9 KT
  ["#FF6600", "#25282A", "#898C9B", "#BABCC3"], // 10 한화
];
ChartJS.register(ArcElement, Legend, ChartDataLabels);
const lab = ["홈", "원정"];
const CircleChart = ({ teamData }: { teamData: TeamStatsData }) => {
  const teamId = useAuthStore((state) => state.teamId);

  const data = {
    labels: ["   :홈", "   :원정"],
    datasets: [
      {
        data: [
          ((teamData.homeWin / teamData.totalWin) * 100).toFixed(0),
          (
            ((teamData.totalWin - teamData.homeWin) / teamData.totalWin) *
            100
          ).toFixed(0),
        ],
        backgroundColor: color[teamId - 1],
        hoverBackgroundColor: color[teamId - 1],
        borderWidth: 0,
      },
    ],
  };
  const isDataEmpty =
    teamData.homeWin === 0 && teamData.totalWin - teamData.homeWin === 0;

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            size: 12,
            weight: "bold",
          },
        },
        onClick: () => null,
      },
      datalabels: {
        display: true,
        color: "#ffffff",
        formatter: (value: number, context: Context) => {
          const labels = lab as (string | string[])[];
          const label = labels[context.dataIndex];
          return `${label}\n${value}%`;
        },
        font: {
          size: 15,
          weight: "bold",
        },
        padding: 10,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <ChartContainer>
      <Text variant='title_02'>홈/원정 승률</Text>
      <PieWrapper>
        {isDataEmpty ? (
          <NoDataText>승이 없습니다.</NoDataText>
        ) : (
          <Pie data={data} options={options} />
        )}
      </PieWrapper>
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: white;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  > span {
    margin-top: 15px;
  }
`;

const PieWrapper = styled.div`
  width: 75%;
  margin: 20px auto;
`;
const NoDataText = styled.div`
  text-align: center;
  font-size: 16px;
  color: #999;
  margin-top: 50px;
`;

export default CircleChart;
