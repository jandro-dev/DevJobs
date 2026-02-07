import * as z from "zod";

// Porque usar ZOD en vez de TS
// TypeScript se ejecute en BUILD TIME
// Zod se ejecuta en RUNTIME
const jobSchema = z.object({
	titulo: z
		.string({
			error: "El título es requerido",
		})
		.min(3, "El título debe tener al menos 3 caracteres")
		.max(100, "El título no puede tener más de 100 caracteres"),

	empresa: z.string(),
	ubicacion: z.string(),
	descripcion: z.string().optional(),
	data: z.object({
		technology: z.array(z.string()),
		modalidad: z.string(),
		nivel: z.string(),
	}),
});

export function validateJob(input) {
	return jobSchema.safeParse(input); // Devuelve un objeto con error tratable en caso de que la validación falle
}

export function validatePartialJob(input) {
	return jobSchema.partial().safeParse(input); // Permite validar objetos con campos opcionales, útil para actualizaciones parciales
}
