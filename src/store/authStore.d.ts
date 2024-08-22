interface StoreState {
    isLoggedIn: boolean;
    token: string;
    teamId: number;
    loginAction: (token: string, teamId?: number) => void;
    logoutAction: () => void;
    updateTeamId: (teamId: number) => void;
}
export declare const useAuthStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<StoreState>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<StoreState, StoreState>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: StoreState) => void) => () => void;
        onFinishHydration: (fn: (state: StoreState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<StoreState, StoreState>>;
    };
}>;
export {};
