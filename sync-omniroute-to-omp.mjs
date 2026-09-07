#!/usr/bin/env node

import fs from "fs";
import os from "os";
import path from "path";

const HOME = os.homedir();
const CONFIG_DIR = path.join(HOME, ".omp", "agent");
const CONFIG_PATH = path.join(CONFIG_DIR, "models.yml");

const PROVIDER_BLOCK = `providers:
  omniroute:
    baseUrl: http://localhost:20128/v1
    auth: apiKey
    apiKey: sk-123
    api: openai-responses
    discovery:
      type: openai-models-list

`;

function main() {
    if (!fs.existsSync(CONFIG_DIR)) {
        fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }

    fs.writeFileSync(CONFIG_PATH, PROVIDER_BLOCK, "utf8");
    console.log(`✅ Written omniroute provider config to ${CONFIG_PATH}`);
    console.log(
        "Run `omp --list-models` to verify, or use `/model omniroute/<id>` in the TUI.",
    );
}

main();
