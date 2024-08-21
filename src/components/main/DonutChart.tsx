import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import styled from "styled-components";
import { Record } from "@/types/Record";
import { useAuthStore } from "@/store/authStore";

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

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  record: Record;
}
const DonutChart = ({ record }: DonutChartProps) => {
  const teamId = useAuthStore((state) => state.teamId);

  const data = {
    datasets: [
      {
        data: [10, 7, 8, 9],
        backgroundColor: color[teamId - 1],
        hoverBackgroundColor: color[teamId - 1],
      },
    ],
  };
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
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
    <ChartWrapper>
      <BarWrapper>
        <Doughnut data={data} options={options} />
      </BarWrapper>
      <LegendWrapper>
        {color.map((element, key) => {
          return <div key={key}>{element}</div>;
        })}
      </LegendWrapper>
    </ChartWrapper>
  );
};

const ChartWrapper = styled.div`
  padding-top: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const BarWrapper = styled.div`
  width: 80%;
`;

const LegendWrapper = styled.div`
  width: 100%;
`;

export default DonutChart;
