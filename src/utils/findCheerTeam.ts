import { useAuthStore } from "@/store/authStore";
import { Game } from "@/types/Game";

export const findCheerTeam = (matches: Game[]) => {
  const { teamId } = useAuthStore.getState();

  return matches.find(
    (match) => match.homeTeam.id === teamId || match.awayTeam.id === teamId,
  );
};
