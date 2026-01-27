import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { json } from "node:stream/consumers";

process.loadEnvFile(); // lee automáticamente el archivo .env
const port = process.env.PORT || 3000;

function sendJson(res, statusCode, data) {
	res.statusCode = statusCode;
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	res.end(JSON.stringify(data));
}

const users = [
	{ id: 1, name: "Alice" },
	{ id: 2, name: "Bob" },
	{ id: 3, name: "Charlie" },
];

const server = createServer(async (req, res) => {
	const { method, url } = req;

	const [pathName, queryString] = url.split("?");

	const searchParams = new URLSearchParams(queryString);

	if (method === "GET") {
		if (pathName === "/users") {
			// Para validar que limit y offset sean números (no es la mejor forma)
			/* if ( 
				Number.isNaN(Number(searchParams.get("limit"))) ||
				Number.isNaN(Number(searchParams.get("offset")))
			) {
				return sendJson(res, 400, { error: "Limit and offset must be number" });
			} */

			const limit = Number(searchParams.get("limit")) || users.length;
			const offset = Number(searchParams.get("offset")) || 0;

			const paginatedUsers = users.slice(offset, offset + limit);

			return sendJson(res, 200, paginatedUsers);
		}

		if (pathName === "/health") {
			return sendJson(res, 200, { status: "OK", uptime: process.uptime() });
		}
	}

	if (method === "POST") {
		if (pathName === "/users") {
			const body = await json(req);

			if (!body || !body.name) {
				return sendJson(res, 400, { error: "Name is required" });
			}

			const newUser = {
				name: body.name,
				id: randomUUID(),
			};

			users.push(newUser);

			return sendJson(res, 201, { message: "Usuario creado" });
		}
	}

	if (pathName === "/") {
		res.setHeader("Content-Type", "text/plain; charset=utf-8");
		return res.end("Hola, desde Node! ♥");
	}

	return sendJson(res, 404, { error: "Not Found" });
});

server.listen(port, () => {
	const address = server.address();
	console.log(`Server is running on http://localhost:${address.port}`);
});
