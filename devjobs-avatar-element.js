class DevJobsAvatar extends HTMLElement {
	constructor() {
		super();
		// Encapsula el componente para que no le afecte los estilos globales
		this.attachShadow({ mode: "open" });
	}

	createURL(service, username) {
		return `https://unavatar.io/${service}/${username}`;
	}

	render() {

		const service = this.getAttribute("service") ?? "github";
		const username = this.getAttribute("username") ?? "midudev";
		const size = this.getAttribute("size") ?? "40";

		const url = this.createURL(service, username);	

		this.shadowRoot.innerHTML = `
			<style>
				img {
					width: ${size}px;
					height: ${size}px;
					border-radius: 50%px;
				}
			</style>

    	<img
				src="${url}"
				alt="Avatar de ${username}s"
				class="avatar"
			/>
		`;
	}

	// Llama al render cuando el componente se agrega al DOM
	connectedCallback() {
		this.render();
	}
}

// Registra el web component
customElements.define("devjobs-avatar", DevJobsAvatar);