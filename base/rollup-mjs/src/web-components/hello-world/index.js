import { h, customElement } from "atomico";
import style from "./style.css";
import Logo from "./logo";

function Hello({ show }) {
	return (
		<host shadowDom>
			<style>{style}</style>
			<Logo color="white" />
			<h1>Hello Atomico</h1>
			<p>Start editing to see some magic happen!</p>
			{ show && <p>Now you can see me!</p> }
			<a href="https://github.com/atomicojs/atomico" target="_blank">
				Documentation
			</a>
		</host>
	);
}

Hello.props = { show: Boolean };

export default customElement("hello-world", Hello);
