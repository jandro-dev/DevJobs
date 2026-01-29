import express from "express";
import jobs from "./jobs.json" with { type: "json" };
import { DEFAULTS } from "./config.js";

const PORT = process.env.PORT ?? DEFAULTS.PORT;
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
	const {
		text,
		title,
		level,
		limit = DEFAULTS.LIMIT_PAGINATION,
		technology,
		offset = DEFAULTS.LIMIT_OFFSET,
	} = req.query;

	let filteredJobs = jobs;

	if (text) {
		const searchTerm = text.toLowerCase();
		filteredJobs = filteredJobs.filter(
			(job) =>
				job.titulo.toLowerCase().includes(searchTerm) ||
				job.descripcion.toLowerCase().includes(searchTerm),
		);
	}

	if (technology) {
		filteredJobs = filteredJobs.filter((job) =>
			job.data.technology.includes(technology),
		);
	}

	const limitNumber = Number(limit);
	const offsetNumber = Number(offset);

	const paginatedJobs = filteredJobs.slice(
		offsetNumber,
		offsetNumber + limitNumber,
	);

	console.log(req.query);
	return res.json(paginatedJobs);
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
