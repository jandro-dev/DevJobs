

import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Pagination } from "./components/Pagination.jsx";
import { SearchFormSection  } from "./components/SearchFormSection.jsx";
import { JobListings } from "./components/JobListings.jsx";

import jobsData from "./data.json";

function App() {

	return (
		<>
			<Header />

			<main>
				<SearchFormSection />

				<section>
					<JobListings jobs={jobsData} />
					<Pagination />
				</section>
			</main>

			<Footer />
		</>
	);
}

export default App;
