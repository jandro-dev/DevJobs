// TS es de tipado estático porque si sabe el tipo antes de ejecutarse
// y fuerte porque no es capaz de transformar tipos

function doubleTs(n: number) {
	return n * 2;
}

console.log(doubleTs(4)); // 8

// Con ts es mejor validar el tipo de dato antes de ejecutar la función, así evitamos errores en tiempo de ejecución

const input = "2"
let parsedInput: number;

if (typeof input === "string") {
	parsedInput = Number(input);
} else if (typeof input === "number") {
	parsedInput = input;
} else {
	parsedInput = 0
}

const result = doubleTs(parsedInput);
console.log(result); // 4