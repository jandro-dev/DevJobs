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
type UserEntity = User & UserId & UserWithBirthdate

const entity: UserEntity = {
	id: 12345,
	name: "juan",
	age: 19,
	role: "user",
	email: "juan@gmail.com",
	birthdate: new Date("1999-07-01")
}


// Propiedades comunes que se usan que no se deberian modificar
export type Configuration = {
	readonly apiKey: string,
	readonly theme: "dark" | "light"
}