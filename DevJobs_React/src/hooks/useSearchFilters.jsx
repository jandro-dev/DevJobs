import { useState } from "react";

let timeoutId = null;

export function useSearchFilters({ onSearch, onTextFilter }) {
	
	const [searchText, setSearchText] = useState("");
	const [hasFilters, setHasFilters] = useState(false);

	const handleChange = (event, ids) => {
		const { idText, idTechnology, idLocation, idExperienceLevel } = ids;
		const { name, value, form } = event.target;

		if (name === idText) {
			setSearchText(value); // actualiza el input inmediatamente

			// Debounce para el filtro de texto
			if (timeoutId) clearTimeout(timeoutId);
			timeoutId = setTimeout(() => onTextFilter(value), 500);
		}

		const formData = new FormData(form);

		// manejar filtros select
		const filters = {
			technology: formData.get(idTechnology),
			location: formData.get(idLocation),
			experienceLevel: formData.get(idExperienceLevel),
		};

		onSearch(filters);

		// determinar si hay filtros activos
		const textValue = name === idText ? value : searchText;

		const isFiltering =
			textValue !== "" ||
			formData.get(idTechnology) ||
			formData.get(idLocation) ||
			formData.get(idExperienceLevel);

		setHasFilters(isFiltering);
	};

	// función para limpiar filtros
	const clearFilters = (form) => {

		if (timeoutId) clearTimeout(timeoutId);
		setSearchText("");
		onTextFilter("");

		form.reset();

		onSearch({
			technology: "",
			location: "",
			experienceLevel: "",
		});
		
		setHasFilters(false);
	};

	return {
		searchText,
		hasFilters,
		handleChange,
		clearFilters,
	};
}
