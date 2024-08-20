import { create } from "zustand";

interface SignupStore {
  step: number;
  setstep: (step: number) => void;
  decreaseStep: () => void;
}

export const useSignupStore = create<SignupStore>((set) => ({
  step: 1,
  setstep: (step) => set({ step }),
  decreaseStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
}));
