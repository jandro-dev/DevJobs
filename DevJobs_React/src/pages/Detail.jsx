import { useParams } from "react-router"

export function JobDetail() {

	const { jobId } = useParams(); // Devuelve el parámetro de la ruta


	return (
		<>
			<h1>Job Detail Page</h1>
			<h2>La id es {jobId}</h2>
		</>
	);
}