import styled from "styled-components";
import { useEffect } from "react";
import { sortMatchesByCheerTeamFirst } from "@/utils/sortMatchesByCheerTeamFirst";
import { Game } from "../../../types/Game";
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
  useEffect(() => {
    setSelectedMatch(sortMatchesByCheerTeamFirst(matches)[0]);
  }, [matches, setSelectedMatch]);

  return (
    <DailyMatchContainer>
      {sortMatchesByCheerTeamFirst(matches) &&
        sortMatchesByCheerTeamFirst(matches).map((match) => (
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
