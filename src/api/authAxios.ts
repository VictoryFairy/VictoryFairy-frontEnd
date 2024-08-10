import axios from "axios";
import { useAuthStore } from "../store/authStore";

const BASE_URL = import.meta.env.VITE_API_URL;

const authAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

authAxiosInstance.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

authAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { response } = error;

    if (response && response.status === 401) {
      try {
        // 리프레시 토큰으로 액세스 토큰을 새로 발급 받습니다.

        const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh`);

        // 새 액세스 토큰을 스토어와 로컬스토리지에 저장합니다.
        const newAccessToken = refreshResponse.data.acToken;
        useAuthStore.getState().loginAction(newAccessToken);

        // 원래의 요청을 새 액세스 토큰으로 다시 시도합니다.
        authAxiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return authAxiosInstance(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰이 만료되었거나 오류 발생 시 로그아웃 처리
        // toast.error("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
        useAuthStore.getState().logoutAction();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default authAxiosInstance;
