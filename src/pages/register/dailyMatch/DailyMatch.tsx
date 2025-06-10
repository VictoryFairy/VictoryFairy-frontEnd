import styled from "styled-components";
import { useEffect } from "react";
import { sortMatchesByCheerTeamFirst } from "@/utils/sortMatchesByCheerTeamFirst";
import { isRegistered } from "@/utils/isRegistered";
import { Game } from "../../../types/Game";
import DailyMatchItem from "./DailyMatchItem";

interface DailyMatchProps {
  matchGroups: Game[][];
  selectedMatch: Game[] | null;
  setSelectedMatch: React.Dispatch<React.SetStateAction<Game[] | null>>;
  registeredGameIds: string[];
}

const DailyMatch = ({
  matchGroups,
  selectedMatch,
  setSelectedMatch,
  registeredGameIds,
}: DailyMatchProps) => {
  useEffect(() => {
    setSelectedMatch(sortMatchesByCheerTeamFirst(matchGroups)[0]);
  }, []);

  return (
    <DailyMatchContainer>
      {sortMatchesByCheerTeamFirst(matchGroups) &&
        sortMatchesByCheerTeamFirst(matchGroups).map((group) => (
          <DailyMatchItem
            key={group[0].id}
            match={group[0]}
            $isSelected={selectedMatch?.[0]?.id === group[0].id}
            onSelect={() => setSelectedMatch(group)}
            $isRegistered={isRegistered(group, registeredGameIds)}
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
