import { createContext, use, useState } from "react";

export const AuthContext = createContext();

// El contexto provee el estado de autenticación a la aplicación
export function AuthProvider({ children }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const login = () => {
		setIsLoggedIn(true);
	};
	
	const logout = () => {
		setIsLoggedIn(false);
	};

	const value = {
		isLoggedIn,
		login,
		logout,
	}

	return <AuthContext value={value}>
		{children}
	</AuthContext>
}

export function useAuth() {
	const context = use(AuthContext); // Con use se usa para contextos y promesas

	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
}