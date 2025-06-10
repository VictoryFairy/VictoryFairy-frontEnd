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
    const sorted = sortMatchesByCheerTeamFirst(matchGroups);
    if (sorted.length === 0) return;

    // 현재 선택된 매치가 여전히 존재하는지 확인
    const isStillSelected =
      selectedMatch &&
      sorted.some((group) => group[0].id === selectedMatch[0]?.id);

    if (!isStillSelected) {
      setSelectedMatch(sorted[0]);
    }
  }, [matchGroups, setSelectedMatch]);

  return (
    <DailyMatchContainer>
      {sortMatchesByCheerTeamFirst(matchGroups) &&
        sortMatchesByCheerTeamFirst(matchGroups).map((group) => (
          <DailyMatchItem
            key={group[0].id}
            match={group[0]}
            group={group}
            $isSelected={selectedMatch?.[0]?.id === group[0].id}
            onSelect={() => setSelectedMatch(group)}
            isDoubleHeader={group.length === 2}
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
