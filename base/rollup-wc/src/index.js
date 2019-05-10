import { h, customElement } from "@atomico/element";

function Tag({ message }) {
	return (
		<host shadowDom>
			<style>{`
				@import url("https://fonts.googleapis.com/css?family=Muli:400,900");
				:host {
					font-family: "Muli", sans-serif;
					font-size: 50px;
					text-align: center;
				}
			`}</style>
			👋 {{ customElement }} {message}
		</host>
	);
}

Tag.observables = {
	message: String
};

customElement("{{customElement}}", Tag);
