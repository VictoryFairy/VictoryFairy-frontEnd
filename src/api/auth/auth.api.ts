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
