
const filter = document.querySelector("#filter-location");
const mensaje = document.querySelector("#filter-selected-value");
// Al filtrar dinamicamente no se actualiza el filtro ya que no existen los trabajos antes del filtro
// const jobs = document.querySelectorAll(".job-listing-card"); // NodeList [0]

filter.addEventListener("change", () => {
	const jobs = document.querySelectorAll(".job-listing-card");
	const selectedValue = filter.value;

	if (selectedValue) {
		mensaje.textContent = `Has seleccionado: ${selectedValue}`;
	} else {
		mensaje.textContent = "";
	}

	jobs.forEach((job) => {
		const modalidad = job.getAttribute("data-modalidad");
		const isShown = selectedValue === modalidad || selectedValue === "";

		job.classList.toggle("is-hidden", !isShown);

		// Alternativa usando if else
		// if (selectedValue === "" || selectedValue === modalidad) {
		// 	job.classList.remove("is-hidden");
		// } else {
		// 	job.classList.add("is-hidden");
		// }
	});
});

// Ejemplos de eventos

// const searchInput = document.querySelector("#empleos-search-input");

// searchInput.addEventListener("input", () => {
// 	console.log(searchInput.value);
// });

// searchInput.addEventListener("blur", () => {
// 	console.log("Se dispara cuando el campo pierde el foco");
// });

// const searchForm = document.querySelector("#empleos-search-form");

// searchForm.addEventListener("submit", (event) => {
// 	event.preventDefault(); // Evita que se recargue la pagina

// 	// Aqui iria la logica para procesar el formulario
// 	console.log("Formulario enviado");
// });

// document.addEventListener("keydown", (event) => {
// 	console.log("Tecla presionada", event.key);
// 	console.log("¿Esta pulsada la tecla shif?", event.shiftKey);
// 	console.log("¿Esta pulsada la tecla ctrl?", event.ctrlKey);
// 	console.log("¿Esta pulsada la tecla alt?", event.altKey);
// });
