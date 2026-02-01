import express from "express";
import { jobsRouter } from "./routes/jobs.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { DEFAULTS } from "./config.js";

const PORT = process.env.PORT ?? DEFAULTS.PORT;
const app = express();

app.use(corsMiddleware());
app.use(express.json()); // Middleware para parsear JSON

app.use("/jobs", jobsRouter) // /jobs es el prefijo de todas las rutas definidas en jobsRouter

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
