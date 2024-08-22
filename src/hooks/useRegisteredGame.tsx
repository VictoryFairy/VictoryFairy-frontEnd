import { getRegisteredGameByMonthly } from "@/api/register/register";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { MyGame } from "@/types/Game";
import { AxiosError } from "axios";

export const useRegisteredGame = (selectMonth: Date | null) => {
  const formattedDate = selectMonth
    ? moment(selectMonth).format("YYYY-MM-DD")
    : null;

  const { data, isSuccess, isLoading, isError, error } = useQuery<
    MyGame[],
    AxiosError
  >({
    queryKey: ["registeredGame", formattedDate],
    queryFn: () =>
      selectMonth
        ? getRegisteredGameByMonthly(
            selectMonth.getFullYear(),
            selectMonth.getMonth() + 1,
          )
        : [],
    enabled: !!selectMonth,
    staleTime: 1000 * 60 * 3,
  });

  return { data, isSuccess, isLoading, isError, error };
};
