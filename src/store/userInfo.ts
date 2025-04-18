import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  nickname: string | null;
  supportTeam: string | null;
  profile: string | null;
  email: string | null;
  provider: string[] | null;
  primaryProvider: string | null;
  setUserInfo: (
    nickname: string | null,
    supportTeam: string | null,
    profile: string | null,
    email: string | null,
    provider: string[] | null,
    primaryProvider: string | null,
  ) => void;
  updateNickname: (nickname: string) => void;
  updateImage: (profile: string) => void;
  deleteUserInfo: () => void;
  setProvider: (providers: string[]) => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set, get) => ({
      nickname: null,
      supportTeam: null,
      profile: null,
      email: null,
      provider: null,
      primaryProvider: null,
      setUserInfo: (
        nickname,
        supportTeam,
        profile,
        email,
        provider,
        primaryProvider,
      ) =>
        set({
          nickname,
          supportTeam,
          profile,
          email,
          provider,
          primaryProvider,
        }),
      deleteUserInfo: () => {
        set({
          nickname: null,
          supportTeam: null,
          profile: null,
          email: null,
          provider: null,
        });
        (get() as any).persist.clearStorage();
      },
      updateNickname: (nickname: string) => {
        set({ nickname });
      },
      updateImage: (profile: string) => {
        set({ profile });
      },
      setProvider: (provider: string[]) => {
        set({ provider });
      },
    }),

    {
      name: "user-storage",
    },
  ),
);
