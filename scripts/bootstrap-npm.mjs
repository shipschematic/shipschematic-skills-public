#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const checkOnly = args.includes("--check");
const packName = args.find((arg) => !arg.startsWith("--")) ?? "design-judges";
const pkg = JSON.parse(
  readFileSync(resolve(ROOT, "packs", packName, "package.json"), "utf8"),
);
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const spec = `${pkg.name}@${pkg.version}`;
const REGISTRY = "https://registry.npmjs.org/";

function npmView() {
  try {
    return execFileSync(npm, ["view", spec, "version", "--registry", REGISTRY], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

if (!checkOnly && process.env.CONFIRM_NPM_BOOTSTRAP !== "1") {
  console.error(`Refusing to publish ${spec} without CONFIRM_NPM_BOOTSTRAP=1.`);
  console.error("This is the one-time npm bootstrap. Run with:");
  console.error(`  CONFIRM_NPM_BOOTSTRAP=1 npm run bootstrap:npm`);
  process.exit(1);
}

const existing = npmView();
if (existing === pkg.version) {
  console.log(`${spec} already exists on npm. Nothing to bootstrap.`);
  process.exit(0);
}
if (existing) {
  console.error(`npm reports ${existing} for ${spec}; expected ${pkg.version}.`);
  process.exit(1);
}

if (checkOnly) {
  console.log(`${spec} is not on npm and is ready for the one-time bootstrap.`);
  process.exit(0);
}

console.log(`Publishing ${spec} once to ${REGISTRY}.`);
execFileSync(
  npm,
  [
    "publish",
    "-w",
    pkg.name,
    "--access",
    "public",
    "--registry",
    REGISTRY,
  ],
  { cwd: ROOT, stdio: "inherit" },
);

let published = "";
for (let attempt = 0; attempt < 6; attempt += 1) {
  published = npmView();
  if (published === pkg.version) break;
  await new Promise((resolveDelay) => setTimeout(resolveDelay, 5000));
}

if (published !== pkg.version) {
  console.error(`Verification failed: npm reports "${published}", expected ${pkg.version}.`);
  process.exit(1);
}

console.log(`Published and verified ${spec}.`);
console.log("Next, bind npm to GitHub Actions:");
console.log(
  `  npm trust github ${pkg.name} --file release.yml --repository shipschematic/shipschematic-skills-public --allow-publish -y`,
);
console.log("Then enable the release workflow:");
console.log("  gh variable set NPM_PUBLISH_ENABLED --body true");
