import { useState } from "react";

import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Pagination } from "./components/Pagination.jsx";
import { SearchFormSection  } from "./components/SearchFormSection.jsx";
import { JobListings } from "./components/JobListings.jsx";

import jobsData from "./data.json";

const RESULTS_PER_PAGE = 5;

function App() {

	const [filters, setFilters] = useState({
		technology: "",
		location: "",
		experienceLevel: "",
	});
	const [textToFilter, setTextToFilter] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const jobsFilterByFilters = jobsData.filter((job) => {
		return (
			(filters.technology === "" || job.data.technology === filters.technology) &&
			(filters.location === "" || job.data.modalidad === filters.location) &&
			(filters.experienceLevel === "" || job.data.nivel === filters.experienceLevel)
		);
	})

	const jobsWithFilter = textToFilter === ""
		? jobsFilterByFilters 
		: jobsFilterByFilters.filter((job) => {
			return job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
	})
	
	const pagedResults = jobsWithFilter.slice(
		(currentPage - 1) * RESULTS_PER_PAGE,
		currentPage * RESULTS_PER_PAGE
	);

	{/* Math.round -> redondea | Math.ceil -> redondea por arriba | Math.floor -> redondea por abajo */}
	const totalPages = Math.ceil(jobsWithFilter.length / RESULTS_PER_PAGE); // Se calcula despues de filtrar para que la paginacion sea correcta

  const handlePageChange = (page) => {
		setCurrentPage(page);
  };
  
	const handleSearch = (filters) => {
		setFilters(filters);
		setCurrentPage(1); // Reiniciar a la primera página al cambiar los filtros
	}

	const handleTextFilter = (newTextToFilter) => {
		setTextToFilter(newTextToFilter);
		setCurrentPage(1); // Reiniciar a la primera página al cambiar el filtro de texto
	};

	

	return (
		<>
			{/* Se vuelve a renderizar todo cuando cambia el estado */}
			<Header />

			<main>
				<SearchFormSection
					onSearch={handleSearch}
					onTextFilter={handleTextFilter}
				/>

				<section>
					<JobListings jobs={pagedResults} />
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</section>
			</main>

			<Footer />
		</>
	);
}

export default App;
