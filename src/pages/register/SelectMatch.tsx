import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisteredGame } from "@/hooks/useRegisteredGame";
import CalendarContainer from "../../components/common/Calendar";
import DailyMatch from "../../components/dailyMatch/DailyMatch";
import { useGame } from "../../hooks/useGame";
import Button from "../../components/common/Button";
import { Game } from "../../types/Game";

const SelectMatch = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedMatch, setSelectedMatch] = useState<Game | null>(null);
  const { data: registeredGame } = useRegisteredGame(selectedDate);
  const navigate = useNavigate();

  const { data: matches } = useGame(selectedDate);

  const handleClickDay = (date: Date) => {
    setSelectedDate(date);
  };

  const handleClickButton = () => {
    if (selectedMatch) {
      navigate(`/register`, { state: { match: selectedMatch } });
    }
  };

  if (matches?.length === 0) {
    return (
      <SelectMatchContainer>
        <CalendarContainer onClick={(date) => handleClickDay(date)} />
        <div>경기가 없습니다.</div>
      </SelectMatchContainer>
    );
  }

  return (
    <SelectMatchContainer>
      <CalendarContainer
        data={registeredGame}
        onClick={(date) => handleClickDay(date)}
      />
      {matches && (
        <DailyMatch
          selectedMatch={selectedMatch}
          setSelectedMatch={setSelectedMatch}
          matches={matches}
        />
      )}
      <Button onClick={handleClickButton} disabled={!selectedMatch} size='big'>
        직관 기록 하기
      </Button>
    </SelectMatchContainer>
  );
};
const SelectMatchContainer = styled.div`
  padding-bottom: 80px;
  padding-top: 20px;
`;

export default SelectMatch;
