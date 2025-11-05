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

	jobs.forEach(job => {
		const modalidad = job.getAttribute("data-modalidad");
		const isShown = selectedValue === modalidad || selectedValue === "";

		job.classList.toggle("is-hidden", !isShown);

		// Alternativa usando if else
		// if (selectedValue === "" || selectedValue === modalidad) {
		// 	job.classList.remove("is-hidden");
		// } else {
		// 	job.classList.add("is-hidden");
		// }
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

const container = document.querySelector(".jobs-listings");

fetch("./data.json") // lo que devuelve fetch es asincrono
	.then(response => {
		return response.json();
		
	})
	.then(jobs => {
		jobs.forEach(job => {	
			const article = document.createElement("article")
			article.className = "job-listing-card";

			article.setAttribute("data-technology", job.data.technology);
			article.setAttribute("data-modalidad", job.data.modalidad);
			article.setAttribute("data-nivel", job.data.nivel);
		
			article.innerHTML = `<div>
					<h3>${job.titulo}</h3>
					<small>${job.empresa} | ${job.ubicacion}</small>
					<p>${job.descripcion}</p>
				</div>
				<button class="button-apply-job">Aplicar</button>`;

			container.appendChild(article);
		})
	})