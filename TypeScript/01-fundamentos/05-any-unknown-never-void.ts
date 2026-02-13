// =================================
// ANY, UNKNOWN, NEVER Y VOID
// =================================

// ================================
// ANY - El tipo que desactiva TypeScript
// ================================

let cualquierCosa: any = "Hola";
cualquierCosa = 42;
cualquierCosa = true;

cualquierCosa.saludar();
const result = cualquierCosa + 8;

// Cuando any tiene sentido (lo recomendado es evitarlo lo mayor posible)
// 1. En migraciones de JS a TS
// 2. En librerias de terceros sin tipos

// ================================
// UNKNOWN - La alternativa segura a any
// ================================

let valorDesconocido: unknown = "hola";
valorDesconocido = 42;
valorDesconocido = true;
valorDesconocido = { nombre: "test" };

// Acepta cualquier valor pero no de cualquier manera
// valorDesconocido.saludar()
// const suma = valorDesconocido + 10

// Type Narrowing ( verificar primero el tipo )
if (typeof valorDesconocido === "number") {
	const resultadoSeguro = valorDesconocido + 8;
	console.log(resultadoSeguro);
} else if (typeof valorDesconocido === "string") {
	console.log(valorDesconocido.toUpperCase());
}

// ================================
// VOID - Funciones que no retornan nada
// ================================

function saludar(): void {
	console.log("Hola!");
}

function logError(errorMessage: string): void {
	if (errorMessage.length === 0) {
		return undefined; // Puede retornar undefined porque lo que retorna es vacio
	}

	console.error("Error:", errorMessage);
}

// ================================
// NEVER - El tipo imposible
// ================================

function bucleInfinito(): never {
	while (true) {
		// ...
	}
}

// Nunca retornara el error, sino que crea una instancia de throw
function throwErrror(message: string): never {
	throw new Error(message);
}

function revisarValor(x: number | string) {
	if (typeof x === "number") {
		console.log("Es un número:", x);
	} else if (typeof x === "string") {
		console.log("Es una cadena:", x);
	} else {
		console.log(x) // NUNCA DEBERÍA ENTRAR AQUÍ
		// Aquí, x es de tipo 'never'
		throwErrror("Tipo no soportado");
	}
}


// ================================
// COMPARATIVA
// ================================

/*
┌──────────┬────────────────────────────────────────────────────────┐
│ Tipo     │ Descripción                                            │
├──────────┼────────────────────────────────────────────────────────┤
│ any      │ Acepta todo, permite todo. EVITAR.                     │
│ unknown  │ Acepta todo, pero requiere verificación. PREFERIBLE.   │
│ void     │ Para funciones que no retornan valor útil.             │
│ never    │ Para casos imposibles o funciones que no terminan.     │
└──────────┴────────────────────────────────────────────────────────┘
*/