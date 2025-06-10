import styled from "styled-components";
import Text from "@/components/common/Text";
import Icon from "@/components/common/Icon";

interface TeamScoreProps {
  team: { id: number; name: string };
  score: number;
  isWinning: boolean;
  isCanceled: boolean;
  isDoubleHeader: boolean;
}

const TeamScore = ({
  team,
  score,
  isWinning,
  isCanceled,
  isDoubleHeader,
}: TeamScoreProps) => {
  return (
    <TeamScoreContainer $isWinning={isWinning} $isDoubleHeader={isDoubleHeader}>
      <Text variant='subtitle_02'>{team.name}</Text>
      {isDoubleHeader ? null : <Text variant='subtitle_02'>{score}</Text>}
      {isDoubleHeader ? null : isCanceled ? (
        <CanceledBarText variant='subtitle_02'>-</CanceledBarText>
      ) : isWinning ? (
        <WinningIcon icon='IcPolygon' width={10} height={10} />
      ) : null}
    </TeamScoreContainer>
  );
};

const TeamScoreContainer = styled.div<{
  $isWinning: boolean;
  $isDoubleHeader: boolean;
}>`
  display: flex;
  justify-content: space-between;
  min-width: 126px;
  position: relative;
  color: ${({ $isWinning, $isDoubleHeader, theme }) =>
    $isDoubleHeader
      ? theme.colors.primary
      : $isWinning
        ? theme.colors.primary
        : "var(--gray-200)"};
`;

const WinningIcon = styled(Icon)`
  position: absolute;
  top: 20%;
  right: -15px;
`;

const CanceledBarText = styled(Text)`
  color: var(--primary-color);
`;

export default TeamScore;
