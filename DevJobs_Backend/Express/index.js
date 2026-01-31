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

app.get("/health", (req, res) => {
	return res.json({
		status: "OK",
		uptime: process.uptime(),
	});
});

// CRUD: Create, Read, Update, Delete

// Obtener todos los trabajos
app.get("/jobs", (req, res) => {
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

// Parametros dinamicos para recuperar un recurso
app.get("/jobs/:id", (req, res) => {
	const { id } = req.params;

	const job = jobs.find((job) => job.id === id);

	if (!job) {
		return res.status(404).json({ error: "Job not found" });
	}

	return res.json(job);
});

// Crea un nuevo trabajo
app.post("/jobs", (req, res) => {
	const { title, empresa, ubicacion, data } = req.body;

	const newJob = {
		id: crypto.randomUUID(),
		titulo,
		empresa,
		ubicacion,
		data,
	};

	jobs.push(newJob); // se hara en una base de datos con un INSERT

	return res.status(201).json(newJob);
});

// Reemplaza un trabajo ( por completo )
app.put("/jobs/:id", (req, res) => {
	const { id } = req.params;
	const { titulo, empresa, ubicacion, data } = req.body;

	const jobIndex = jobs.findIndex((job) => job.id === id);

	if (jobIndex === -1) {
		return res.status(404).json({ error: "Job not found" });
	}

	// Validar que vienen todos los campos requeridos
	if (!titulo || !empresa || !ubicacion || !data) {
		return res.status(400).json({ error: "Faltan campos requeridos" });
	}

	// Reemplazo “completo” de la oferta
	jobs[jobIndex] = {
		...jobs[jobIndex],
		titulo,
		empresa,
		ubicacion,
		data,
	};

	return res.json(jobs[jobIndex]);
});

// Actualiza un trabajo ( parcialmente )
app.patch("/jobs/:id", (req, res) => {
	const { id } = req.params;
	const { title } = req.body;

	const jobIndex = jobs.findIndex((job) => job.id === id);

	if (jobIndex === -1) {
		return res.status(404).json({ error: "Job not found" });
	}

	// Actualizar solo el título del trabajo
	jobs[jobIndex] = {
		...jobs[jobIndex],
		title,
	};

	return res.json(jobs[jobIndex]);
});

// Elimina un trabajo
app.delete("/jobs/:id", (req, res) => {
	const { id } = req.params;

	jobs = jobs.filter((job) => job.id !== id);

	// Responder con exito sin contenido
	return res.status(204).send();
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
