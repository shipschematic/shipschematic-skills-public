import { chmod, copyFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const source = join(root, "scripts", "install.js");
const packs = join(root, "packs");

const entries = await readdir(packs, { withFileTypes: true });
const packsFound = entries.filter((entry) => entry.isDirectory());

for (const pack of packsFound) {
  const target = join(packs, pack.name, "bin", "install.js");
  await copyFile(source, target);
  await chmod(target, 0o755);
  console.log(`synced ${pack.name}/bin/install.js`);
}

if (packsFound.length === 0) {
  console.error("No packs found.");
  process.exit(1);
}
