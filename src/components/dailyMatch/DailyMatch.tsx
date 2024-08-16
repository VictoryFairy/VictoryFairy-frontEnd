import styled from "styled-components";
import { Game } from "../../types/Game";
import DailyMatchItem from "./DailyMatchItem";

interface DailyMatchProps {
  matches: Game[];
  selectedMatch: Game | null;
  setSelectedMatch: React.Dispatch<React.SetStateAction<Game | null>>;
}

const DailyMatch = ({
  matches,
  selectedMatch,
  setSelectedMatch,
}: DailyMatchProps) => {
  return (
    <DailyMatchContainer>
      {matches.map((match) => (
        <DailyMatchItem
          key={match.id}
          match={match}
          isSelected={selectedMatch?.id === match.id}
          onSelect={() => setSelectedMatch(match)}
        />
      ))}
    </DailyMatchContainer>
  );
};
const DailyMatchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 36px;
`;

export default DailyMatch;
