// =================================
// ARRAYS EN TYPESCRIPT
// =================================


// Sintaxis 1
const numeros = [1, 2, 3, 4, 5]
numeros.push(6)

// Sintaxis 2
const numerosAlt: Array<number> = [1, 2, 3, 4, 5]
numerosAlt.push(6)

// Tupla - tienen un número fijo de elementos y tipos específicos para cada posición
const frutas: [string,string,string] = ["manzana", "banana", "naranja"]

// Evitar tipo any (let strings = [])
let strings: string[] = []

// Arrays de tipos mixtos (no recomendado)
const mixto: (string | number)[] = ["texto", 42, "otro texto", 3.14]
const arrayToFilter: (string | undefined)[] = ["uno", undefined, "dos", undefined]

