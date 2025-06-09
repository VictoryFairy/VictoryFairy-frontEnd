import styled from "styled-components";
import { Game } from "@/types/Game";
import { isCanceledGame } from "@/utils/isCanceledGame";
import TeamScore from "./TeamScore";

interface GameInfoProps {
  match: Game;
  isDoubleHeader: boolean;
}

const GameInfo = ({ match, isDoubleHeader }: GameInfoProps) => {
  const isWinningTeam = (teamId: number) => {
    if (match.winningTeam === null) return false;
    return match.winningTeam.id === teamId;
  };
  return (
    <GameInfoContainer>
      <TeamScore
        team={match.homeTeam}
        score={match.homeTeamScore}
        isWinning={isWinningTeam(match.homeTeam.id)}
        isCanceled={isCanceledGame(match.status) || match.status === "경기전"}
        isDoubleHeader={isDoubleHeader}
      />
      <TeamScore
        team={match.awayTeam}
        score={match.awayTeamScore}
        isWinning={isWinningTeam(match.awayTeam.id)}
        isCanceled={isCanceledGame(match.status) || match.status === "경기전"}
        isDoubleHeader={isDoubleHeader}
      />
    </GameInfoContainer>
  );
};
const GameInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px 8px;
  color: var(--gray-200);
  width: 100%;
`;

export default GameInfo;
