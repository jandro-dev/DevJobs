import { lazy,Suspense } from "react";
import { Routes, Route } from "react-router";
import { ProtectedRoute } from './components/ProtectedRoute';

import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";

// Carga perezosa de paginas
const HomePage = lazy(() => import("./pages/Home.jsx"))
const SearchPage = lazy(() => import("./pages/Search.jsx"));
const NotFoundPage = lazy(() => import("./pages/404.jsx"));
const JobDetail = lazy(() => import("./pages/Detail.jsx"));
const ProfilePage = lazy(() => import("./pages/Profile.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));

function App() {

	return (
		<>
			<Header />
			{/* Lo que carga entre renderizacion de paginas con una conexion lenta */}
			<Suspense fallback={<div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>Cargando...</div>}>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/search" element={<SearchPage />} />
					<Route path="/jobs/:jobId" element={<JobDetail />} />
						<Route path="/profile" element={
							<ProtectedRoute redirectTo="/login">
								<ProfilePage />
							</ProtectedRoute>
							} />
					<Route path="*" element={<NotFoundPage />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Routes>
			</Suspense>
			<Footer />
		</>
	);
}

export default App;
