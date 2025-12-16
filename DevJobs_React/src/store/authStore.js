import { create } from "zustand";

export const useAuthStore = create((set) => ({
	// Estado inicial
	isLoggedIn: false,

	// Acciones
	login: () => set({ isLoggedIn: true }),
	logout: () => set({ isLoggedIn: false }),
}));