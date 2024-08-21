import axios from "axios";
import { MyGame } from "@/types/Game";
import authAxiosInstance from "../authAxios";

export const postUploadImg = async (formData: FormData): Promise<any> => {
  try {
    const response = await authAxiosInstance.post(
      "/s3-store/registered-game",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // 상태 코드에 따른 에러 메시지 처리
      switch (err.response?.status) {
        case 400:
          throw new Error("이미지 업로드 요청이 잘못되었습니다.");
        case 413:
          throw new Error("업로드한 파일이 너무 큽니다.");
        case 500:
          throw new Error(
            "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
          );
        default:
          throw new Error(
            err.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
          );
      }
    } else {
      throw new Error(
        "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.",
      );
    }
  }
};

export const postRegisterGame = async (data: any) => {
  try {
    const response = await authAxiosInstance.post("/registered-games", data);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // 상태 코드에 따른 에러 메시지 처리
      switch (err.response?.status) {
        case 400:
          throw new Error("잘못된 요청입니다.");
        case 500:
          throw new Error(
            "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
          );
        default:
          throw new Error(
            err.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
          );
      }
    } else {
      throw new Error(
        "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.",
      );
    }
  }
};

export const getRegisteredGameByMonthly = async (
  year: number,
  month: number,
) => {
  try {
    const response = await authAxiosInstance.get<MyGame[]>(
      "/registered-games",
      {
        params: {
          year,
          month,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRegisteredGameById = async (id: number) => {
  try {
    const response = await authAxiosInstance.get<MyGame>(
      `/registered-games/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
