process.loadEnvFile(); // carga las variables de entorno desde el archivo .env

import { test } from "node:test";
import assert from "node:assert";

import { Stagehand } from "@browserbasehq/stagehand";

test("Un usuario puede entrar a la JSConf y adquirir dos entradas por €287.98", async () => {
	const stagehand = new Stagehand({
		env: "LOCAL",
		model: "", // Modelo ollama en local ( ver como hacerlo )
	});

	await stagehand.init();

	const [page] = stagehand.context.pages();

	await page.goto("https://jsconf.com/");

	// Lo que quiero que haga
	await stagehand.act("Click to 'Comprar entradas'")

	await stagehand.act("Add one 'Entrada General' ticket to the cart")
	await stagehand.act("Add another one 'Entrada General' ticket to the cart");

	// Extraer la información
	const { extraction } = await stagehand.act("Extract the subtotal from the page")
	console.log("Subtotal extraído:", extraction);

	assert.strictEqual(extraction, "€287.98");

	await stagehand.close();
});
