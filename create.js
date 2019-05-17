#!/usr/bin/env node

const { template } = require("template-folder");
const prompts = require("prompts");
const path = require("path");

const bundle = {
	wc: "rollup-wc",
	app: "rollup-mjs"
};

let dependencies = {
	app: `{
		"@atomico/core": "^1.5.x",
		"@atomico/router": "^0.1.x",
		"@atomico/element": "^0.6.x"
	}`,
	wc: `{
		"@atomico/core": "^1.5.x",
		"@atomico/element": "^0.6.x"
	}`
};

async function autorun() {
	let exit;
	let onCancel = () => {
		exit = true;
		console.log(":::cancel:::");
	};
	console.log("\nWelcome to Atomico\n");

	let data = await prompts([
		{
			type: "select",
			name: "bundle",
			message: "Project Type",
			choices: [
				{ title: "Create application", value: bundle.app },
				{ title: "Create web component", value: bundle.wc },
				{
					title: "Exit",
					value: "exit"
				}
			]
		}
	]);

	if (data.bundle == "exit") {
		onCancel();
		return;
	}

	data.dependencies = dependencies[data.bundle == bundle.app ? "app" : "wc"];

	let packageFields = [
		{
			type: "text",
			name: "name",
			message: "Package name :",
			validate(value) {
				if (/^[\w\-\/\@]+$/g.test(value)) {
					return true;
				} else {
					return "name of package invalid";
				}
			}
		},
		{
			type: "text",
			name: "description",
			message: "Package description :"
		}
	];

	if (data.bundle == bundle.wc) {
		packageFields.push(
			{
				type: "text",
				name: "author",
				message: "Package author :"
			},
			{
				type: "text",
				name: "customElement",
				message: "custom element name:",
				validate(value) {
					if (/\w+(-){1}\w+/g.test(value)) {
						return true;
					} else {
						return "The name of the custom Element must comply with the standard format";
					}
				}
			}
		);
	}

	data = { ...data, ...(await prompts(packageFields, { onCancel })) };

	if (exit) return;

	let base = path.resolve(__dirname, "base/" + data.bundle);
	let dist = path.resolve(process.cwd(), data.name);

	await template(base, dist, data);

	console.log(`\nReady!, check the folder ${data.name}\n`);
}

autorun();
