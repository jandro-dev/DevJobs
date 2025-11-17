import { useState } from "react";

let timeoutId = null;

export function useSearchForm({ idText, idTechnology, idLocation, idExperienceLevel, onSearch, onTextFilter }) {
	
	const [searchText, setSearchText] = useState("");
	

	const handleChange = (event) => {
		event.preventDefault();

		const { name, value, form } = event.target;

		if (name === idText) {
			setSearchText(value); // actualiza el input inmediatamente

			// Debounce para el filtro de texto
			if (timeoutId) clearTimeout(timeoutId);
			timeoutId = setTimeout(() => onTextFilter(value), 500);
		
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
	}

	return {
		searchText,
		setSearchText,
		handleChange,
	};
}