import os from "node:os";
import ms from "ms";

console.log("Información del sistema:");

console.log("Tipo de SO:", os.type());
console.log("Plataforma:", os.platform());
console.log("Arquitectura:", os.arch());
console.log("CPU Cores:", os.cpus().length);
console.log("Total Memory (MB):", Math.round(os.totalmem() / 1024 / 1024));
console.log("Free Memory (MB):", Math.round(os.freemem() / 1024 / 1024));
console.log("Home Directory:", os.homedir());
console.log("Uptime:", ms(os.uptime() * 1000, { long: true }));
