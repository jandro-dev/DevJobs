import { createServer } from "node:http";
import { send } from "node:process";

process.loadEnvFile(); // lee automáticamente el archivo .env
const port = process.env.PORT || 3000;

function sendJson(res, statusCode, data) {
	res.statusCode = statusCode;
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	res.end(JSON.stringify(data));
}

const server = createServer((req, res) => {
	if (req.url === "/") {
		res.setHeader("Content-Type", "text/plain; charset=utf-8");
		return res.end("Hola, desde Node! ♥");
	}

	if (req.url === "/users") {
		return sendJson(res, 200, [
			{ id: 1, name: "Alice" },
			{ id: 2, name: "Bob" },
			{ id: 3, name: "Charlie" },
		]);
	}

	return sendJson(res, 404, { error: "Not Found" });
});

server.listen(port, () => {
	const address = server.address();
	console.log(`Server is running on http://localhost:${address.port}`);
});
