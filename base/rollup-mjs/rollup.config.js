import pack from "@atomico/rollup-pack";
import babel from "rollup-plugin-babel";
import importCss from "@atomico/rollup-plugin-import-css";
// import workbox from "@atomico/rollup-plugin-workbox";

export default pack("*.html", {
	plugins: [
		babel(),
		importCss()
		// workbox({
		// 	globDirectory: "./dist",
		// 	globPatterns: ["index.html", "**/*.{js,css}"],
		// 	swDest: "./dist/sw.js",
		// 	navigateFallback: "index.html"
		// })
	]
});
