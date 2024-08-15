import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Game } from "@/types/Game";
import Text from "../../components/common/Text";
import { GameListItemContainer } from "../../components/common/GameListItem";

const RegisterForm = () => {
  const location = useLocation();
  const { match } = location.state as { match: Game };
  return (
    <RegisterFormContainer>
      <GameListItemContainer>
        {/* <ResultLabel status={data.status}>{data.status}</ResultLabel> */}
        <div className='game-info'>
          <div className='team-score'>
            <Text variant='subtitle_02'>{match.homeTeam.name}</Text>
            <Text variant='subtitle_02'>{match.homeTeamScore}</Text>
          </div>
          <div className='team-score'>
            <Text variant='subtitle_02'>{match.awayTeam.name}</Text>
            <Text variant='subtitle_02'>{match.awayTeamScore}</Text>
          </div>
        </div>
        <div className='vertical-line' />
        <div className='game-info-stadium'>
          <Text variant='caption'>2024.05.24</Text>
          <Text variant='caption'>{match.stadium.name} 야구장</Text>
        </div>
      </GameListItemContainer>
    </RegisterFormContainer>
  );
};
const RegisterFormContainer = styled.div``;

export default RegisterForm;
