
const RESULTS_PER_PAGE = 3;

const paginationContainer = document.querySelector(".pagination");
const container = document.querySelector(".jobs-listings");

let currentPage = 1;

function renderJobsAndPagination(jobs) {
	const totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGE);

	// Calcular qué trabajos mostrar
	const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
	const endIndex = startIndex + RESULTS_PER_PAGE;
	const jobsToShow = jobs.slice(startIndex, endIndex);

	// Limpiar contenedores
	container.innerHTML = "";
	paginationContainer.innerHTML = "";

	jobsToShow.forEach((job) => {
		const article = document.createElement("article");
		article.className = "job-listing-card";

		article.setAttribute("data-technology", job.data.technology);
		article.setAttribute("data-modalidad", job.data.modalidad);
		article.setAttribute("data-nivel", job.data.nivel);

		// Esto conlleva posibles inyecciones de codigo
		article.innerHTML = `<div>
			<h3>${job.titulo}</h3>
			<small>${job.empresa} | ${job.ubicacion}</small>
			<p>${job.descripcion}</p>
		</div>
		<button class="button-apply-job">Aplicar</button>`;

		// Alternativa mas segura
		// const wrapper = document.createElement("div");

		// const title = document.createElement("h3");
		// title.textContent = job.titulo;

		// const meta = document.createElement("small");
		// meta.textContent = `${job.empresa} | ${job.ubicacion}`;

		// const description = document.createElement("p");
		// description.textContent = job.descripcion;

		// const button = document.createElement("button");
		// button.className = "button-apply-job";
		// button.textContent = "Aplicar";

		// wrapper.append(title, meta, description);
		// article.append(wrapper, button);

		container.appendChild(article);
	});

	// Crear botón de pagina anterior
	if (currentPage > 1) {
		const prevButton = document.createElement("button");
		prevButton.textContent = "←";
		prevButton.className = "page-button prev";
		prevButton.addEventListener("click", () => {
			currentPage--;
			renderJobsAndPagination(jobs);
		});
		paginationContainer.appendChild(prevButton);
	}

	// Crear un botón por cada página
	for (let i = 1; i <= totalPages; i++) {
		const button = document.createElement("button");
		button.textContent = i;
		button.className = "page-button";

		// Si es la página actual, añadir clase activa
		if (i === currentPage) {
			button.classList.add("is-active");
		}
		
		// Escuchar clics para cambiar de página
		button.addEventListener("click", () => {
			currentPage = i;
			renderJobsAndPagination(jobs); // Vuelve a renderizar con la nueva página
		});

		paginationContainer.appendChild(button);
	}

	// Crear botón de pagina siguiente
	if (currentPage < totalPages) {
		const nextButton = document.createElement("button");
		nextButton.textContent = "→";
		nextButton.className = "page-button next";
		nextButton.addEventListener("click", () => {
			currentPage++;
			renderJobsAndPagination(jobs);
		});
		paginationContainer.appendChild(nextButton);
	}
}
	
fetch("./data.json")
	.then((response) => response.json())
	.then((jobs) => {
		renderJobsAndPagination(jobs);
	})
	.catch((error) => {
		console.error("Error al cargar los datos:", error);
	});