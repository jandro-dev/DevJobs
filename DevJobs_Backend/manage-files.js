import { mkdir, readFile, writeFile } from "node:fs/promises";

const content = await readFile("./archivo.txt", "utf-8");

console.log(content);

const outputDir = "output/files/documents";

await mkdir(outputDir, { recursive: true });

const uppercaseContent = content.toUpperCase();
await writeFile(`./${outputDir}/archivo_mayusculas.txt`, uppercaseContent);
console.log("Archivo escrito con contenido en mayúsculas.");
