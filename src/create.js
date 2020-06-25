import https from "https";
import prompts from "prompts";
import degit from "degit";
import path from "path";

let repo = "atomicojs/base";

let branches = `https://api.github.com/repos/${repo}/branches`;

function requestJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "user-agent": "node.js" } }, (res) => {
        res.setEncoding("utf8");
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(JSON.parse(data)));
      })
      .on("error", reject);
  });
}

async function getBranchs() {
  let data = await requestJson(branches);
  return Promise.all(
    data
      .filter((data) => data.name != "master")
      .map(async (data) => {
        let pkg = await requestJson(
          `https://raw.githubusercontent.com/atomicojs/base/${data.name}/package.json`
        );
        return {
          id: data.name,
          pkg,
        };
      })
      .filter(({ pkg }) => !pkg.meta.draft)
  );
}

async function autorun() {
  let branches = await getBranchs();

  let defBranch;

  console.log("\nWelcome to Atomico, let's create your project\n");

  let fields = [
    {
      type: "text",
      name: "folder",
      initial: "./",
      message: "Project destination folder?",
    },
  ];

  if (branches.length > 1) {
    fields.push({
      type: "select",
      name: "branch",
      message: "Select the type of project",
      choices: branches
        .sort((a, b) => (a.id > b.id ? 1 : -1))
        .map(({ id, pkg }) => ({
          ...pkg.meta,
          value: id,
        })),
      initial: 0,
    });
  } else {
    defBranch = branches[0];
  }

  let isCancel;

  let data = await prompts(fields, {
    onCancel() {
      isCancel = true;
    },
  });
  if (isCancel) return;

  let message = await new Promise((resolve) => {
    let branch = defBranch || data.branch;
    let select = `github:${repo}${branch ? "#" + branch : ""}`;
    let dest = path.relative(process.cwd(), data.folder).replace(/\\/g, "/");

    const emitter = degit(select);

    emitter.on("info", (info) => {
      console.log(info.message);
    });

    emitter.clone(data.folder).then(() => {
      resolve(
        [
          "",
          `Your project has been created successfully, next steps:`,
          ...(dest
            ? [
                `1. cd ${dest}`,
                `2. npm install`,
                `3. npm start`,
                `4. Enjoy Atomico!`,
              ]
            : [`1. npm install`, `2. npm start`, `3. Enjoy Atomico!`]),
        ].join("\n")
      );
    });
  });

  console.log(message);
}

autorun();
