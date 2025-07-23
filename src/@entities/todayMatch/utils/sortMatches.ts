import { useAuthStore } from "@/store/authStore";
import { Game } from "@/@entities/todayMatch";

/**
 * 경기 목록을 응원팀 우선순위로 정렬
 *
 * @param matches - 정렬할 경기 목록
 * @param teamId - 응원팀 ID (기본값: 현재 사용자의 응원팀)
 * @returns 응원팀이 우선순위로 정렬된 경기 목록
 *
 * @example
 * const sortedMatches = sortMatchesByCheerTeam(matches, 1);
 * const sortedMatches = sortMatchesByCheerTeam(matches); // 현재 사용자 응원팀 기준
 */

export const setCheerTeamFirst = (matches: Game[]) => {
  const { teamId } = useAuthStore.getState();

  return matches.sort((a, b) => {
    const cheerTeamA = a.homeTeam.id === teamId || a.awayTeam.id === teamId;
    const cheerTeamB = b.homeTeam.id === teamId || b.awayTeam.id === teamId;

    if (cheerTeamA && !cheerTeamB) {
      return -1;
    }
    if (!cheerTeamA && cheerTeamB) {
      return 1;
    }
    return 0;
  });
};
