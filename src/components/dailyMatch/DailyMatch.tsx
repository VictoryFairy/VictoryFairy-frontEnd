import styled from "styled-components";
import { useEffect } from "react";
import { findCheerTeam } from "@/utils/findCheerTeam";
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
  const formatMatches = findCheerTeam(matches);

  useEffect(() => {
    setSelectedMatch(formatMatches!);
  }, [formatMatches, setSelectedMatch]);

  return (
    <DailyMatchContainer>
      <DailyMatchItem
        key={formatMatches?.id}
        match={formatMatches!}
        $isSelected={selectedMatch?.id === formatMatches?.id}
        onSelect={() => setSelectedMatch(formatMatches!)}
      />
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
