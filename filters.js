
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

// Filtros de nivel

const filterLevel = document.querySelector("#filter-experience-level");

filterLevel.addEventListener("change", () => {
	const jobs = document.querySelectorAll(".job-listing-card");
	const selectedValue = filterLevel.value;

	jobs.forEach((job) => {
		const level = job.getAttribute("data-nivel");
		const isShown = selectedValue === level || selectedValue === "";

		job.classList.toggle("is-hidden", !isShown);
	});
})

// Filtro de tecnologia con array

const filterTechnology = document.querySelector("#filter-technology");

filterTechnology.addEventListener("change", () => {
	const jobs = document.querySelectorAll(".job-listing-card");
	const selectedValue = filterTechnology.value.toLowerCase();

	jobs.forEach((job) => {
		// Convertir el string en un array y eliminar espacios en blanco
    const technologies = job.getAttribute("data-technology").toLowerCase().split(",").map(tech => tech.trim());
		
		const isShown = technologies.includes(selectedValue) || selectedValue === "";

    job.classList.toggle("is-hidden", !isShown);
	})
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


// Filtro de busqueda por texto introducido mas mostrar cantidad de ofertas filtradas

const searchInput = document.querySelector("#empleos-search-input");
const results = document.querySelector("#search-selected-value");

searchInput.addEventListener("input", () => {
	
	const busqueda = searchInput.value.toLowerCase().trim();
	const jobs = Array.from(document.querySelectorAll(".job-listing-card"));
	const total = jobs.length;

	const filtradas = jobs.filter((job) => {
		const titulo = job.querySelector("h3").textContent.toLowerCase() || "";
		
		const isShown = titulo.includes(busqueda) || busqueda === "";
		job.classList.toggle("is-hidden", !isShown);

		return isShown;
	})

	const visibles = filtradas.length;

	results.textContent = `${busqueda ? visibles : total} de ${total} ofertas`;

});