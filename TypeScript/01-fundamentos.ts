// =================================
// TIPOS PRIMITIVOS EN TYPESCRIPT
// =================================

// 1. String
const nombre = "Jandrodev";
const saludo = `Hola, ${nombre}`; // Tipo inferido como string
const vacio: string = "";

// 2. Number
const color = 0x09f
let color2 = 0x09f
let infinito = Infinity

// 3. Boolean
let isActive = true
isActive = false

// 4. Null y Undefined
let nulo: null = null
let indefinido: undefined = undefined // no puede ser null

let age: number | null = null
age = 30

// 5. Symbol
const id: symbol = Symbol("id")

// 6. BigInt
const bigInt = 9007199254740991n

// Diferencia para adivinar el tipo para let y const

const ciudad = "Madrid"
// ciudad = "Barcelona" // Error: no se puede reasignar
let pais = "España"
pais = "Francia"