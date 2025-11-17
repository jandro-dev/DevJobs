import { useRouter } from "../hooks/useRouter";

export function Link({ href, children, className = "", ...props }) {
	const { currentPath, navigateTo } = useRouter();

	const handleClick = (event) => {
		event.preventDefault();
		navigateTo(href);
	};

	// Determinar si el link está activo
	const isActive = currentPath === href;
	const combinedClassName = `${className} ${isActive ? "isActive" : ""}`.trim();

	return (
		<a
			href={href}
			{...props}
			className={combinedClassName}
			onClick={handleClick}
		>
			{children}
		</a>
	);
}
