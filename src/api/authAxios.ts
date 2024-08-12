import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import axiosInstance from "./axios";

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
    const retryRequest = error.config;
    const { response } = error;
    const navigate = useNavigate();

    if (response && response.status === 401) {
      try {
        const refreshResponse = await axiosInstance.post(
          `${BASE_URL}/auth/token/issue`,
        );

        const newAccessToken = refreshResponse.data.acToken;
        useAuthStore.getState().loginAction(newAccessToken);

        retryRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return authAxiosInstance(retryRequest);
      } catch (err) {
        // toast.error("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
        useAuthStore.getState().logoutAction();
        navigate("/");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default authAxiosInstance;