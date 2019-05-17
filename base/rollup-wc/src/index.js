import { h, customElement } from "@atomico/element";
import style from "./style.css";

function Tag({ message }) {
	return (
		<host shadowDom>
			<style>{style}</style>
			👋 {{ customElement }} {message}
		</host>
	);
}

Tag.observables = {
	message: String
};

customElement("{{customElement}}", Tag);
