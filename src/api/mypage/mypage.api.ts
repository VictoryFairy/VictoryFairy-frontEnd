import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import authAxiosInstance from "../authAxios";
import axiosInstance from "../axios";

const { token } = useAuthStore.getState();

export const logout = async () => {
  try {
    await axiosInstance.delete("/auth/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export const profileChange = async (field: string, value?: string | number) => {
  try {
    await authAxiosInstance.patch(`/users/profile`, {
      field,
      value,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            throw new Error("로그인 되어 있지 않습니다.");
          case 500:
            throw new Error("업데이트에 실패했습니다.");
          default:
            throw new Error("알 수 없는 오류가 발생했습니다.");
        }
      }
    }
    throw new Error("요청 중 문제가 발생했습니다. 다시 시도해 주세요.");
  }
};

export const passwordChk = async (password: string) => {
  try {
    const response = await axiosInstance.post(
      "/users/password/check",
      {
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
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

export const withdrawal = async () => {
  try {
    await axiosInstance.delete(`/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            throw new Error("로그인 되어 있지 않습니다.");
          case 500:
            throw new Error("업데이트에 실패했습니다.");
          default:
            throw new Error("알 수 없는 오류가 발생했습니다.");
        }
      }
    }
    throw new Error("요청 중 문제가 발생했습니다. 다시 시도해 주세요.");
  }
};

export const socialDelete = async (provider: string) => {
  try {
    await axiosInstance.delete(`/auth/link/${provider}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            throw new Error("로그인 되어 있지 않습니다.");
          case 400:
            throw new Error(
              "유효하지 않은 요청 url or 계정 연동 해제 할 수 없는 경우",
            );
          default:
            throw new Error("알 수 없는 오류가 발생했습니다.");
        }
      }
    }
    throw new Error("요청 중 문제가 발생했습니다. 다시 시도해 주세요.");
  }
};

export const socialLink = async (provider: string, pid: string) => {
  try {
    await axiosInstance.post(
      `/auth/link/${provider}/handle`,
      { pid: pid },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      switch (error.response.status) {
        case 401:
          throw new Error("로그인 되어 있지 않습니다.");
        case 400:
          throw new Error("유효하지 않은 요청입니다.");
        case 409:
          throw new Error("이미 연동된 계정입니다.");
        default:
          throw new Error("알 수 없는 오류입니다.");
      }
    }
    throw new Error("요청 중 문제가 발생했습니다.");
  }
};
