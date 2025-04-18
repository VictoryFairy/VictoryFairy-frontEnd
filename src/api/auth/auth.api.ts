import axios from "axios";
import axiosInstance from "../axios";
import { MypageUserInfo } from "../../types/UserInfo";
import authAxiosInstance from "../authAxios";

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
    const response = await axiosInstance.post("/auth/verify-email-code", data, {
      withCredentials: true,
    });
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
    console.error(error);
    throw error;
  }
};

interface NicknameCheckRequest {
  nickname: string;
}

export interface NicknameCheckResponse {
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
    const response = await axiosInstance.post("/auth/login", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            throw new Error("아이디 또는 비밀번호가 틀렸습니다");
          default:
            throw new Error("로그인 중 서버 오류가 발생했습니다.");
        }
      }
    }
    throw new Error("서버에 문제가 발생했습니다. 나중에 다시 시도해 주세요.");
  }
};

interface ChangePasswordRequest {
  email: string;
  password: string;
}

export const changePassword = async (data: ChangePasswordRequest) => {
  try {
    await axiosInstance.patch("/users/password", data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            throw new Error("해당 이메일로 가입된 계정이 없습니다.");
          case 403:
            throw new Error("소셜 로그인 계정은 비밀번호 변경이 불가능합니다.");
          case 500:
            throw new Error(
              "서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.",
            );
          default:
            throw new Error("알 수 없는 오류가 발생했습니다.");
        }
      }
    }
  }
};

export const checkRefreshToken = async () => {
  try {
    await axiosInstance.post("/auth/token/check");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getMemberInfo = async (): Promise<MypageUserInfo> => {
  try {
    const response = await authAxiosInstance.get<MypageUserInfo>("/users/me");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            throw new Error("로그인 되어 있지 않습니다.");
          case 500:
            throw new Error(
              "서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.",
            );
          default:
            throw new Error("알 수 없는 오류가 발생했습니다.");
        }
      }
    }
    throw new Error("요청 중 문제가 발생했습니다. 다시 시도해 주세요.");
  }
};

type AuthProvider = "kakao" | "apple" | "google";

const url = import.meta.env.VITE_API_URL;
export const getLoginUrl = (provider: AuthProvider): string => {
  return `${url}/auth/login/${provider}`;
};

export const patchProfile = async (data: { field: string; value: number }) => {
  try {
    await authAxiosInstance.patch("/users/profile", data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

interface EmailDuplicateResponse {
  isExist: boolean;
  initialSignUpType: "social" | "email";
}

export const checkEmailDuplicate = async (email: string) => {
  try {
    const response = await axiosInstance.post<EmailDuplicateResponse>(
      "/users/existed-email",
      {
        email,
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            throw new Error("유효하지 않은 이메일 형식입니다.");
          case 409:
            throw new Error("이미 사용중인 이메일입니다.");
          case 500:
            throw new Error(
              "서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.",
            );
          default:
            throw new Error("알 수 없는 오류가 발생했습니다.");
        }
      }
    }
    throw new Error("요청 중 문제가 발생했습니다. 다시 시도해 주세요.");
  }
};
