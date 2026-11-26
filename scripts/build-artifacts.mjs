import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const packsDir = join(root, "packs");
const artifactsDir = join(root, "artifacts");

rmSync(artifactsDir, { recursive: true, force: true });
mkdirSync(artifactsDir, { recursive: true });

const packs = readdirSync(packsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .sort((a, b) => a.name.localeCompare(b.name));

const manifest = [];

for (const pack of packs) {
  const dir = join(packsDir, pack.name);
  const pkgPath = join(dir, "package.json");
  let pkg;
  try {
    pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  } catch {
    continue;
  }
  if (pkg.private === true) continue;

  const out = execFileSync(
    "npm",
    ["pack", "--json", "--pack-destination", artifactsDir],
    { cwd: dir, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
  );
  const info = JSON.parse(out);
  const entry = Array.isArray(info)
    ? info[0]
    : info && typeof info === "object" && info[pkg.name]
      ? info[pkg.name]
      : info;
  manifest.push({
    name: pkg.name,
    version: pkg.version,
    dir: `packs/${pack.name}`,
    file: entry.filename,
    shasum: entry.shasum,
    integrity: entry.integrity,
  });
  console.log(`packed ${pkg.name}@${pkg.version} -> artifacts/${entry.filename}`);
}

manifest.sort((a, b) => a.name.localeCompare(b.name));
writeFileSync(join(artifactsDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`wrote artifacts/manifest.json (${manifest.length} packages)`);
