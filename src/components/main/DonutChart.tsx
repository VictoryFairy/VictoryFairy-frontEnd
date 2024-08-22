import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, ChartOptions } from "chart.js";
import styled from "styled-components";
import { Record } from "@/types/Record";
import { useAuthStore } from "@/store/authStore";
import Text from "../common/Text";

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

ChartJS.register(ArcElement);

interface DonutChartProps {
  record: Record;
}
const DonutChart = ({ record }: DonutChartProps) => {
  const teamId = useAuthStore((state) => state.teamId);

  const data = {
    datasets: [
      {
        data: [record.win, record.lose, record.tie, record.cancel],
        backgroundColor: color[teamId - 1],
        hoverBackgroundColor: color[teamId - 1],
        borderWidth: 0,
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
      datalabels: {
        display: false,
      },
    },
  };
  return (
    <ChartWrapper>
      <BarWrapper>
        <Doughnut data={data} options={options} />
        <CenterText>
          <Text variant='subtitle_01' color='var(--gray-400)'>
            전체 경기 수
          </Text>
          <Text variant='headline'>{record.total}</Text>
        </CenterText>
      </BarWrapper>
      <LegendWrapper>
        <LabelWrapper teamColor={color[teamId - 1][0]}>
          <div />
          <Text variant='subtitle_01'>:승</Text>
        </LabelWrapper>
        <LabelWrapper teamColor={color[teamId - 1][1]}>
          <div />
          <Text variant='subtitle_01'>:패</Text>
        </LabelWrapper>
        <LabelWrapper teamColor={color[teamId - 1][2]}>
          <div />
          <Text variant='subtitle_01'>:동점</Text>
        </LabelWrapper>
        <LabelWrapper teamColor={color[teamId - 1][3]}>
          <div />
          <Text variant='subtitle_01'>:경기 취소</Text>
        </LabelWrapper>
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
  position: relative;
  width: 80%;
`;

const LegendWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 20px 0;
  align-items: center;
`;

const LabelWrapper = styled.div<{ teamColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    border-radius: 100%;
    width: 12px;
    height: 12px;
    background-color: ${({ teamColor }) => teamColor};
    margin-right: 5px;
  }
`;

const CenterText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: bold;
  color: #000;
`;
export default DonutChart;
