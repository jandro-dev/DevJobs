import jobs from "../jobs.json" with { type: "json" };

export class JobModel {

	static async getAll({ text, title, level, limit = 10, technology, offset = 0 }) {

		let filteredJobs = jobs;

		if (text) {
			const searchTerm = text.toLowerCase();
			filteredJobs = filteredJobs.filter((job) =>
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

		const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber );

		return paginatedJobs
	}

	static async getById(id) {
		const job = jobs.find((job) => job.id === id);
		return job;
	}

	static async create({ titulo, empresa, ubicacion, descripcion, data }) {
		const newJob = {
			id: crypto.randomUUID(),
			titulo,
			empresa,
			ubicacion,
			descripcion,
			data,
		};

		jobs.push(newJob); // se hara en una base de datos con un INSERT

		return newJob;
	}

	static async update(id, { titulo, empresa, ubicacion, data }) {
		const jobIndex = jobs.findIndex((job) => job.id === id);

		if (jobIndex === -1) {
			return null;
		}

		// Reemplazo “completo” de la oferta
		jobs[jobIndex] = {
			...jobs[jobIndex],
			titulo,
			empresa,
			ubicacion,
			data,
		};

		return jobs[jobIndex];
	}

	static async partialUpdate(id, { titulo }) {
		const jobIndex = jobs.findIndex((job) => job.id === id);

		if (jobIndex === -1) {
			return null;
		}

		// Actualizar solo el título del trabajo
		jobs[jobIndex] = {
			...jobs[jobIndex],
			titulo,
		};

		return jobs[jobIndex];
	}

	static async delete(id) {
		const originalJobs = jobs.length;

		const filtered = jobs.filter((job) => job.id !== id);

		if (filtered.length === originalJobs) {
			return false
		}

		jobs.length = 0; // Limpiar el array original
		jobs.push(...filtered); // Rellenar con los trabajos filtrados
		
		return true
	}
}