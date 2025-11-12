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
		text: "",
		technology: "",
		location: "",
		experienceLevel: "",
	});
	
	const [currentPage, setCurrentPage] = useState(1);

	const filterJobs = (jobs, filters) => {
		return jobs
			.filter((job) => {
				const technologies =
					filters.technology === "" || job.data.technology === filters.technology;
				const locations =
					filters.location === "" || job.data.modalidad === filters.location;
				const experiences =
					filters.experienceLevel === "" || job.data.nivel === filters.experienceLevel;

				return technologies && locations && experiences;
			})
			.filter((job) => {
				if (filters.text === "") return true;
				return job.titulo.toLowerCase().includes(filters.text.toLowerCase());
			})
	};

	const filteredJobs = filterJobs(jobsData, filters);

	{/* Math.round -> redondea | Math.ceil -> redondea por arriba | Math.floor -> redondea por abajo */}
	const totalPages = Math.ceil(filteredJobs.length / RESULTS_PER_PAGE); // Se calcula despues de filtrar para que la paginacion sea correcta

	const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
	const pagedResults = filteredJobs.slice(startIndex,startIndex + RESULTS_PER_PAGE);

  const handlePageChange = (page) => {
		setCurrentPage(page);
  };

	const handleFiltersChange = (newFilters) => {
		setFilters(newFilters);
		setCurrentPage(1);
	};

	

	return (
		<>
			{/* Se vuelve a renderizar todo cuando cambia el estado */}
			<Header />

			<main>
				<SearchFormSection
					onFiltersChange={handleFiltersChange}
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
