import axios from "axios";
import authAxiosInstance from "../authAxios";

export const getUserInfo = async () => {
  try {
    const response = await authAxiosInstance.get(`/users/me`);
    return response.data.record;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
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
