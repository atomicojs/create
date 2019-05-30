#!/usr/bin/env node

const { template } = require("template-folder");
const prompts = require("prompts");
const path = require("path");
const child_process = require("child_process");

const bundle = {
	app: "rollup-mjs"
};

function exec(cmd) {
	return new Promise((resolve, reject) => {
		child_process.exec(cmd, err => {
			if (err) reject(err);
			else resolve();
		});
	});
}

async function autorun() {
	let exit;
	let onCancel = () => console.log(":::cancel:::");

	console.log("\nWelcome to Atomico, let's create your project\n");

	let data = await prompts(
		[
			{
				type: "text",
				name: "name",
				message: "name?"
			},
			{
				type: "text",
				name: "description",
				message: "description?"
			}
		],
		{ onCancel }
	);

	let base = path.resolve(__dirname, "base/" + bundle.app);

	let dist = path.resolve(process.cwd(), data.name);

	await template(base, dist, data);

	console.log(
		[
			"",
			`Ready!, check the folder ./${data.name} and ./${data.name}/README.md`,
			"",
			"Next step, commands!",
			"",
			`  cd ${data.name}`,
			"  yarn | npm i"
		].join("\n")
	);
}

autorun();
