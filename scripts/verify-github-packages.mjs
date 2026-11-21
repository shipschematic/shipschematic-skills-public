#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY = "https://npm.pkg.github.com";
const pkg = JSON.parse(
  readFileSync(resolve(ROOT, "packs", "design-judges", "package.json"), "utf8"),
);
const spec = `${pkg.name}@${pkg.version}`;

let actual = "";
for (let attempt = 0; attempt < 6; attempt += 1) {
  try {
    actual = execFileSync(
      "npm",
      ["view", spec, "version", "--registry", REGISTRY],
      { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
  } catch {
    actual = "";
  }
  if (actual === pkg.version) break;
  await new Promise((resolveDelay) => setTimeout(resolveDelay, 5000));
}

if (actual !== pkg.version) {
  console.error(
    `${spec}: ${REGISTRY} reports "${actual}", expected ${pkg.version}.`,
  );
  process.exit(1);
}

console.log(`verified ${spec} on ${REGISTRY}`);
