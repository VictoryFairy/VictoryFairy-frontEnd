import axios from "axios";
import axiosInstance from "../axios";

interface EmailCodeRequest {
  email: string;
}

export const requestEmailVerificationCode = async (data: EmailCodeRequest) => {
  try {
    const response = await axiosInstance.post("/auth/email-code", data);
    return response.status;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

interface VerifyEmailCodeRequest {
  email: string;
  code: string;
}

export const verifyEmailCode = async (data: VerifyEmailCodeRequest) => {
  try {
    const response = await axiosInstance.post("/auth/verify-email-code", data);
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            throw new Error("인증 코드가 틀렸습니다. 다시 시도해 주세요.");
          case 500:
            throw new Error(
              "서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.",
            );
          default:
            throw new Error(`서버 오류 발생`);
        }
      }
    }
  }
};
