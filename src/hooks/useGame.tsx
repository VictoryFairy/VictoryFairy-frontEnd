import { useQuery } from "@tanstack/react-query";
import { getDailyMatch } from "../api/game/game";

export const useGame = (date: Date | null) => {
  const { data, isLoading } = useQuery({
    queryKey: ["dailyMatches", date],
    queryFn: () =>
      date
        ? getDailyMatch(date.getFullYear(), date.getMonth() + 1, date.getDate())
        : null,
    enabled: !!date,
  });

  return {
    data,
    isLoading,
  };
};
