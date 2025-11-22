export function useFiltersClear({ onTextFilter, inputRef}) {

	const handleClearInput = (event) => {
		event.preventDefault();

		inputRef.current.value = "";
		onTextFilter("");
	};

	return {
		handleClearInput
	};
}