import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  nickname: string | null;
  supportTeam: string | null;
  setUserInfo: (nickname: string | null, supportTeam: string | null) => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      nickname: null,
      supportTeam: null,
      setUserInfo: (nickname, supportTeam) => set({ nickname, supportTeam }),
    }),
    {
      name: "user-storage",
    },
  ),
);
