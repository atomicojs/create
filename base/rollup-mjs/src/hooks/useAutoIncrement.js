import { useEffect, useState } from "atomico";

export default function useAutoIncrement(ms = 1000) {
	let [state, setState] = useState(0);
	useEffect(() => {
		console.log("hook");
		let interval = setInterval(() => setState(state => state + 1), ms);
		return () => clearInterval(interval);
	}, []);
	return state;
}
