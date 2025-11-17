import { useId, useState } from "react";

const useContactForm = ({ idName, idEmail, idMessage }) => {
	
	const [formSubmitted, setFormSubmitted] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const name = formData.get(idName);
		const email = formData.get(idEmail);
		const message = formData.get(idMessage);
			
		// Validación básica
		if (!name || !email || !message) {
			alert("Por favor completa todos los campos.");
			return;
		}

		setFormSubmitted(true);

		event.target.reset()
	}

	return {
		formSubmitted,
		handleSubmit,
	};
};


export function ContactPage() {

	const idName = useId()
	const idEmail = useId()
	const idMessage = useId()
	
	const { formSubmitted, handleSubmit } = useContactForm({ idName, idEmail, idMessage });

	return (
		<main>
			<section>
				<h1>Formulario de Contacto</h1>
				<p>
					Si tienes alguna pregunta o comentario, no dudes en contactarnos a
					través del siguiente formulario.
				</p>

				{formSubmitted && (
					<p style={{ color: "green", fontWeight: "bold" }}>
						¡Formulario enviado con éxito!
					</p>
				)}

				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="name">Nombre:</label>
						<input
							type="text"
							id="name"
							name={idName}
							placeholder="Introduce tu nombre"
							required
						/>
					</div>

					<div>
						<label htmlFor="email">Correo Electrónico:</label>
						<input
							type="email"
							id="email"
							name={idEmail}
							placeholder="Introduce tu correo"
							required
						/>
					</div>

					<div>
						<label htmlFor="message">Mensaje:</label>
						<textarea
							id="message"
							name={idMessage}
							rows="4"
							placeholder="Escribe tu mensaje"
						/>
					</div>

					<button type="submit">Enviar</button>
				</form>
			</section>
		</main>
	);
}