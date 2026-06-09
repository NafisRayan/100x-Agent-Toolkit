#!/usr/bin/env node

/**
 * Task Breakdown Generator Driver
 * ================================
 * Reads a structured JSON input describing a feature/epic and produces a
 * professional task-breakdown CSV — the same format used in the DoItNow
 * roadmap planning sheets.
 *
 * Usage (standalone):
 *     node driver.mjs --input roadmap_item.json --output tasks.csv
 *
 * Usage (piped, for agent-driven workflows):
 *     echo '{"title":"..."}' | node driver.mjs --stdin --output tasks.csv
 *
 * Input JSON schema:
 *     {
 *       "project": "DoItNow",
 *       "phase": "Phase 1",
 *       "modules": [
 *         {
 *           "name": "Module Name",
 *           "features": [
 *             {
 *               "name": "Feature Name",
 *               "tasks": [
 *                 {
 *                   "title": "Task Title",
 *                   "details": ["bullet 1", "bullet 2"],
 *                   "estimation_days": 0.25
 *                 }
 *               ]
 *             }
 *           ]
 *         }
 *       ]
 *     }
 *
 * Output CSV columns:
 *     Module, Feature, Task Breakdown, Task Details, Estimation (Days)
 */

import { writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// ── ANSI Helpers ────────────────────────────────────────────────────────────

const bold = (t) => `\x1b[1m${t}\x1b[0m`;
const dim = (t) => `\x1b[2m${t}\x1b[0m`;
const cyan = (t) => `\x1b[36m${t}\x1b[0m`;
const green = (t) => `\x1b[32m${t}\x1b[0m`;

// ── Validation ──────────────────────────────────────────────────────────────

const REQUIRED_KEYS = new Set(["title", "details", "estimation_days"]);

function validateInput(data) {
  const errors = [];
  if (!data.modules || !Array.isArray(data.modules)) {
    errors.push("Missing or invalid 'modules' array.");
    return errors;
  }

  data.modules.forEach((mod, mi) => {
    if (!mod.name) errors.push(`Module #${mi} missing 'name'.`);
    if (!Array.isArray(mod.features)) {
      errors.push(`Module #${mi} ('${mod.name || "?"}') missing 'features' array.`);
      return;
    }
    mod.features.forEach((feat, fi) => {
      if (!feat.name) errors.push(`Module #${mi}, Feature #${fi} missing 'name'.`);
      if (!Array.isArray(feat.tasks)) {
        errors.push(`Module #${mi}, Feature #${fi} missing 'tasks' array.`);
        return;
      }
      feat.tasks.forEach((task, ti) => {
        const missing = [...REQUIRED_KEYS].filter((k) => !(k in task));
        if (missing.length) {
          errors.push(`Module #${mi}, Feature #${fi}, Task #${ti} missing keys: ${missing.join(", ")}`);
        }
        if (task.estimation_days != null && isNaN(Number(task.estimation_days))) {
          errors.push(`Module #${mi}, Feature #${fi}, Task #${ti} estimation_days is not a number.`);
        }
      });
    });
  });

  return errors;
}

// ── Flattening ──────────────────────────────────────────────────────────────

/**
 * Convert nested JSON into flat rows matching the CSV schema.
 * Repeats Module name only on the first row of each module group
 * (blank on subsequent rows) — matches the original spreadsheet style.
 */
function flattenToRows(data) {
  const rows = [];

  for (const mod of data.modules || []) {
    let firstModuleRow = true;

    for (const feat of mod.features || []) {
      let firstFeatureRow = true;

      for (const task of feat.tasks || []) {
        const bullets = Array.isArray(task.details)
          ? task.details.map((b) => `• ${b.replace(/^•\s*/, "").trim()}`).join("\n")
          : String(task.details);

        rows.push({
          Module: firstModuleRow ? mod.name : "",
          Feature: firstFeatureRow ? feat.name : "",
          "Task Breakdown": task.title || "",
          "Task Details": bullets,
          "Estimation (Days)": task.estimation_days ?? 0,
        });

        firstModuleRow = false;
        firstFeatureRow = false;
      }
    }
  }

  return rows;
}

// ── CSV Writer ──────────────────────────────────────────────────────────────

const CSV_HEADERS = ["Module", "Feature", "Task Breakdown", "Task Details", "Estimation (Days)"];

function toCsvCell(val) {
  const s = String(val ?? "");
  // Wrap in quotes if it contains comma, newline, or double-quote
  if (s.includes(",") || s.includes("\n") || s.includes('"')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function writeCsv(rows, outputPath) {
  const lines = [CSV_HEADERS.join(",")];
  for (const row of rows) {
    lines.push(CSV_HEADERS.map((h) => toCsvCell(row[h])).join(","));
  }
  const csvStr = lines.join("\n") + "\n";

  if (outputPath) {
    writeFileSync(resolve(outputPath), csvStr, "utf-8");
  }

  return csvStr;
}

// ── Summary Table ───────────────────────────────────────────────────────────

function printSummary(data, rows) {
  const project = data.project || "Project";
  const phase = data.phase || "";
  const header = phase ? `${project} — ${phase}` : project;
  const title = `${header} — Task Breakdown Summary`;

  console.log();
  console.log(bold("=".repeat(80)));
  console.log(bold(title.padStart((80 + title.length) / 2)));
  console.log(bold("=".repeat(80)));
  console.log();

  let totalDays = 0;
  const moduleTotals = {};
  const taskCounts = {};
  let currentMod = "";

  for (const row of rows) {
    if (row.Module) currentMod = row.Module;
    moduleTotals[currentMod] = (moduleTotals[currentMod] || 0) + Number(row["Estimation (Days)"] || 0);
    taskCounts[currentMod] = (taskCounts[currentMod] || 0) + 1;
    totalDays += Number(row["Estimation (Days)"] || 0);
  }

  console.log(`  ${"Module".padEnd(45)} ${"Tasks".padStart(6)} ${"Days".padStart(8)}`);
  console.log(`  ${"─".repeat(45)} ${"─".repeat(6)} ${"─".repeat(8)}`);

  for (const [mod, days] of Object.entries(moduleTotals)) {
    const count = taskCounts[mod] || 0;
    console.log(`  ${mod.padEnd(45)} ${String(count).padStart(6)} ${days.toFixed(2).padStart(8)}`);
  }

  const totalTasks = Object.values(taskCounts).reduce((a, b) => a + b, 0);
  console.log(`  ${"─".repeat(45)} ${"─".repeat(6)} ${"─".repeat(8)}`);
  console.log(`  ${"TOTAL".padEnd(45)} ${String(totalTasks).padStart(6)} ${totalDays.toFixed(2).padStart(8)}`);
  console.log();
  console.log(dim(`  Generated: ${new Date().toISOString().slice(0, 16).replace("T", " ")}`));
  console.log();
}

// ── Detail Table ────────────────────────────────────────────────────────────

function printDetailTable(rows) {
  console.log(bold("Detailed Task List"));
  console.log(bold("─".repeat(100)));
  console.log(
    `  ${cyan("#").padStart(3)}  ${bold("Task Breakdown").padEnd(45)}  ${bold("Feature").padEnd(25)}  ${bold("Days").padStart(6)}`
  );
  console.log(`  ${"─".repeat(3)}  ${"─".repeat(45)}  ${"─".repeat(25)}  ${"─".repeat(6)}`);

  let currentFeature = "";
  let idx = 0;
  for (const row of rows) {
    idx++;
    const feat = row.Feature || currentFeature;
    if (row.Feature) currentFeature = row.Feature;
    const est = Number(row["Estimation (Days)"] || 0);
    const estStr = est > 0 ? green(est.toFixed(2)) : dim("0.00");
    let title = row["Task Breakdown"];
    if (title.length > 44) title = title.slice(0, 41) + "...";
    console.log(`  ${String(idx).padStart(3)}  ${title.padEnd(45)}  ${feat.padEnd(25)}  ${estStr.padStart(6)}`);
  }
  console.log();
}

// ── CLI Args ────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = { input: null, stdin: false, output: null, summaryOnly: false, detail: false };
  for (let i = 2; i < argv.length; i++) {
    switch (argv[i]) {
      case "--input":
      case "-i":
        args.input = argv[++i];
        break;
      case "--stdin":
        args.stdin = true;
        break;
      case "--output":
      case "-o":
        args.output = argv[++i];
        break;
      case "--summary-only":
        args.summaryOnly = true;
        break;
      case "--detail":
        args.detail = true;
        break;
      case "--help":
      case "-h":
        console.log(`
Usage:
  node driver.mjs --input <file.json> [--output <tasks.csv>] [--detail]
  echo '<json>' | node driver.mjs --stdin [--output <tasks.csv>]

Options:
  -i, --input <file>     Path to input JSON file
      --stdin            Read JSON from stdin
  -o, --output <file>    Path to output CSV file
      --summary-only     Only print summary, skip CSV
      --detail           Also print detailed task table
  -h, --help             Show this help
        `);
        process.exit(0);
    }
  }

  if (!args.input && !args.stdin) {
    console.error("Error: Provide --input <file> or --stdin.");
    process.exit(1);
  }

  return args;
}

// ── Main ────────────────────────────────────────────────────────────────────

function main() {
  const args = parseArgs(process.argv);

  // ── Read input ─────────────────────────────────────────────────────────
  let raw;
  if (args.stdin) {
    const chunks = [];
    process.stdin.setEncoding("utf-8");
    // Sync read from stdin (works when piped)
    raw = readFileSync(0, "utf-8");
  } else {
    raw = readFileSync(resolve(args.input), "utf-8");
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch (exc) {
    console.error(`Error: Invalid JSON input — ${exc.message}`);
    process.exit(1);
  }

  // ── Validate ───────────────────────────────────────────────────────────
  const errors = validateInput(data);
  if (errors.length) {
    console.error("Validation errors:");
    errors.forEach((e) => console.error(`  ✗ ${e}`));
    process.exit(1);
  }

  // ── Flatten & output ───────────────────────────────────────────────────
  const rows = flattenToRows(data);

  if (args.summaryOnly) {
    printSummary(data, rows);
    if (args.detail) printDetailTable(rows);
    return;
  }

  const csvStr = writeCsv(rows, args.output);

  if (args.output) {
    console.log(green(`✓ CSV written to ${args.output}`));
  } else {
    process.stdout.write(csvStr);
  }

  printSummary(data, rows);
  if (args.detail) printDetailTable(rows);
}

main();
