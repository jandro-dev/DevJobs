import { DEFAULTS } from "../config.js";	
import { JobModel } from "../models/jobs.js";

export class JobController {
	
	// Obtener todos los trabajos
	static async getAll(req, res) {
		const { text, title, level, limit = DEFAULTS.LIMIT_PAGINATION, technology, offset = DEFAULTS.LIMIT_OFFSET } = req.query;
		
		const jobs = await JobModel.getAll({ text, title, level, limit, technology, offset });

		const limitNumber = Number(limit)
    const offsetNumber = Number(offset)
    
    return res.json({ data: jobs, total: jobs.length, limit: limitNumber, offset: offsetNumber })
	}

	// Recuperar un trabajo por ID
	static async getId(req, res) {
		const { id } = req.params;

		const job = await JobModel.getById(id);

		if (!job) {
			return res.status(404).json({ error: "Job not found" });
		}

		return res.json(job);
	}

	// Crea un nuevo trabajo
	static async create(req, res) {
		const { titulo, empresa, ubicacion, descripcion, data } = req.body;
		
		const newJob = await JobModel.create({ titulo, empresa, ubicacion, descripcion, data });

		return res.status(201).json(newJob);
	}

	// Reemplaza un trabajo ( por completo )
	static async update(req, res) {
		const { id } = req.params;
		const { titulo, empresa, ubicacion, data } = req.body;

		const job = await JobModel.update(id, { titulo, empresa, ubicacion, data });

		if (!job) {
			return res.status(404).json({ error: "Job not found" });
		}

		// Validar que vienen todos los campos requeridos
		if (!titulo || !empresa || !ubicacion || !data) {
			return res.status(400).json({ error: "Faltan campos requeridos" });
		}

		return res.json(job);
	}

	// Actualiza un trabajo ( parcialmente )
	static async partialUpdate(req, res) {
		const { id } = req.params;
		const { titulo } = req.body;

		const job = await JobModel.partialUpdate(id, { titulo });

		if (!job) {
			return res.status(404).json({ error: "Job not found" });
		}

		return res.json(job);
	}

	// Elimina un trabajo
	static async delete(req, res) {
		const { id } = req.params;

		const job = await JobModel.delete(id);

		if (!job) {
			return res.status(404).json({ error: "Job not found" });
		}
		// Responder con exito sin contenido
		return res.status(204).send();
	}
}