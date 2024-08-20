import styled from "styled-components";
import TodayMatchList from "@/components/todayMatch/TodayMatchList";
import WatchList from "@/components/watchList/WatchList";

const Watch = () => {
  return (
    <WatchContainer>
      <TodayMatchList />
      <WatchList />
    </WatchContainer>
  );
};
const WatchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0px;
  gap: 12px;
  width: 100%;
`;

export default Watch;
