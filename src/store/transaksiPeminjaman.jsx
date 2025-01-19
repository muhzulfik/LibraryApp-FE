import { create } from "zustand";

export const useTriggerTransaksi = create((set) => ({
	trigger: false,
	setTrigger: (trigger) => set({ trigger }),
}));
