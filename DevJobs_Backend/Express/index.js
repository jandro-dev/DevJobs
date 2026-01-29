import express from "express";
import jobs from "./jobs.json" with { type: "json" };

const PORT = process.env.PORT ?? 1234;
const app = express();

// Independientemente del metodo que use el cliente, primero pasa por aqui
app.use((req, res, next) => {
	const timeString = new Date().toLocaleTimeString();
	console.log(`[${timeString}] ${req.method} ${req.url}`);
	next(); // Dejar pasar al siguiente manejador
});

app.get("/", (req, res) => {
	return res.send("<h1>Hello World!</h1>");
});

app.get("/health", (req, res) => {
	return res.json({
		status: "OK",
		uptime: process.uptime(),
	});
});

// Obtener todos los trabajos
app.get("/get-jobs", (req, res) => {
	return res.json(jobs);
});

// Parametros dinamicos
app.get("/get-single-job/:id", (req, res) => {
	const { id } = req.params;

	const idNumber = Number(id);

	return res.json({
		job: { id: idNumber, title: `Job with id ${idNumber}` },
	});
});

// Rutas opcionales con regex -> /acd o /abcd
app.get("/a{b}cd", (req, res) => {
	return res.send("/abcd o /acd");
});

// Comodin
app.get("/bb*bb", (req, res) => {
	return res.send("/bb*bb");
});

// Rutas mas largas que no se saben como terminan
app.get("/file/*filename", (req, res) => {
	return res.send("file/*");
});

// Usando regex
app.get(/.*fly$/, (req, res) => {
	return res.send("Terminando en fly");
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
