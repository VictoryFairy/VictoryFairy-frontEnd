interface UserState {
    nickname: string | null;
    supportTeam: string | null;
    profile: string | null;
    email: string | null;
    setUserInfo: (nickname: string | null, supportTeam: string | null, profile: string | null, email: string | null) => void;
    updateNickname: (nickname: string) => void;
    updateImage: (profile: string) => void;
    deleteUserInfo: () => void;
}
export declare const useUserStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<UserState>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<UserState, UserState>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: UserState) => void) => () => void;
        onFinishHydration: (fn: (state: UserState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<UserState, UserState>>;
    };
}>;
export {};
