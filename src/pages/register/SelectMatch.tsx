import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DailyMatch from "@/pages/register/dailyMatch/DailyMatch";
import { getDailyMatch } from "@/api/game/game";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { usePopup } from "@/hooks/usePopup";
import Button from "../../components/common/Button";
import { Game } from "../../types/Game";
import SelectMatchCalendar from "./SelectMatchCalendar";

/**
 * 경기 선택 페이지 컴포넌트
 * 달력에서 날짜를 선택하고, 해당 날짜의 경기를 선택하는 페이지
 * 일반 경기와 더블헤더 경기를 모두 지원함
 */
const SelectMatch = () => {
  // 사용자가 달력에서 선택한 날짜
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 선택된 날짜의 경기 목록 (일반경기: 1개, 더블헤더: 2개)
  const [selectedMatch, setSelectedMatch] = useState<Game[] | null>(null);

  // 더블헤더에서 사용자가 실제로 선택한 경기들
  const [selectedDoubleHeader, setSelectedDoubleHeader] = useState<Game[]>([]);

  // 현재 보고 있는 달력의 월
  const [selectMonth, setSelectMonth] = useState(new Date());

  const navigate = useNavigate();
  const { openPopup, closePopup, renderPopup } = usePopup();

  // 선택된 날짜의 경기 정보를 서버에서 가져오는 쿼리
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
    enabled: !!selectedDate, // 날짜가 선택된 경우에만 쿼리 실행
    staleTime: 1000 * 60 * 3, // 3분간 캐시 유지
  });

  /**
   * 게임 ID에서 경기 구분 번호(0,1,2)를 제외한 기본 ID를 추출
   * @param gameId - 전체 게임 ID (ex: "20250511NCOB2")
   * @returns 기본 게임 ID (ex: "20250511NCOB")
   */
  const getBaseGameId = (gameId: string) => {
    return gameId.slice(0, -1); // 마지막 문자(0,1,2) 제거
  };

  /**
   * 이미 등록된 경기가 있는 날짜에 다른 경기를 등록하려고 하는지 확인
   * @returns 중복 등록 시도 여부
   */
  const checkDuplicateRegistration = () => {
    if (!selectedMatch || !matches) return false;

    // 이미 등록된 경기가 있는지 확인
    const hasRegisteredGames = matches.registeredGameIds.length > 0;
    if (!hasRegisteredGames) return false;

    // 등록된 경기들의 기본 ID 목록
    const registeredBaseIds = matches.registeredGameIds.map((id) =>
      getBaseGameId(id),
    );

    // 더블헤더인 경우
    if (selectedMatch.length === 2) {
      // 선택한 더블헤더 경기들의 기본 ID
      const selectedBaseIds = selectedDoubleHeader.map((game) =>
        getBaseGameId(game.id),
      );

      // 선택한 더블헤더가 이미 등록된 경기와 같은 기본 경기인지 확인
      const isSameBaseGame = selectedBaseIds.every((baseId) =>
        registeredBaseIds.includes(baseId),
      );

      // 같은 기본 경기라면 등록 가능 (중복 아님)
      if (isSameBaseGame) return false;

      // 다른 기본 경기라면 중복
      return true;
    }
    // 일반 경기인 경우
    const selectedBaseId = getBaseGameId(selectedMatch[0].id);

    // 선택한 경기가 이미 등록된 경기와 같은 기본 경기인지 확인
    const isSameBaseGame = registeredBaseIds.includes(selectedBaseId);

    // 같은 기본 경기라면 등록 가능 (중복 아님)
    if (isSameBaseGame) return false;

    // 다른 기본 경기라면 중복
    return true;
  };

  /**
   * "직관 기록 하기" 버튼 클릭 시 실행되는 함수
   * 일반 경기와 더블헤더 경기에 따라 다른 데이터를 넘겨줌
   */
  const handleClickButton = () => {
    if (selectedMatch) {
      // 중복 등록 체크
      if (checkDuplicateRegistration()) {
        openPopup({
          title: "동일 경기의 더블헤더만\n등록 가능합니다.",
          message:
            "다른 경기의 더블헤더 경기가 등록되어있습니다.\n 기존 경기를 삭제하고 기록해주세요.",
          buttons: [
            {
              label: "확인",
              variant: "confirm",
              onClick: closePopup,
            },
          ],
        });
        return;
      }

      // 더블헤더 경기인지 확인 (경기가 2개면 더블헤더)
      if (selectedMatch.length === 2) {
        // 더블헤더인 경우: 첫 번째 경기부터 시작
        navigate(`/register`, {
          state: {
            match: selectedDoubleHeader[0], // 첫 번째 경기 정보
            doubleHeader: selectedDoubleHeader, // 전체 더블헤더 경기 목록
            currentGameIndex: 0, // 현재 몇 번째 경기인지 (0부터 시작)
            totalGames: selectedDoubleHeader.length, // 총 경기 수
          },
        });
      } else {
        // 일반 경기인 경우: 경기 정보만 넘겨줌
        navigate(`/register`, {
          state: { match: selectedMatch[0] },
        });
      }
    }
  };

  /**
   * 달력에서 다른 달로 이동할 때 실행되는 함수
   * @param date - 이동할 달의 날짜
   */
  const handleClickMonth = (date: Date) => {
    setSelectedDate(null); // 선택된 날짜 초기화
    setSelectMonth(date); // 보여줄 달 변경
  };

  /**
   * 날짜나 달이 변경될 때마다 경기 선택 상태를 초기화
   * 사용자가 다른 날짜를 선택하면 이전에 선택한 경기들을 모두 리셋함
   */
  useEffect(() => {
    setSelectedMatch(null); // 선택된 경기 초기화
    setSelectedDoubleHeader([]); // 선택된 더블헤더 경기 초기화
  }, [selectedDate, selectMonth]);

  // 선택한 날짜에 경기가 없는지 확인
  const isNoMatch =
    Object.values(matches?.games || {}).length === 0 && isSuccess;

  /**
   * 경기 등록 버튼을 비활성화해야 하는지 판단하는 조건들
   *
   * 비활성화 되는 경우:
   * 1. 이미 1경기가 등록되어 있고, 그 경기가 일반경기인 경우 (ID 끝자리가 "0")
   * 2. 이미 2경기가 모두 등록되어 있는 경우 (더블헤더 완료)
   * 3. 선택한 날짜에 경기가 아예 없는 경우
   */
  const isRegisterDisabled =
    (matches?.registeredGameIds?.length === 1 &&
      matches?.registeredGameIds[0].slice(-1) === "0") ||
    matches?.registeredGameIds?.length === 2 ||
    (isNoMatch && isSuccess);

  return (
    <SelectMatchContainer>
      <SelectMatchCalendar
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
          setSelectedDoubleHeader={setSelectedDoubleHeader}
          selectedDoubleHeader={selectedDoubleHeader}
          registeredGameIds={matches.registeredGameIds}
        />
      )}

      <FixedBottomButtonWrapper>
        <Button
          className='button'
          onClick={handleClickButton}
          disabled={
            !selectedMatch ||
            !isSuccess ||
            isRegisterDisabled ||
            (selectedMatch.length === 2 && selectedDoubleHeader.length === 0) // 선택한 경기가 더블헤더 경기인데 더블헤더 경기를 선택하지 않은 경우
          }
          size='big'
          style={{ width: "100%" }}>
          {isRegisterDisabled && !isNoMatch
            ? "경기 등록 완료"
            : "직관 기록 하기"}
        </Button>
      </FixedBottomButtonWrapper>
      {renderPopup()}
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
