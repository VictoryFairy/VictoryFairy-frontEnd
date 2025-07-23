import styled from "styled-components";
import { TodayMatches } from "@/@entities/todayMatch";
import WatchList from "@/pages/main/watchList/WatchList";

const Watch = () => {
  return (
    <WatchContainer>
      <TodayMatches />
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
