// =================================
// TUPLAS EN TYPESCRIPT
// =================================

// Tipo de especial de array donde el orden y posicion es importante
const persona: [string, number] = ["jandrodev", 20]
const [nombre, edad] = persona

// Casos de uso

// 1. Coordenadas
type Coordenadas = [number, number]
const [lat, lon]: Coordenadas = [40.1345, -3.1442]

// 2. Colores RGB
type RGB = [number, number, number]
const rojo: RGB = [255, 0, 0]
const verde: RGB = [0, 255, 0]
const azul: RGB = [0, 0, 255]

// 3. Rango de valores
type Rango = [min: number, max: number] // Tambien se puede nombrar para que el codigo sea autoexplicativo
const rangoEdad: Rango = [18, 65]

// 4. Respuestas de funciones ( como useState en React )
type EstadoContador = [number, (nuevoValor: number) => void]

// Tuplas con REST elements
type StringYMuchosNumeros = [string, ...number[]]
const [text, firstNumber, ...restOfNumbers]: StringYMuchosNumeros = ["texto", 1, 2, 3, 4, 5]

type Config = readonly [server: string, port: number, useSSL: boolean]
const dbConfig: Config = ["localhost", 5432, true]
// dbConfig[0] = "remotehost" // Error: no se puede modificar una tupla readonly