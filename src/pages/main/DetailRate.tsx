import Text from "@/components/common/Text";
import CircleChart from "@/components/main/CircleChart";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const DetailRate = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const winPercentage = () => {
    if (data && data.total > 0) {
      return ((data.win / data.total) * 100).toFixed(2);
    }
    return "0.00";
  };
  return (
    <Container>
      <RateWrapper>
        <Text variant='title_02'>내 승률</Text>
        <Text variant='display'>
          {winPercentage()}
          <Text variant='headline'>%</Text>
        </Text>
        <Text>
          {data.total}전 {data.win}승 {data.lose}패 {data.tie}무
        </Text>
      </RateWrapper>
      <CircleChart />
      <TeamRateWrapper>
        <Text variant='title_02'>각 구단 별 승률</Text>
        <TeamWrapper>
          <Team>
            <span>KIA 타이거즈</span>
            <span>
              50<Text variant='headline'>%</Text>
            </span>
          </Team>
          <Team>
            <span>KIA 타이거즈</span>
            <span>
              50<Text variant='headline'>%</Text>
            </span>
          </Team>
          <Team>
            <span>KIA 타이거즈</span>
            <span>
              50<Text variant='headline'>%</Text>
            </span>
          </Team>
        </TeamWrapper>
      </TeamRateWrapper>
    </Container>
  );
};

const Container = styled.div`
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
