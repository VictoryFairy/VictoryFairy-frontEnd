import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisteredGame } from "@/hooks/useRegisteredGame";
import DailyMatch from "@/pages/register/dailyMatch/DailyMatch";
import { getDailyMatch } from "@/api/game/game";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import Button from "../../components/common/Button";
import { Game } from "../../types/Game";
import SelectMatchCalendar from "./SelectMatchCalendar";

const SelectMatch = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Game[] | null>(null);
  const [selectMonth, setSelectMonth] = useState(new Date());

  const navigate = useNavigate();

  const { registeredGames } = useRegisteredGame(selectMonth);

  const { data: matches, isSuccess } = useQuery({
    queryKey: ["dailyMatches", moment(selectedDate).format("YYYY-MM-DD")],
    queryFn: () =>
      selectedDate
        ? getDailyMatch(
            selectedDate.getFullYear(),
            selectedDate.getMonth() + 1,
            selectedDate.getDate(),
          )
        : null,
    enabled: !!selectedDate,
    staleTime: 1000 * 60 * 3,
  });

  const handleClickButton = () => {
    if (selectedMatch) {
      navigate(`/register`, { state: { match: selectedMatch } });
    }
  };

  const handleClickMonth = (date: Date) => {
    setSelectedDate(null);
    setSelectMonth(date);
    setSelectedMatch(null);
  };

  const isNoMatch =
    Object.values(matches?.games || {}).length === 0 && isSuccess;

  /**
   * 경기 등록 버튼 비활성화 조건
   * 1. 선택된 경기가 없을 때
   * 2. 데이터가 준비되지 않았을 때
   * 3. 일반경기 일 경우 등록 여부 확인
   * 4. 더블헤더 경기 일 경우 등록 여부 확인
   */
  const isRegisterDisabled =
    (matches?.registeredGameIds?.length === 1 &&
      matches?.registeredGameIds[0].slice(-1) === "0") ||
    matches?.registeredGameIds?.length === 2 ||
    (isNoMatch && isSuccess);

  return (
    <SelectMatchContainer>
      <SelectMatchCalendar
        registeredGames={registeredGames}
        onMonthChange={handleClickMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {isNoMatch && (
        <div>
          <p>경기가 없습니다.</p>
        </div>
      )}
      {isSuccess && matches && !isNoMatch && (
        <DailyMatch
          matchGroups={Object.values(matches.games)}
          selectedMatch={selectedMatch}
          setSelectedMatch={setSelectedMatch}
          registeredGameIds={matches.registeredGameIds}
        />
      )}

      <FixedBottomButtonWrapper>
        <Button
          className='button'
          onClick={handleClickButton}
          disabled={!selectedMatch || !isSuccess || isRegisterDisabled}
          size='big'
          style={{ width: "100%" }}>
          {isRegisterDisabled && !isNoMatch
            ? "경기 등록 완료"
            : "직관 기록 하기"}
        </Button>
      </FixedBottomButtonWrapper>
    </SelectMatchContainer>
  );
};

const SelectMatchContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 92px;
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
`;

const FixedBottomButtonWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  max-width: 500px;
  margin: 0 auto;

  padding: 16px 16px 32px 16px;
  box-sizing: border-box;
  z-index: 100;
  @media (min-width: 500px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;

export default SelectMatch;
