import express from "express";
import jobs from "./jobs.json" with { type: "json" };
import { DEFAULTS } from "./config.js";

const PORT = process.env.PORT ?? DEFAULTS.PORT;
const app = express();

// Idempotente: el sistema se queda igual si se llama varias veces
app.get("/", (req, res) => {
	return res.send("<h1>Hello World!</h1>");
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
