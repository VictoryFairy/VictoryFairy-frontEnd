import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useMemo } from "react";
import {
  GameDTO,
  Game,
  getTodayMatch,
  setCheerTeamFirst,
} from "@/@entities/todayMatch";

/**
 * 오늘의 경기 목록을 조회하고 응원팀 우선순위로 정렬하는 훅
 *
 * @param date - 조회할 날짜 (null인 경우 쿼리가 비활성화됨)
 * @returns 경기 목록과 상태 정보를 포함한 객체
 */
export const useTodayGames = (date: Date | null) => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["dailyMatches", moment(date).format("YYYY-MM-DD")],
    queryFn: () =>
      date
        ? getTodayMatch(date.getFullYear(), date.getMonth() + 1, date.getDate())
        : null,
    enabled: !!date,
    staleTime: 1000 * 60 * 3,
  });

  // 응원팀 우선순위로 정렬된 경기 목록
  const sortedMatches = useMemo(
    () => setCheerTeamFirst(data?.map(transformGameDTOToEntity) || []),
    [data],
  );

  return {
    gameList: sortedMatches,
    isNoMatches: !isLoading && isSuccess && sortedMatches.length === 0,
    hasMatches: !isLoading && sortedMatches.length > 0,
    isDataReady: !isLoading && isSuccess,
  };
};

/**
 * GameDTO를 Game Entity로 변환하는 함수
 *
 * @param gameDTO - API에서 받은 경기 데이터
 * @returns 변환된 Game 엔티티
 */
const transformGameDTOToEntity = (gameDTO: GameDTO): Game => {
  return {
    id: gameDTO.id,
    date: gameDTO.date,
    time: gameDTO.time,
    status: gameDTO.status,
    homeTeam: gameDTO.homeTeam,
    awayTeam: gameDTO.awayTeam,
    homeTeamScore: gameDTO.homeTeamScore,
    awayTeamScore: gameDTO.awayTeamScore,
  };
};
