import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const packsDir = join(root, "packs");
const dryRun = process.env.DRY_RUN === "1";

function capture(command, args) {
  return execFileSync(command, args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function run(command, args, env = process.env) {
  execFileSync(command, args, {
    cwd: root,
    stdio: "inherit",
    env,
  });
}

function ghEnv() {
  const env = { ...process.env };
  if (process.env.GITHUB_TOKEN && !env.GH_TOKEN) {
    env.GH_TOKEN = process.env.GITHUB_TOKEN;
  }
  return env;
}

function readPackages() {
  return readdirSync(packsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const packageJsonPath = join(packsDir, entry.name, "package.json");
      const pkg = JSON.parse(readFileSync(packageJsonPath, "utf8"));
      return {
        name: pkg.name,
        version: pkg.version,
        private: pkg.private === true,
        packageJsonPath,
      };
    })
    .filter((pkg) => pkg.name && pkg.version && !pkg.private);
}

function localTagExists(tag) {
  try {
    capture("git", ["rev-parse", "--verify", `refs/tags/${tag}`]);
    return true;
  } catch {
    return false;
  }
}

function remoteTagExists(tag) {
  return (
    capture("git", [
      "ls-remote",
      "--tags",
      "origin",
      `refs/tags/${tag}`,
    ]).length > 0
  );
}

function releaseExists(tag) {
  try {
    capture("gh", ["release", "view", tag, "--json", "tagName"]);
    return true;
  } catch (error) {
    if (error.status === 1) return false;
    throw error;
  }
}

function tagTarget(pkg) {
  const packageJsonPath = relative(root, pkg.packageJsonPath);
  const commit = capture("git", [
    "log",
    "-1",
    "--format=%H",
    "--",
    packageJsonPath,
  ]);
  if (!commit) {
    throw new Error(`No commit found for ${packageJsonPath}.`);
  }
  return commit;
}

function ensureTag(tag, target) {
  if (remoteTagExists(tag)) return false;
  const repo = process.env.GITHUB_REPOSITORY ?? capture("gh", ["repo", "view", "--json", "nameWithOwner", "-q", ".nameWithOwner"]);
  run("gh", ["api", "-X", "POST", `repos/${repo}/git/refs`, "-f", `ref=refs/tags/${tag}`, "-f", `sha=${target}`]);
  return true;
}

function ensureRelease(tag) {
  if (releaseExists(tag)) return false;
  run(
    "gh",
    [
      "release",
      "create",
      tag,
      "--verify-tag",
      "--title",
      tag,
      "--generate-notes",
    ],
    ghEnv(),
  );
  return true;
}

const packages = readPackages();
if (packages.length === 0) {
  console.log("No publishable packages found.");
  process.exit(0);
}

const versions = new Map();
for (const pkg of packages) {
  const owner = versions.get(pkg.version);
  if (owner && owner !== pkg.name) {
    throw new Error(
      `Packages ${owner} and ${pkg.name} share version ${pkg.version}. ` +
        "The v<version> tag would be ambiguous.",
    );
  }
  versions.set(pkg.version, pkg.name);
}

execFileSync(
  process.execPath,
  [join(root, "scripts", "verify-npm-release.mjs")],
  {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      PUBLISHED_PACKAGES: JSON.stringify(
        packages.map((pkg) => ({ name: pkg.name, version: pkg.version })),
      ),
    },
  },
);

for (const pkg of packages) {
  const tag = `v${pkg.version}`;
  const target = tagTarget(pkg);

  if (dryRun) {
    console.log(
      `[dry-run] ${pkg.name}@${pkg.version}: tag ${tag} at ${target}, release ${tag}`,
    );
    continue;
  }

  const tagCreated = ensureTag(tag, target);
  const releaseCreated = ensureRelease(tag);
  console.log(
    `${pkg.name}@${pkg.version}: tag ${tag} ${tagCreated ? "created" : "exists"}; ` +
      `release ${releaseCreated ? "created" : "exists"}`,
  );
}
