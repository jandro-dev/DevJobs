
export function Link({ href, children, ...props}) {

	const handleClick = (event) => {
		event.preventDefault()

		window.history.pushState({}, "", href) // Cambia la URL sin recargar la pagina
		window.dispatchEvent(new PopStateEvent("popstate")) // Dispara el evento para que App.jsx detecte el cambio de URL
	}

	return (
		<a href={href} {...props} onClick={handleClick}>
			{children}
		</a>
	)
}