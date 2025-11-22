export function useFiltersClear({ setSearchText, onTextFilter, inputRef}) {

	const handleClearFilters = (event) => {
		event.preventDefault();

		inputRef.current.value = "";

		setSearchText("");
		onTextFilter("");
	};

	return { 
		handleClearFilters 
	};
}