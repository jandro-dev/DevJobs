import { useState } from "react";

export function useFiltersClear({ idText, idTechnology, idLocation, idExperienceLevel, searchText, onSearch, setSearchText, onTextFilter, handleChange }) {

	const [hasFilters, setHasFilters] = useState(false);

	// Detectar filtros activos
	const handleActiveFilters = (event) => {
		// Ejecutamos la lógica original del hook useSearchForm
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

	return {
		hasFilters,
		handleActiveFilters,
		clearFilters,
	};
}