// Delegacion de eventos

const jobsListingSection = document.querySelector(".jobs-listings")

// El ? es para verificar que el elemento exista antes (opcional chaining)
jobsListingSection?.addEventListener("click", (event) => {
		const element = event.target;

		if (element.classList.contains("button-apply-job")) {
			element.textContent = "Aplicado";
			element.classList.add("is-applied");
			element.disabled = true;
		}	
});


// // - Comentarios con otros eventos interesantes

// // recupera solo el primer boton que encuentre
// const button = document.querySelectorAll(".button-apply-job");
// console.log(button); // null si no lo encuentra

// if (button !== null) {
// 	button.addEventListener("click", () => {
// 		button.textContent = "Aplicado";
// 		button.classList.add("is-applied");
// 		button.disabled = true;
// 	});
// }


// // devuelve un NodeList (array-like) con todos los botones que encuentre
// // o una lista vacia [] si no encuentra ninguno
// const buttons = document.querySelectorAll(".button-apply-job");
// console.log(buttons);

// buttons.forEach(button => {
// 	button.addEventListener("click", () => {
// 		button.textContent = "Aplicado";
// 		button.classList.add("is-applied");
// 		button.disabled = true;
// 	});
// });