# Release

## Flow

`code change -> local feedback loop -> CI -> immutable artifact -> CD publish -> smoke`

## Local feedback loop

Run before commit/push. Pre-commit hook runs the same command.

```bash
npm run check
```

## CI

`.github/workflows/ci.yml` runs on pull requests and pushes to `main`:

```bash
npm ci
npm run check
```

## Immutable artifact

`.github/workflows/release.yml` builds tarballs once:

```bash
npm run build:artifacts
```

Artifacts are uploaded as workflow artifacts and published from those files. No rebuild at publish time.

## CD publish

Publish runs as a separate job only when no `.changeset/*.md` files exist. It uses GitHub OIDC trusted publishing (`id-token: write`, `NPM_CONFIG_PROVENANCE=true`). No long-lived npm token.

Version PR mode: when changesets exist, Release opens/updates the Version Packages PR instead of publishing.

## Smoke

`post-release` verifies npm metadata and tarball availability, then creates tags and GitHub releases.

```bash
npm run post-release
```

## Rollback

npm versions are immutable. Roll back by deprecating the bad version and publishing a patch.

```bash
npm deprecate @shipschematic/<pkg>@<version> "Broken release. Use <fixed-version>."
# fix, changeset or patch version, merge, release
```

Do not unpublish unless npm policy allows it and you understand the impact.
