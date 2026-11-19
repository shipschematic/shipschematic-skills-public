import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const packsDir = join(root, "packs");

const packs = (await readdir(packsDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .sort((a, b) => a.name.localeCompare(b.name));

for (const pack of packs) {
  const dir = join(packsDir, pack.name);
  if (!existsSync(join(dir, "package.json"))) continue;

  const pkg = JSON.parse(await readFile(join(dir, "package.json"), "utf8"));
  const skillsDir = join(dir, "skills");
  const skills = (await readdir(skillsDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && existsSync(join(skillsDir, entry.name, "SKILL.md")))
    .map((entry) => entry.name)
    .sort();

  console.log(`${pack.name}: ${pkg.name}@${pkg.version}`);
  for (const skill of skills) console.log(`  ${skill}`);
}
