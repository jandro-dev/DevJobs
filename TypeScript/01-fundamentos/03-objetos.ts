// =================================
// OBJETOS EN TYPESCRIPT
// =================================

// Usar alias desde otro fichero
import type { User, UserEntity } from "./00-types";

// Forma no recomendada de tipar en TS
const user: { name: string; age: number } = {
	name: "jandrodev",
	age: 20
}

// Tipar con alias
// type User = {
// 	name: string,
// 	age: number
// }

// Con freeze da error en tiempo de ejecucion pero no en compilacion
const otroUser: User = Object.freeze({
	name: "jandrodev",
	age: 20,
	email: "test@gmail.com",
	company: {
		name: "mi empresa",
		address: "calle 1"
	},
	role: "admin"
})

// ts no evita de por si que se sobreescriba
// otroUser.name = "miguel" 

const anotherUser: User = {
	name: "pepito",
	age: 30,
	role: "user"
};

const entity: UserEntity = {
	id: 12345,
	name: "juan",
	age: 19,
	role: "user",
	email: "juan@gmail.com",
	birthdate: new Date("1999-07-01"),
};