import { create } from "zustand";

export const useTriggerMasterBuku = create((set) => ({
	trigger: false,
	setTrigger: (trigger) => set({ trigger }),
}));
