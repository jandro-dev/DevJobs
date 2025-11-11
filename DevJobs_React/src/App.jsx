import { useState } from "react";

import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Pagination } from "./components/Pagination.jsx";
import { SearchFormSection  } from "./components/SearchFormSection.jsx";
import { JobListings } from "./components/JobListings.jsx";

import jobsData from "./data.json";

const RESULTS_PER_PAGE = 5;

function App() {

	const [currentPage, setCurrentPage] = useState(1);
	{/* Math.round -> redondea | Math.ceil -> redondea por arriba | Math.floor -> redondea por abajo */}
	const totalPages = Math.ceil(jobsData.length / RESULTS_PER_PAGE); 

	const pagedResults = jobsData.slice(
		(currentPage - 1) * RESULTS_PER_PAGE,
		currentPage * RESULTS_PER_PAGE
	);
  const handlePageChange = (page) => {
    console.log("Página cambiada a:", page);
		setCurrentPage(page);
  };
  
	return (
		<>
			{/* Se vuelve a renderizar todo cuando cambia el estado */}
			<Header />

			<main>
				<SearchFormSection />

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
