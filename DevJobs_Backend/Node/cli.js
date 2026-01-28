// console.log(process.argv); // Muestra los argumentos de la línea de comandos

import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

// 1. Recuperar la carpeta a listar
const dir = process.argv[2] ?? ".";

// 2. Formato simple de los tamaños
const formatSize = (size) => {
	if (size < 1024) return `${size} B`;
	return `${(size / 1024).toFixed(2)} KB`;
};

// 3. Leer los nombres, sin info
const files = await readdir(dir);
//console.log(files);

// 4. Rercuperar la info de cada archivo
const entries = await Promise.all(
	files.map(async (name) => {
		const fullPath = join(dir, name);
		const info = await stat(fullPath);

		return {
			name,
			isDir: info.isDirectory(),
			size: formatSize(info.size),
		};
	}),
);

// Ejercicios practicos

// sort
// 1. Que aparezcan primero las carpetas
// 2. Que esten en orden alfabetico

// filter
// 1. tener en cuenta flags como --files-only o --dirs-only

for (const entry of await entries) {
	// Renderizar la información
	const icon = entry.isDir ? "📁" : "📄";
	const size = entry.isDir ? "-" : `${entry.size}`;
	console.log(`${icon}  ${entry.name.padEnd(25)} ${size}`);
}
