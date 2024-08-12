import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  isLoggedIn: boolean;
  token: string;
  loginAction: (token: string) => void;
  logoutAction: () => void;
}

export const useAuthStore = create(
  persist<StoreState>(
    (set) => ({
      isLoggedIn: false,
      token: "",
      loginAction: (token: string) => {
        set({ isLoggedIn: true, token });
      },
      logoutAction: () => {
        set({ isLoggedIn: false, token: "" });
      },
    }),
    {
      name: "auth",
    },
  ),
);
