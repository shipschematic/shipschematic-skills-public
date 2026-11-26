import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(root, "artifacts", "manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

function published(name, version) {
  try {
    const out = execFileSync("npm", ["view", `${name}@${version}`, "version", "--registry", "https://registry.npmjs.org/"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out === version;
  } catch {
    return false;
  }
}

const unpublished = manifest.filter((pkg) => !published(pkg.name, pkg.version));

if (unpublished.length === 0) {
  console.log("No unpublished packages.");
  process.exit(0);
}

const publishedPkgs = [];
for (const pkg of unpublished) {
  const tarball = join(root, "artifacts", pkg.file);
  console.log(`publishing ${pkg.name}@${pkg.version} from ${pkg.file}`);
  execFileSync("npm", ["publish", tarball, "--provenance", "--access", "public"], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env },
  });
  publishedPkgs.push({ name: pkg.name, version: pkg.version });
}

process.stdout.write(JSON.stringify(publishedPkgs));
