import { MyGame } from "@/types/Game";
import authAxiosInstance from "../authAxios";

export const postUploadImg = async (formData: any) => {
  try {
    const respone = await authAxiosInstance.post(
      "/s3-store/registered-game",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return respone.data;
  } catch (err) {
    console.error(err);
  }
};

export const postRegisterGame = async (data: any) => {
  try {
    const response = await authAxiosInstance.post("/registered-games", data);
    return response.data;
  } catch (err) {
    console.error(err);
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
