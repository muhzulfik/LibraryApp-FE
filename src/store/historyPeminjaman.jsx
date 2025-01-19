import { create } from "zustand";

export const useTriggerHistory = create((set) => ({
	trigger: false,
	setTrigger: (trigger) => set({ trigger }),
}));
