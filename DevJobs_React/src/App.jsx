import { useState } from "react";

import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Pagination } from "./components/Pagination.jsx";
import { SearchFormSection  } from "./components/SearchFormSection.jsx";
import { JobListings } from "./components/JobListings.jsx";

import jobsData from "./data.json";

function App() {

	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = 5; 

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
					<JobListings jobs={jobsData} />
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
