
const container = document.querySelector(".jobs-listings");

fetch("./data.json") // lo que devuelve fetch es asincrono
	.then((response) => {
		return response.json();
	})
	.then((jobs) => {
		jobs.forEach((job) => {
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
	});
