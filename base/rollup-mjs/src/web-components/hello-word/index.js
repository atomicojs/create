import { h, customElement } from "atomico";
import style from "./style.css";
import Logo from "./logo";

function HelloWord({ show }) {
	return (
		<host shadowDom>
			<style>{style}</style>
			<Logo color="white" />
			<h1>Hello Atomico</h1>
			<p>Start editing to see some magic happen!</p>
			<a href="https://github.com/atomicojs/atomico" target="_blank">
				Documentation
			</a>
		</host>
	);
}

HelloWord.observables = { show: Boolean };

export default customElement("hello-word", HelloWord);
