# npm Restore Checklist

Use this once the npm account is unsuspended. The public package is ready; CI publishing is gated until the one-time bootstrap is done.

> Releases currently go to GitHub Packages. See `RELEASING.md`. Use this checklist only to switch back to npmjs.

## Current state

- Package: `@shipschematic/design-judges`
- Version: `1.0.0`
- Registry: `https://registry.npmjs.org/`
- Status: not published; `npm view` returns `E404`
- Release workflow: ready, gated by `NPM_PUBLISH_ENABLED=false`
- CI: passing
- Branch protection: `validate` required, linear history, no force push or delete

## Prerequisites

- npm account is unsuspended.
- The account owns or can publish to the `@shipschematic` scope.
- 2FA is available for the one-time bootstrap.
- `gh` is authenticated as a repo admin.

## 1. Bootstrap the first publish

npm Trusted Publishing requires the package to exist first. This is the only manual publish.

```bash
cd /mnt/data/Liberary/ai/skills/shipschematic-skills-public

npm login
npm whoami

# Should return E404 before the bootstrap.
npm view @shipschematic/design-judges version

CONFIRM_NPM_BOOTSTRAP=1 npm run bootstrap:npm
```

The script publishes `1.0.0`, waits for registry propagation, and verifies the version. If it fails after uploading, check npm before retrying; do not publish the same version twice.

Fallback if the script cannot run:

```bash
npm publish -w @shipschematic/design-judges --access public
npm view @shipschematic/design-judges version
```

Expected output: `1.0.0`.

## 2. Bind npm to GitHub Actions

```bash
npm trust github @shipschematic/design-judges \
  --file release.yml \
  --repository shipschematic/shipschematic-skills-public \
  --allow-publish -y

npm trust list @shipschematic/design-judges
```

The repository and workflow filename must match exactly.

## 3. Enable CI publishing

```bash
gh variable set NPM_PUBLISH_ENABLED --body true
gh variable list
```

Optional smoke test:

```bash
gh workflow run release.yml --ref main
gh run list --workflow release.yml --limit 1
```

With no pending changesets, the run should complete without publishing a new version.

## 4. Normal releases

```bash
npx changeset
```

1. Commit the changeset on a branch.
2. Open a pull request and wait for `validate`.
3. Merge the pull request.
4. Merge the `Version Packages` pull request opened by the bot.
5. The Release workflow validates, publishes with provenance, creates the tag and GitHub release, and verifies npm.

## Do not

- Do not set `NPM_PUBLISH_ENABLED=true` before the bootstrap. The workflow will try to publish `1.0.0` without a trusted publisher.
- Do not run `npm publish` after the bootstrap. Use Changesets.
- Do not retry a `403 suspended` response in a loop. Wait for npm support.
- Do not commit npm tokens or `.npmrc` auth lines.

## Verification

```bash
npm view @shipschematic/design-judges version
npm view @shipschematic/design-judges dist-tags
```

Check:

- npm package page: `https://www.npmjs.com/package/@shipschematic/design-judges`
- Provenance badge on the published version
- GitHub tag `@shipschematic/design-judges@1.0.0` or the version published by Changesets
- GitHub release created by the Release workflow

## Troubleshooting

| Symptom | Action |
|---|---|
| `403 suspended` | npm account is still suspended. Wait for npm support. |
| `EOTP` or 2FA prompt | Complete the npm login or enter the OTP for the bootstrap. |
| `E404` right after publish | Registry propagation lag. Wait up to 30 seconds and recheck. |
| `version already exists` | Do not reuse the version. Add a changeset and let Changesets bump it. |
| `403 trusted publisher` | Re-run `npm trust github` and verify repo, workflow, and package name. |
| Release job skipped | `NPM_PUBLISH_ENABLED` is not `true`. |
