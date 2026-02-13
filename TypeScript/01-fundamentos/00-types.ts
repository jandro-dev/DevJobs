export type Company = {
	name: string,
	address: string,
	phone?: string
}

type UserId = {
	readonly id: string | number
}

type UserWithBirthdate = {
	birthdate: Date
} 

export type User = {
	readonly name: string // readonly hace que la propiedad no se pueda sobreescribir en tiempo de compilacion
	readonly age: number
	email?: string // Propiedad opcional
	company?: Company
	role: "admin" | "user" | "editor" // Asignar valores predefinidos en una propiedad ( Literal Types )
};

// Intersection types
export type UserEntity = User & UserId & UserWithBirthdate


// Propiedades comunes que se usan que no se deberian modificar
export type Configuration = {
	readonly apiKey: string,
	readonly theme: "dark" | "light"
}

// Index Signatures
type Dictionary = {
	[key: string]: string // Esto es para objetos dinamicos si no se conocen las claves antes
}

const dictionary: Dictionary = {
	apple: "A fruit is usually red",
	banana: "A long yellow fruit",
	cherry: "A small red fruit"
}