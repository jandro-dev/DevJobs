import { useState } from "react";
import { Link } from "./Link";
import styles from "./JobCard.module.css"
import { useFavoritesStore } from "../store/favoriteStore";
import { useAuthStore } from "../store/authStore";


function JobCardFavoriteButton({ jobId }) {

	const { isLoggedIn } = useAuthStore();
	// Se suscribe a toda la store
	const { isFavorite, toggleFavorite } = useFavoritesStore();

	// Se suscribe solo a lo necesario ( no funcional del todo pero mejora el rendimiento )
	// const isFavorite = useFavoritesStore((state) => state.isFavorite);
	// const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

	return (
		<button disabled={!isLoggedIn} onClick={() => toggleFavorite(jobId)}>
			{isFavorite(jobId) ? "💖" : "🤍"}
		</button>
	);
}

function JobCardApplyButton({ jobId }) {
	const [isApplied, setIsApplied] = useState(false);
	const { isLoggedIn } = useAuthStore();



	const buttonClasses = isApplied	? "button-apply-job is-applied"	: "button-apply-job";
	const buttonText = isApplied ? "Aplicado" : "Aplicar";

	const handleApplyClick = () => {
		console.log(`Aplicando al trabajo con ID: ${jobId}`);
		setIsApplied(true);
	};

	return (
		<button disabled={!isLoggedIn} className={buttonClasses} onClick={handleApplyClick}>{buttonText}</button>
	)

}

export function JobCard({ job }) {

	return (
		<article
			className="job-listing-card"
			data-modalidad={job.data.modalidad}
			data-nivel={job.data.nivel}
			data-technology={job.data.technology}
		>
			<div>
				<h3>
					<Link className={styles.title} href={`/jobs/${job.id}`}>
						{job.titulo}
					</Link>
				</h3>
				<small>
					{job.empresa} | {job.ubicacion}
				</small>
				<p>{job.descripcion}</p>
			</div>

			<div className={styles.actions}>
				<Link className={styles.details} href={`/jobs/${job.id}`}>
					Ver detalles
				</Link>
				
				<JobCardApplyButton jobId={job.id}/>

				<JobCardFavoriteButton jobId={job.id} />
			</div>
		</article>
	);
}
