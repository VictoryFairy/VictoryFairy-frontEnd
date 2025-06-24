import styled from "styled-components";
import TodayMatchList from "@/components/todayMatch/TodayMatchList";
import WatchList from "@/pages/main/watchList/WatchList";

const Watch = () => {
  return (
    <WatchContainer>
      <TodayMatchList />
      <hr />
      <WatchList />
    </WatchContainer>
  );
};
const WatchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  hr {
    height: 16px;
    margin: 0px -20px;
    background-color: #efefef;
    border: none;
  }
`;

export default Watch;
