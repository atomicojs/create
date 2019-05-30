import inputHTML from "@atomico/rollup-plugin-input-html";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import sucrase from "rollup-plugin-sucrase";
import serve from "rollup-plugin-serve";
import importCss from "@atomico/rollup-plugin-import-css";
import workbox from "@atomico/rollup-plugin-workbox";
import sizes from "@atomico/rollup-plugin-sizes";

let plugins = [
	inputHTML(),
	resolve({
		extensions: [".js", ".ts"]
	}),
	importCss(),
	sucrase({
		production: true,
		exclude: ["node_modules/**"],
		jsxPragma: "h",
		transforms: ["typescript", "jsx"]
	}),
	terser()
];

if (process.env.ROLLUP_WATCH) {
	plugins.push(
		serve({
			open: true,
			contentBase: "dist",
			historyApiFallback: true
		})
	);
} else {
	plugins.push(
		workbox({
			globDirectory: "./dist",
			globPatterns: ["index.html", "**/*.{js,css}"],
			swDest: "./dist/sw.js",
			navigateFallback: "index.html"
		})
	);
}

plugins.push(sizes());

export default {
	input: "*.html",
	output: {
		dir: "dist",
		format: "esm",
		sourcemap: true
	},
	plugins,
	onwarn(message) {
		if (/Circular dependency/gi.test(message)) return;
		console.error(message);
	}
};
