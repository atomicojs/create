import pack from "@atomico/rollup-pack";
import babel from "rollup-plugin-babel";
import importCss from "@atomico/rollup-plugin-import-css";
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
// import workbox from "@atomico/rollup-plugin-workbox";

export default pack("*.html", {
	plugins: [
		babel(),
		importCss(),
		serve('dist'),
		livereload('dist')
		// workbox({
		// 	globDirectory: "./dist",
		// 	globPatterns: ["index.html", "**/*.{js,css}"],
		// 	swDest: "./dist/sw.js",
		// 	navigateFallback: "index.html"
		// })
	]
});
