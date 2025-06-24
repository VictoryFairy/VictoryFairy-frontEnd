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
  setSelectedDoubleHeader: React.Dispatch<React.SetStateAction<Game[]>>;
  selectedDoubleHeader: Game[];
}

const DailyMatch = ({
  matchGroups,
  selectedMatch,
  setSelectedMatch,
  registeredGameIds,
  setSelectedDoubleHeader,
  selectedDoubleHeader,
}: DailyMatchProps) => {
  /**
   * 매치 그룹이 변경될 때 선택된 매치 초기화
   */
  useEffect(() => {
    const sorted = sortMatchesByCheerTeamFirst(matchGroups);
    if (sorted.length === 0) return;

    // 현재 선택된 매치가 여전히 존재하는지 확인
    const isStillSelected =
      selectedMatch &&
      sorted.some((group) => group[0].id === selectedMatch[0]?.id);

    /* 
    현재 선택된 매치가 여전히 존재하지 않으면 첫 번째 매치를 선택
    */
    if (!isStillSelected) {
      setSelectedMatch(sorted[0]);
      setSelectedDoubleHeader([]);
    }
  }, [matchGroups, setSelectedMatch, setSelectedDoubleHeader]);

  return (
    <DailyMatchContainer>
      {sortMatchesByCheerTeamFirst(matchGroups) &&
        sortMatchesByCheerTeamFirst(matchGroups).map((group) => (
          <DailyMatchItem
            key={group[0].id}
            match={group[0]}
            group={group}
            $isSelected={selectedMatch?.[0]?.id === group[0].id}
            onSelect={() => {
              setSelectedMatch(group);
              setSelectedDoubleHeader([]);
            }}
            setSelectedDoubleHeader={setSelectedDoubleHeader}
            selectedDoubleHeader={selectedDoubleHeader}
            isDoubleHeader={group.length === 2}
            $isRegistered={isRegistered(group, registeredGameIds)}
            registeredGameIds={registeredGameIds}
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
