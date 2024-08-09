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

interface UploadProfileImageResponse {
  profileImgUrl: string;
}

export const uploadProfileImage = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post<UploadProfileImageResponse>(
      "/s3-store/profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data.profileImgUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

interface NicknameCheckRequest {
  nickname: string;
}

interface NicknameCheckResponse {
  isExist: boolean;
}

export const checkNicknameAvailability = async (data: NicknameCheckRequest) => {
  try {
    const response = await axiosInstance.post<NicknameCheckResponse>(
      "/users/existed-nickname",
      data,
    );
    return response.data.isExist;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

interface SignUpRequest {
  email: string;
  nickname: string;
  image: string;
  teamId: number;
  password: string;
}

export const signUp = async (data: SignUpRequest) => {
  try {
    const response = await axiosInstance.post("/users/signup", data);
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error);
      throw error;
    }
  }
};

interface LoginRequest {
  email: string;
  password: string;
}

export const login = async (data: LoginRequest) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            throw new Error("아이디 또는 비밀번호가 틀렸습니다");
          default:
            throw new Error("로그인 중 오류가 발생했습니다.");
        }
      }
    }
  }
};
