interface SignupStore {
    step: number;
    setstep: (step: number) => void;
    decreaseStep: () => void;
}
export declare const useSignupStore: import("zustand").UseBoundStore<import("zustand").StoreApi<SignupStore>>;
export {};
