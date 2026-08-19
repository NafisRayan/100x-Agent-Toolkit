#!/usr/bin/env node

import fs from 'fs';
import os from 'os';
import path from 'path';

const OMNIROUTE_URL = 'http://localhost:20128/v1/models';
const BASE_URL = 'http://localhost:20128/v1';
const PROVIDER_ID = 'omniroute';
const PROVIDER_NAME = 'OmniRoute';

const home = os.homedir();
// omp's config root is ~/.omp/agent (not ~/.pi/agent). models.json is the
// legacy format; omp still reads/merges it even though models.yml is now
// the preferred modern format. Using .json here keeps this script
// dependency-free (no YAML parser needed to merge with existing config).
const configPath = path.join(home, '.omp', 'agent', 'models.json');

async function main() {
  try {
    console.log(`Fetching models from ${OMNIROUTE_URL}...`);
    const response = await fetch(OMNIROUTE_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    const models = data.data || [];

    if (models.length === 0) {
      console.log('No models found.');
      return;
    }

    // Deduplicate by model id
    const uniqueModels = new Map();
    for (const m of models) {
      if (!uniqueModels.has(m.id)) {
        uniqueModels.set(m.id, m);
      }
    }

    console.log(`Found ${models.length} models, ${uniqueModels.size} unique.`);

    const dir = path.dirname(configPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Load existing config (if any) so we only replace the omniroute provider,
    // leaving any other providers (anthropic, openai, ollama, etc.) intact.
    let config = { providers: {} };
    if (fs.existsSync(configPath)) {
      try {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        if (!config.providers) config.providers = {};
      } catch (e) {
        console.warn(`⚠️  Existing config at ${configPath} was invalid JSON, starting fresh.`);
        config = { providers: {} };
      }
    }

    config.providers[PROVIDER_ID] = {
      name: PROVIDER_NAME,
      baseUrl: BASE_URL,
      api: 'openai-completions',
      // OmniRoute doesn't require a real key locally; keep a placeholder so
      // omp treats the models as authenticated. Override with $ENV_VAR if needed.
      apiKey: 'omniroute',
      models: [...uniqueModels.keys()].map((id) => ({
        id,
        name: id,
      })),
    };

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', 'utf8');
    console.log(`✅ Written ${uniqueModels.size} unique model(s) to ${configPath}`);
    console.log(`Run \`omp --list-models\` to see them, or use \`/model ${PROVIDER_ID}/<id>\` in the TUI.`);
    console.log('Note: if you maintain providers in ~/.omp/agent/models.yml, merge this provider block there manually — omp prefers YAML when both exist.');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();
