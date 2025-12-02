import { Link as NavLink } from "react-router";

// Patron de abstraccion de dependencia de enrutamiento
export function Link({ href, children, ...props }) {

	return (
		<NavLink
			to={href}
			{...props}
		>
			{children}
		</NavLink>
	);
}
