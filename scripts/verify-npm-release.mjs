import { execFileSync } from "node:child_process";

const REGISTRY = "https://registry.npmjs.org/";
const parsedAttempts = Number.parseInt(process.env.NPM_VERIFY_ATTEMPTS ?? "60", 10);
const ATTEMPTS =
  Number.isFinite(parsedAttempts) && parsedAttempts > 0 ? parsedAttempts : 60;
const DELAY_MS = 5000;
const sleep = (ms) => new Promise((resolveDelay) => setTimeout(resolveDelay, ms));

const raw = process.env.PUBLISHED_PACKAGES;
if (!raw || raw === "[]") {
  console.log("No packages published.");
  process.exit(0);
}

const packages = JSON.parse(raw);
for (const pkg of packages) {
  const spec = `${pkg.name}@${pkg.version}`;
  let actual = "";

  for (let attempt = 0; attempt < ATTEMPTS; attempt += 1) {
    try {
      actual = execFileSync("npm", ["view", spec, "version", "--registry", REGISTRY], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
    } catch {
      actual = "";
    }
    if (actual === pkg.version) break;
    if (attempt === 0 || (attempt + 1) % 12 === 0) {
      console.log(`waiting for ${spec} metadata (attempt ${attempt + 1}/${ATTEMPTS})`);
    }
    await sleep(DELAY_MS);
  }

  if (actual !== pkg.version) {
    console.error(`${spec}: npm reports "${actual}", expected ${pkg.version}.`);
    process.exit(1);
  }

  let tarball = "";
  try {
    tarball = execFileSync(
      "npm",
      ["view", spec, "dist.tarball", "--registry", REGISTRY],
      {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      },
    ).trim();
  } catch {
    tarball = "";
  }

  let tarballOk = false;
  for (let attempt = 0; attempt < ATTEMPTS && tarball; attempt += 1) {
    try {
      const response = await fetch(tarball, { method: "HEAD", redirect: "follow" });
      if (response.ok) {
        tarballOk = true;
        break;
      }
    } catch {
      // Retry until the registry propagates the tarball.
    }
    if (attempt === 0 || (attempt + 1) % 12 === 0) {
      console.log(`waiting for ${spec} tarball (attempt ${attempt + 1}/${ATTEMPTS})`);
    }
    await sleep(DELAY_MS);
  }

  if (!tarballOk) {
    console.error(`${spec}: tarball is not available at ${tarball || "unknown URL"}.`);
    process.exit(1);
  }

  console.log(`verified ${spec} and tarball`);
}
