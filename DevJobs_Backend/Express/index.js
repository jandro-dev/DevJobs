import express from "express";

const PORT = process.env.PORT ?? 1234;

const app = express();

app.get("/", (request, response) => {
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
