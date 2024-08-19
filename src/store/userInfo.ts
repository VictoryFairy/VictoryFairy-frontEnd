import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  nickname: string | null;
  supportTeam: string | null;
  setUserInfo: (nickname: string | null, supportTeam: string | null) => void;
  deleteUserInfo: () => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      nickname: null,
      supportTeam: null,
      setUserInfo: (nickname, supportTeam) => set({ nickname, supportTeam }),
      deleteUserInfo: () => set({ nickname: null, supportTeam: null }),
    }),
    {
      name: "user-storage",
    },
  ),
);
