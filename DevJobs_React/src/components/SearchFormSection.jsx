import { useId, useRef, useState } from "react";

const useSearchForm = ({ idText, idTechnology, idLocation, idExperienceLevel, onSearch, onTextFilter }) => {

	const timeoutId = useRef(null) // Referencia para el timeout del debounce
	const [searchText, setSearchText] = useState("")

	const handleChange = (event) => {
		event.preventDefault();

		const { name, value, form } = event.target;

		if (name === idText) {
			setSearchText(value); // actualiza el input inmediatamente

			// Debounce para el filtro de texto
			if (timeoutId.current) clearTimeout(timeoutId.current);
			timeoutId.current = setTimeout(() => onTextFilter(value), 500);
		} else {
			const formData = new FormData(form);

			// manejar filtros select
			const filters = {
				technology: formData.get(idTechnology),
				location: formData.get(idLocation),
				experienceLevel: formData.get(idExperienceLevel),
			};

			onSearch(filters);
		}
	};

	return {
		searchText,
		handleChange
	};
}


export function SearchFormSection({ onSearch, onTextFilter, initialText, initialFilters }) {
	const idText = useId();
	const idTechnology = useId();
	const idLocation = useId();
	const idExperienceLevel = useId();
	
	const inputRef = useRef(); // Referencia al input de búsqueda

	const { 
		handleChange,
	} = useSearchForm({ idText, idTechnology, idLocation, idExperienceLevel, onSearch, onTextFilter });

	const handleClearInput = (event) => {
		event.preventDefault();

		inputRef.current.value = "";
		onTextFilter("");
	};

	return (
		<section className="jobs-search">
			<h1>Encuentra tu próximo trabajo</h1>
			<p>Explora miles de oportunidades en el sector tecnológico.</p>

			<form onChange={handleChange} id="empleos-search-form" role="search">
				<div className="search-bar">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="icon icon-tabler icons-tabler-outline icon-tabler-search"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
						<path d="M21 21l-6 -6" />
					</svg>

					<input
						ref={inputRef}
						name={idText}
						id="empleos-search-input"
						type="text"
						placeholder="Buscar trabajos, empresas o habilidades"
						onChange={handleChange}
						defaultValue={initialText}
					/>

					<button onClick={handleClearInput}>x</button>

				</div>
				<span id="search-selected-value"></span>

				<div className="search-filters">
					<select name={idTechnology} id="filter-technology" defaultValue={initialFilters.technology}>
						<option value="">Tecnología</option>
						<optgroup label="Tecnologías populares">
							<option value="javascript">JavaScript</option>
							<option value="python">Python</option>
							<option value="react">React</option>
							<option value="nodejs">Node.js</option>
						</optgroup>
						<option value="java">Java</option>
						<hr />
						<option value="csharp">C#</option>
						<option value="c">C</option>
						<option value="c++">C++</option>
						<hr />
						<option value="ruby">Ruby</option>
						<option value="php">PHP</option>
					</select>

					<select name={idLocation} id="filter-location" defaultValue={initialFilters.location}>
						<option value="">Ubicación</option>
						<option value="remoto">Remoto</option>
						<option value="cdmx">Ciudad de México</option>
						<option value="guadalajara">Guadalajara</option>
						<option value="monterrey">Monterrey</option>
						<option value="barcelona">Barcelona</option>
					</select>

					<select name={idExperienceLevel} id="filter-experience-level" defaultValue={initialFilters.experienceLevel}>
						<option value="">Nivel de experiencia</option>
						<option value="junior">Junior</option>
						<option value="mid">Mid-level</option>
						<option value="senior">Senior</option>
						<option value="lead">Lead</option>
					</select>
				</div>
			</form>

			<span id="filter-selected-value"></span>
		</section>
	);
}
