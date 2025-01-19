import { create } from "zustand";

export const useTriggerInventory = create((set) => ({
	trigger: false,
	setTrigger: (trigger) => set({ trigger }),
}));
