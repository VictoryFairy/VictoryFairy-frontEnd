import styled from "styled-components";
import { useEffect, useState } from "react";
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

  const navigate = useNavigate();

  const { data: registeredGame } = useRegisteredGame(selectedDate);
  const { data: matches } = useGame(selectedDate);

  const handleClickDay = (date: Date) => {
    setSelectedDate(date);
  };

  const handleClickButton = () => {
    if (selectedMatch) {
      navigate(`/register`, { state: { match: selectedMatch } });
    }
  };

  useEffect(() => {
    if (!matches || matches.length === 0) {
      setSelectedMatch(null);
    }
  }, [matches]);

  return (
    <SelectMatchContainer>
      <CalendarContainer
        data={registeredGame}
        onClick={(date) => handleClickDay(date)}
      />
      {matches?.length ? (
        <DailyMatch
          selectedMatch={selectedMatch}
          setSelectedMatch={setSelectedMatch}
          matches={matches}
        />
      ) : (
        <div>경기가 없습니다.</div>
      )}
      <Button
        className='button'
        onClick={handleClickButton}
        disabled={!selectedMatch}
        size='big'>
        직관 기록 하기
      </Button>
    </SelectMatchContainer>
  );
};
const SelectMatchContainer = styled.div`
  height: 100%;

  padding-top: 20px;
  position: relative;
  .button {
    position: absolute;
    bottom: 0;
  }
`;

export default SelectMatch;
