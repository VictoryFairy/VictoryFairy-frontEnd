import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  nickname: string | null;
  supportTeam: string | null;
  profile: string | null;
  setUserInfo: (
    nickname: string | null,
    supportTeam: string | null,
    profile: string | null,
  ) => void;
  deleteUserInfo: () => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      nickname: null,
      supportTeam: null,
      profile: null,
      setUserInfo: (nickname, supportTeam, profile) =>
        set({ nickname, supportTeam, profile }),
      deleteUserInfo: () =>
        set({ nickname: null, supportTeam: null, profile: null }),
    }),
    {
      name: "user-storage",
    },
  ),
);
