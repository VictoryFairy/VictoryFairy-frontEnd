import { useAuthStore } from "@/store/authStore";
import { Game } from "@/types/Game";

export const sortMatchesByCheerTeamFirst = (matches: Game[]) => {
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
