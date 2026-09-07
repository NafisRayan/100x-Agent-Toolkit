#!/usr/bin/env node

import fs from "fs";
import os from "os";
import path from "path";
import { execSync } from "child_process";
const HOME = os.homedir();
const CONFIG_DIR = path.join(HOME, ".omp", "agent");
const CONFIG_PATH = path.join(CONFIG_DIR, "models.yml");

const API_KEY = "roxy";

const pythonScript = `
import sqlite3, os, datetime, uuid
db_path = os.path.expanduser('~/.omniroute/storage.sqlite')
db = sqlite3.connect(db_path)
db.execute('''
    INSERT INTO api_keys (
        id, name, key, no_log, created_at, auto_resolve, is_active,
        allowed_combos, scopes, allowed_connections, allowed_quotas
    )
    VALUES (
        ?, 'auto-generated', '${API_KEY}', 0, ?, 0, 1,
        '["combo/*"]', '["self:usage"]', '[]', '[]'
    )
    ON CONFLICT(key) DO UPDATE SET
        allowed_combos='["combo/*"]',
        scopes='["self:usage"]',
        allowed_connections='[]',
        allowed_quotas='[]'
''', (str(uuid.uuid4()), datetime.datetime.now(datetime.timezone.utc).isoformat()))
db.commit()
`;

try {
    // Pass smoothly formatted multi-line Python script directly via stdin
    execSync("python -", {
        input: pythonScript,
        stdio: ["pipe", "ignore", "ignore"],
    });
    console.log(`ℹ️ Synced API_KEY '${API_KEY}' to OmniRoute database.`);
} catch (e) {
    console.warn(
        "⚠️ Warning: Could not auto-provision key in omniroute database.",
    );
}

const PROVIDER_BLOCK = `providers:
  omniroute:
    baseUrl: http://localhost:20128/v1
    auth: apiKey
    apiKey: ${API_KEY}
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
        "Run \`omp models omniroute\` to verify, or use \`/model omniroute/<id>\` in the TUI.",
    );
    console.log("API KEY =", API_KEY);
}

main();
