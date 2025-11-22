import { useState, useRef } from "react";

export function useSearchForm({ idText, idTechnology, idLocation, idExperienceLevel, onSearch, onTextFilter }) {

	const timeoutId = useRef(null); // Referencia para el timeout del debounce
	const [searchText, setSearchText] = useState("");
	// const [hasFilters, setHasFilters] = useState(false);

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

/* 
	// Detectar filtros activos
	const handleActiveFilters = (event) => {
		handleChange(event);

		const { name, value, form } = event.target;
		const formData = new FormData(form);

		const textValue = name === idText ? value : searchText;

		const isFiltering =
			textValue !== "" ||
			formData.get(idTechnology) ||
			formData.get(idLocation) ||
			formData.get(idExperienceLevel);

		setHasFilters(isFiltering);
	};

	// Limpiar filtros
	const clearFilters = (form) => {
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
 */

	return {
		searchText,
		// setSearchText,
		// hasFilters,
		// handleActiveFilters,
		// clearFilters,
		handleChange
	};
}
