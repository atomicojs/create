#!/usr/bin/env node

import create from "./src/create.mjs";

create(process.argv.includes("--show-draft"));
