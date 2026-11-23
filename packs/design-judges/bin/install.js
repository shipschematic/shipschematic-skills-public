#!/usr/bin/env node
import { cp, mkdir, readdir, readFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "skills");

const pkg = JSON.parse(await readFile(join(ROOT, "package.json"), "utf8"));
const args = process.argv.slice(2);
const has = (flag) => args.includes(flag);
const value = (flag) => {
  const i = args.indexOf(flag);
  return i === -1 ? undefined : args[i + 1];
};

const help = `
Install ${pkg.name}.

Usage:
  npx ${pkg.name}                    install into ./.agents/skills
  npx ${pkg.name} --global           install into ~/.agents/skills
  npx ${pkg.name} --claude           install into ./.claude/skills
  npx ${pkg.name} --global --claude  install into ~/.claude/skills
  npx ${pkg.name} --dest <path>      install into a custom directory

Options:
  -g, --global     user-level skill directory
  -c, --claude     Claude Code layout instead of .agents
  -f, --force      overwrite installed skills
      --only <a,b> install only the named skills
      --list       list skills in this pack
  -h, --help       show this help
`.trim();

if (has("--help") || has("-h")) {
  console.log(help);
  process.exit(0);
}

const skills = (await readdir(SRC, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && existsSync(join(SRC, entry.name, "SKILL.md")))
  .map((entry) => entry.name)
  .sort();

if (has("--list")) {
  console.log(skills.join("\n"));
  process.exit(0);
}

if (skills.length === 0) {
  console.error("No skills found. The package is incomplete.");
  process.exit(1);
}

const global = has("--global") || has("-g");
const claude = has("--claude") || has("-c");
const force = has("--force") || has("-f");

const defaultDest = global
  ? claude
    ? join(homedir(), ".claude", "skills")
    : join(homedir(), ".agents", "skills")
  : claude
    ? join(process.cwd(), ".claude", "skills")
    : join(process.cwd(), ".agents", "skills");

const dest = value("--dest") ? resolve(value("--dest")) : defaultDest;

const only = value("--only");
let selected = skills;
if (only) {
  selected = only.split(",").map((name) => name.trim()).filter(Boolean);
  const unknown = selected.filter((name) => !skills.includes(name));
  if (unknown.length > 0) {
    console.error(`Unknown skill: ${unknown.join(", ")}`);
    console.error(`Available: ${skills.join(", ")}`);
    process.exit(1);
  }
}

await mkdir(dest, { recursive: true });

const installed = [];
const skipped = [];

for (const name of selected) {
  const from = join(SRC, name);
  const to = join(dest, name);

  if (existsSync(to) && !force) {
    skipped.push(name);
    continue;
  }
  if (existsSync(to) && force) {
    await rm(to, { recursive: true, force: true });
  }

  await cp(from, to, { recursive: true });
  installed.push(name);
}

console.log(`Target: ${dest}`);
if (installed.length > 0) console.log(`Installed: ${installed.join(", ")}`);
if (skipped.length > 0) {
  console.log(`Skipped (exists): ${skipped.join(", ")}`);
  console.log("Use --force to overwrite.");
}
