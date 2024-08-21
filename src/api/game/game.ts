import axios from "axios";
import { Game } from "@/types/Game";
import authAxiosInstance from "../authAxios";

export const getDailyMatch = async (
  year: number,
  month: number,
  day: number,
): Promise<Game[]> => {
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
    if (axios.isAxiosError(error)) {
      switch (error.response?.status) {
        case 400:
          throw new Error("잘못된 요청입니다.");
        case 404:
          throw new Error("해당 날짜에 경기를 찾을 수 없습니다.");
        case 500:
          throw new Error(
            "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
          );
        default:
          throw new Error(
            error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
          );
      }
    } else {
      throw new Error(
        "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.",
      );
    }
  }
};
