import styled from "styled-components";
import { useEffect } from "react";
import { setCheerTeamFirst } from "@/utils/setCheerTeamFirst";
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
  const formatMatches = setCheerTeamFirst(matches);

  useEffect(() => {
    setSelectedMatch(formatMatches[0]);
  }, [matches, setSelectedMatch]);

  return (
    <DailyMatchContainer>
      {formatMatches &&
        formatMatches.map((match) => (
          <DailyMatchItem
            key={match.id}
            match={match}
            $isSelected={selectedMatch?.id === match.id}
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
