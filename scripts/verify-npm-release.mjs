import { execFileSync } from "node:child_process";

const raw = process.env.PUBLISHED_PACKAGES;
if (!raw || raw === "[]") {
  console.log("No packages published.");
  process.exit(0);
}

const packages = JSON.parse(raw);
for (const pkg of packages) {
  const spec = `${pkg.name}@${pkg.version}`;
  let actual = "";

  for (let attempt = 0; attempt < 6; attempt += 1) {
    try {
      actual = execFileSync("npm", ["view", spec, "version"], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
    } catch {
      actual = "";
    }
    if (actual === pkg.version) break;
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 5000));
  }

  if (actual !== pkg.version) {
    console.error(`${spec}: npm reports "${actual}", expected ${pkg.version}.`);
    process.exit(1);
  }
  console.log(`verified ${spec}`);
}
