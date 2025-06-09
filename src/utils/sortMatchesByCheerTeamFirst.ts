import { useAuthStore } from "@/store/authStore";
import { Game } from "@/types/Game";

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
