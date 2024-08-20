import { Game } from "@/types/Game";
import authAxiosInstance from "../authAxios";

export const getDailyMatch = async (
  year: number,
  month: number,
  day: number,
) => {
  try {
    const response = await authAxiosInstance.get<Game[]>("/games/daily", {
      params: {
        year,
        month,
        day,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
