import { useState } from "@atomico/core";
import { h, customElement } from "@atomico/element";
import style from "./style.css";

function WcEmoji({ show }) {
	let [state, setState] = useState(show);
	return (
		<host shadowDom>
			<style>{style}</style>
			<button onClick={() => setState(!state)}>toggle</button>
			<h1>{state && "😃"}</h1>
		</host>
	);
}

WcEmoji.observables = { show: Boolean };

export default customElement("wc-emoji", WcEmoji);
