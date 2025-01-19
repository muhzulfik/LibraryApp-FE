import { create } from "zustand";

export const useTriggerMasterMahasiswa = create((set) => ({
	trigger: false,
	setTrigger: (trigger) => set({ trigger }),
}));
