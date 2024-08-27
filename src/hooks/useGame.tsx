import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { getDailyMatch } from "../api/game/game";

export const useGame = (date: Date | null) => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["dailyMatches", moment(date).format("YYYY-MM-DD")],
    queryFn: () =>
      date
        ? getDailyMatch(date.getFullYear(), date.getMonth() + 1, date.getDate())
        : null,
    enabled: !!date,
    staleTime: 1000 * 60 * 3,
  });

  return {
    data,
    isSuccess,
    isLoading,
  };
};
