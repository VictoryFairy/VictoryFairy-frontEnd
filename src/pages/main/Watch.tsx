import styled from "styled-components";
import TodayMatchList from "../../components/todayMatch/TodayMatchList";

const Watch = () => {
  return (
    <WatchContainer>
      <TodayMatchList />
    </WatchContainer>
  );
};
const WatchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0px;
  gap: 12px;
`;

export default Watch;
