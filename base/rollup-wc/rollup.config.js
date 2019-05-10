import pkg from "./package.json";
import del from "rollup-plugin-delete";
import size from "rollup-plugin-bundle-size";
import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import sucrase from "rollup-plugin-sucrase";
import postcss from "rollup-plugin-postcss";
import browsersync from "rollup-plugin-browsersync";

let IS_DEV = process.env.ROLLUP_WATCH;

let globals = {
	"@atomico/core": "@atomico/core",
	"@atomico/element": "@atomico/element"
};

let share = [
	postcss({
		minimize: true
	}),
	sucrase({
		production: true,
		exclude: ["node_modules/**"],
		jsxPragma: "h",
		transforms: ["typescript", "jsx"]
	})
];

let plugins = {
	dev: [
		del({
			targets: ["dist"]
		}),
		resolve({
			extensions: [".js", ".ts"]
		}),
		terser(),
		...share,
		...(IS_DEV ? [browsersync(), size()] : [size()])
	],
	build: [...share, size()]
};

let bundles = [
	{
		input: pkg.source,
		output: [
			{
				file: "dist/" + pkg.module,
				format: "esm",
				sourcemap: true,
				globals
			}
		],
		plugins: plugins.dev
	}
];

if (!IS_DEV) {
	bundles.push({
		input: pkg.source,
		output: [
			{
				file: pkg.module,
				format: "esm",
				sourcemap: true,
				globals
			}
		],
		plugins: plugins.build
	});
}

export default bundles;
