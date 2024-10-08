import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  nickname: string | null;
  supportTeam: string | null;
  profile: string | null;
  email: string | null;
  setUserInfo: (
    nickname: string | null,
    supportTeam: string | null,
    profile: string | null,
    email: string | null,
  ) => void;
  updateNickname: (nickname: string) => void;
  updateImage: (profile: string) => void;
  deleteUserInfo: () => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set, get) => ({
      nickname: null,
      supportTeam: null,
      profile: null,
      email: null,
      setUserInfo: (nickname, supportTeam, profile, email) =>
        set({ nickname, supportTeam, profile, email }),
      deleteUserInfo: () => {
        set({ nickname: null, supportTeam: null, profile: null, email: null });
        (get() as any).persist.clearStorage();
      },
      updateNickname: (nickname: string) => {
        set({ nickname });
      },
      updateImage: (profile: string) => {
        set({ profile });
      },
    }),

    {
      name: "user-storage",
    },
  ),
);
