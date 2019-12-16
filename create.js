#!/usr/bin/env node
let https = require("https");
let prompts = require("prompts");
let download = require("download-git-repo");

let repo = "atomicojs/base";

let branches = `https://api.github.com/repos/${repo}/branches`;

function getBranchs() {
  return new Promise((resolve, reject) => {
    https
      .get(branches, { headers: { "user-agent": "node.js" } }, res => {
        res.setEncoding("utf8");
        let data = "";
        res.on("data", chunk => (data += chunk));
        res.on("end", () =>
          resolve(
            JSON.parse(data)
              .filter(data => data.name != "master")
              .map(data => data.name)
          )
        );
      })
      .on("error", reject);
  });
}

async function autorun() {
  let branches = await getBranchs();

  console.log("\nWelcome to Atomico, let's create your project\n");

  let fields = [
    {
      type: "text",
      name: "folder",
      message: "Project destination folder?"
    },
    {
      type: "select",
      name: "branch",
      message: "Select the type of project",
      choices: branches.map(branch => ({
        title: branch
          .replace(/-+/g, " ")
          .replace(/^(\w)/, all => all.toUpperCase()),
        value: branch
      })),
      initial: 0
    }
  ];
  let isCancel;
  let data = await prompts(fields, {
    onCancel() {
      isCancel = true;
    }
  });
  if (isCancel) return;

  let message = await new Promise(resolve => {
    let select = `${repo}#${data.branch}`;
    download(select, data.folder, err => {
      if (err) resolve(`error downloading branch ${select}`);
      resolve(
        [
          "",
          `Your project has been created successfully, next steps:`,
          `1. cd ./${data.folder}`,
          `2. npm install`,
          `3. npm run dev`,
          `4. Enjoy Atomico!`
        ].join("\n")
      );
    });
  });

  console.log(message);
}

autorun();
