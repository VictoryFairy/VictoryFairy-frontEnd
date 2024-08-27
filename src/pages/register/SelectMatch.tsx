import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisteredGame } from "@/hooks/useRegisteredGame";
import DailyMatch from "@/components/dailyMatch/DailyMatch";
import Loading from "@/components/common/Loading";
import CalendarContainer from "../../components/common/Calendar";
import { useGame } from "../../hooks/useGame";
import Button from "../../components/common/Button";
import { Game } from "../../types/Game";

const SelectMatch = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Game | null>(null);
  const [selectMonth, setSelectMonth] = useState(new Date());

  const navigate = useNavigate();

  const { data: registeredGame } = useRegisteredGame(selectMonth);
  const { data: matches, isSuccess, isLoading } = useGame(selectedDate);

  const handleClickDay = (date: Date) => {
    setSelectedDate(date);
  };

  const handleClickButton = () => {
    if (selectedMatch) {
      navigate(`/register`, { state: { match: selectedMatch } });
    }
  };

  const handleMonthChange = (date: Date) => {
    setSelectMonth(date);
  };

  const renderMatches = () => {
    if (matches?.length === 0) {
      return (
        <div>
          <p>경기가 없습니다.</p>
        </div>
      );
    }
    if (isLoading) {
      return <Loading />;
    }
    if (isSuccess && matches) {
      return (
        <DailyMatch
          matches={matches}
          selectedMatch={selectedMatch}
          setSelectedMatch={setSelectedMatch}
        />
      );
    }
  };

  return (
    <SelectMatchContainer>
      <CalendarContainer
        data={registeredGame}
        onClick={(date) => handleClickDay(date)}
        onMonthChange={handleMonthChange}
      />

      {renderMatches()}

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
  .loading {
    margin-top: 20px;
  }
`;

export default SelectMatch;
