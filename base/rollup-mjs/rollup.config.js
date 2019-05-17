import pkg from "./package.json";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import sucrase from "rollup-plugin-sucrase";
import del from "rollup-plugin-delete";
import importCss from "@atomico/rollup-plugin-import-css";
import browsersync from "rollup-plugin-browsersync";
import workbox from "@atomico/rollup-plugin-workbox";

let publicDir = pkg.output.replace(/\/[^\/]+$/, "");

let plugins = [
	del({
		targets: [pkg.output]
	}),
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
	workbox({
		globDirectory: publicDir,
		globPatterns: ["index.html", "**/*.{js,css}"],
		swDest: publicDir + "/sw.js",
		navigateFallback: "index.html"
	})
];

if (process.env.ROLLUP_WATCH) {
	plugins.push(browsersync({ single: true, server: publicDir }));
} else {
	process.env.BUILD = "production";
	plugins.push(terser());
}

export default {
	input: pkg.source,
	output: [
		{
			dir: pkg.output,
			format: "esm",
			sourcemap: true
		}
	],
	plugins
};
