import axios from "axios";
import { Rank } from "@/types/Rank";
import authAxiosInstance from "../authAxios";

export interface MyInfo {
  userId?: number;
  totalGame: number;
  win: number;
}

export interface ApiResponse {
  top: Rank[];
  withUser: Rank[];
  user: MyInfo;
}

export const getRankList = async (teamId: number) => {
  try {
    const response = await authAxiosInstance.get<Rank[]>(
      `/rankings/list?teamId=${teamId}`,
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        switch (err.response.status) {
          case 401:
            throw new Error("로그인 되어 있지 않습니다.");
          default:
            throw new Error("알 수 없는 오류가 발생했습니다.");
        }
      }
    }
    throw new Error("요청 중 문제가 발생했습니다. 다시 시도해 주세요.");
  }
};

export const getTopRank = async (teamId: number) => {
  try {
    const response = await authAxiosInstance.get<ApiResponse>(
      `/rankings?teamId=${teamId}`,
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        switch (err.response.status) {
          case 401:
            throw new Error("로그인 되어 있지 않습니다.");
          default:
            throw new Error("알 수 없는 오류가 발생했습니다.");
        }
      }
    }
    throw new Error("요청 중 문제가 발생했습니다. 다시 시도해 주세요.");
  }
};
