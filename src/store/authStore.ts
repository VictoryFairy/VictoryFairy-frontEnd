import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  isLoggedIn: boolean;
  token: string;
  teamId: number | null;
  loginAction: (token: string, teamId: number | null) => void;
  logoutAction: () => void;
}

export const useAuthStore = create(
  persist<StoreState>(
    (set) => ({
      isLoggedIn: false,
      token: "",
      teamId: 0,
      loginAction: (token: string, teamId: number | null) => {
        set({ isLoggedIn: true, token, teamId });
      },
      logoutAction: () => {
        set({ isLoggedIn: false, token: "", teamId: null });
      },
    }),
    {
      name: "auth",
    },
  ),
);
