import { h, useEffect } from "atomico";
import style from "./style.css";

export default function Home({ children }) {
	useEffect(() => {
		console.log("page mounted");
	}, []);
	return (
		<section shadowDom>
			<style>{style}</style>
			{children}
		</section>
	);
}
