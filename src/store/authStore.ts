import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  isLoggedIn: boolean;
  token: string;
  teamId: number;
  loginAction: (token: string, teamId?: number) => void;
  logoutAction: () => void;
  updateTeamId: (teamId: number) => void;
}

export const useAuthStore = create(
  persist<StoreState>(
    (set) => ({
      isLoggedIn: false,
      token: "",
      teamId: 0,
      loginAction: (token: string, teamId?: number) => {
        set({ isLoggedIn: true, token, teamId });
      },
      logoutAction: () => {
        set({ isLoggedIn: false, token: "", teamId: 0 });
      },
      updateTeamId: (teamId: number) => {
        set({ teamId });
      },
    }),
    {
      name: "auth",
    },
  ),
);
