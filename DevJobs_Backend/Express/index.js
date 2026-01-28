import express from "express";

const PORT = process.env.PORT ?? 1234;
const app = express();

// Independientemente del metodo que use el cliente, primero pasa por aqui
app.use((request, response, next) => {
	const timeString = new Date().toLocaleTimeString();
	console.log(`[${timeString}] ${request.method} ${request.url}`);
	next(); // Dejar pasar al siguiente manejador
});

const previousHomeMiddleware = (request, response, next) => {
	console.log("Ejecutando el middleware previo a la ruta /");
	next();
};

app.get("/", previousHomeMiddleware, (request, response) => {
	return response.send("<h1>Hello World!</h1>");
});

app.get("/health", (request, response) => {
	return response.json({
		status: "OK",
		uptime: process.uptime(),
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
