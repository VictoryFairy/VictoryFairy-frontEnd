import { useAuthStore } from "@/store/authStore";
import { Game } from "@/types/Game";

/**
 * 응원팀을 기준으로 경기를 정렬하는 함수
 * @param matches - 경기 데이터
 * @returns 응원팀을 기준으로 정렬된 경기 데이터
 */
export const sortMatchesByCheerTeamFirst = (matches: Game[][]): Game[][] => {
  const { teamId } = useAuthStore.getState();

  return matches.sort((groupA, groupB) => {
    const hasCheerTeamA = groupA.some(
      (game) => game.homeTeam.id === teamId || game.awayTeam.id === teamId,
    );
    const hasCheerTeamB = groupB.some(
      (game) => game.homeTeam.id === teamId || game.awayTeam.id === teamId,
    );

    if (hasCheerTeamA && !hasCheerTeamB) {
      return -1;
    }
    if (!hasCheerTeamA && hasCheerTeamB) {
      return 1;
    }
    return 0;
  });
};
