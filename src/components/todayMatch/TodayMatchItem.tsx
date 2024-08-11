import styled from "styled-components";
import { typography } from "../../style/typography";

interface TodayMatchItemProps {
  match: any;
}

const TodayMatchItem = ({ match }: TodayMatchItemProps) => {
  return (
    <TodayMatchItemContainer>
      <div className='team'>
        <div>{match.homeTeam.name}</div>
        <div>{match.awayTeam.name}</div>
      </div>
      <div className='score'>
        <div>{match.homeTeamScore}</div>
        <div>{match.awayTeamScore}</div>
      </div>
    </TodayMatchItemContainer>
  );
};
const TodayMatchItemContainer = styled.div`
  ${typography.subtitle_02}
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  min-width: 160px;
  background: #ffffff;
  border: 1px solid #2f3036;
  border-radius: 8px;

  .team {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 4px;
    gap: 8px;
  }
  .score {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 4px 8px;
    gap: 8px;
    width: 25px;
    height: 56px;
    background: #efefef;
    border-radius: 4px;
  }
`;

export default TodayMatchItem;
