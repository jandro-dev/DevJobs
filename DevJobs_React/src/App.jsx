import { lazy,Suspense, useState } from "react";

import { Routes, Route } from "react-router";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Loader } from "./components/Loader.jsx";

// Carga perezosa de paginas
const HomePage = lazy(() => import("./pages/Home.jsx"))
const SearchPage = lazy(() => import("./pages/Search.jsx"));
const NotFoundPage = lazy(() => import("./pages/404.jsx"));
const JobDetail = lazy(() => import("./pages/Detail.jsx"));

function App() {

	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const handleLogin = () => {
		setIsLoggedIn(true)
	}

	const handleLogout = () => {
		setIsLoggedIn(false);
	};

	return (
		<>
			<Header isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
			{/* Lo que carga entre renderizacion de paginas con una conexion lenta */}
			<Suspense fallback={<div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>Cargando...</div>}>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/search" element={<SearchPage />} />
					<Route path="/jobs/:jobId" element={<JobDetail isLoggedIn={isLoggedIn} />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Suspense>
			<Footer />
		</>
	);
}

export default App;
