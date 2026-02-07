import { Router } from "express";
import { JobController } from "../controllers/jobs.js";
import { validateJob, validatePartialJob } from "../schemas/jobs.js";

export const jobsRouter = Router();

// Middleware para validar la creación de un trabajo
function validateCreate(req, res, next) {
	const result = validateJob(req.body);
	if (result.success) {
		req.body = result.data; // Tiene los datos validados y limpios
		return next();
	}

	return res
		.status(400)
		.json({ error: "Invalid request", details: result.error.errors });
}

// Middleware para validar la actualización de un trabajo
function validateUpdate(req, res, next) {
	const result = validateJob(req.body);
	if (result.success) {
		req.body = result.data;
		return next();
	}

	return res.status(400).json({ error: JSON.parse(result.error.message) });
}

jobsRouter.get("/", JobController.getAll); // Utiliza la logica del controlador
jobsRouter.get("/:id", JobController.getId);
jobsRouter.post("/", validateCreate, JobController.create);
jobsRouter.put("/:id", validateUpdate, JobController.update);
jobsRouter.patch("/:id", JobController.partialUpdate);
jobsRouter.delete("/:id", JobController.delete);