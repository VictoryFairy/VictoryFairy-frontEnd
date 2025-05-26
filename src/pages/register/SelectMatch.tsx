import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisteredGame } from "@/hooks/useRegisteredGame";
import DailyMatch from "@/pages/register/dailyMatch/DailyMatch";
import Loading from "@/components/common/Loading";
import SelectionBar from "@/components/common/SelectionBar";
import { useGame } from "../../hooks/useGame";
import Button from "../../components/common/Button";
import { Game } from "../../types/Game";
import SelectMatchCalendar from "./SelectMatchCalendar";

const SelectMatch = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Game | null>(null);
  const [selectMonth, setSelectMonth] = useState(new Date());
  const [selectedMatchType, setSelectedMatchType] = useState<number>(0);
  const navigate = useNavigate();

  const { registeredGames } = useRegisteredGame(selectMonth);
  const { data: matches, isSuccess, isLoading } = useGame(selectedDate);

  const handleClickButton = () => {
    if (selectedMatch) {
      navigate(`/register`, { state: { match: selectedMatch } });
    }
  };

  const filterByGameType = () =>
    matches?.filter((match) => match.gameType === selectedMatchType) as Game[];

  return (
    <SelectMatchContainer>
      <SelectMatchCalendar
        registeredGames={registeredGames}
        onMonthChange={(date) => setSelectMonth(date)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {selectedDate && (
        <SelectionWrapper>
          <SelectionBar
            labels={["일반", "DH1", "DH2"]}
            onSelectClick={setSelectedMatchType}
            activeSelect={selectedMatchType}
          />
        </SelectionWrapper>
      )}

      {(() => {
        if (filterByGameType()?.length === 0) {
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
              matches={filterByGameType()}
              selectedMatch={selectedMatch}
              setSelectedMatch={setSelectedMatch}
            />
          );
        }
      })()}

      {selectedMatch && matches?.length !== 0 && (
        <Button
          className='button'
          onClick={handleClickButton}
          disabled={!selectedMatch}
          size='big'>
          직관 기록 하기
        </Button>
      )}
    </SelectMatchContainer>
  );
};

const SelectMatchContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 36px;
  position: relative;

  .loading {
    margin-top: 20px;
  }

  .calendar {
    .selected {
      background: ${({ theme }) => theme.colors.primary};
      color: var(--white);
      border-radius: 50%;
    }
  }
  .button {
  }
`;

const SelectionWrapper = styled.div`
  margin-top: 20px;
`;

export default SelectMatch;
