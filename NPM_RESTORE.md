# npm Restore Checklist

Use this once the npm account is clear to publish. The public package is ready; npmjs CI publishing is not wired yet.

> Releases currently go to GitHub Packages. See `RELEASING.md`. Use this checklist only for the one-time npmjs bootstrap.

## Current state

- Package: `@shipschematic/design-judges`
- Version: `1.0.0`
- Bootstrap target: `https://registry.npmjs.org/`
- Package `publishConfig.registry`: GitHub Packages. npmjs requires an explicit `--registry` override.
- Status: not published to npmjs; `npm view` returns `E404`
- Existing release: `1.0.0` is already on GitHub Packages. The bootstrap publishes the same version to npmjs.
- Release workflow: GitHub Packages only. It does not publish to npmjs yet.
- CI: passing
- Branch protection: `validate` required, linear history, no force push or delete

## Prerequisites

- npm account is clear, and at least 24 hours have passed since the last security-sensitive account change.
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
npm view @shipschematic/design-judges version --registry=https://registry.npmjs.org/

CONFIRM_NPM_BOOTSTRAP=1 npm run bootstrap:npm
```

The script publishes `1.0.0` to npmjs, waits for registry propagation, and verifies the version. If it fails after uploading, check npm before retrying; do not publish the same version twice.

Fallback if the script cannot run:

```bash
npm publish -w @shipschematic/design-judges --access public --registry=https://registry.npmjs.org/
npm view @shipschematic/design-judges version --registry=https://registry.npmjs.org/
```

`--registry` is required. Without it, `publishConfig.registry` sends the publish to GitHub Packages.

Expected output: `1.0.0`.

## 2. Wire npmjs CI (not implemented)

The current `release.yml` publishes only to GitHub Packages and does not read `NPM_PUBLISH_ENABLED`. Do not set that variable.

After the bootstrap:

1. Add a separate npmjs workflow with `id-token: write`, for example `.github/workflows/npm-publish.yml`.
2. Bind the package to that exact workflow:

```bash
npm trust github @shipschematic/design-judges \
  --file npm-publish.yml \
  --repository shipschematic/shipschematic-skills-public \
  --allow-publish -y

npm trust list @shipschematic/design-judges
```

3. Keep the GitHub Packages job as-is until npmjs releases are proven.

## 3. Normal releases

```bash
npx changeset
```

1. Commit the changeset on a branch.
2. Open a pull request and wait for `validate`.
3. Merge the pull request.
4. Merge the `Version Packages` pull request opened by the bot.
5. The Release workflow publishes to GitHub Packages. npmjs publishing starts only after the separate npmjs job is added and tested.

## Do not

- Do not set `NPM_PUBLISH_ENABLED`; no workflow reads it.
- Do not run a manual npmjs publish after the bootstrap. Add the CI job first.
- Do not run `npm publish` after the bootstrap. Use Changesets for GitHub Packages.
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
| npmjs CI does not run | Expected. npmjs CI is not implemented; only the manual bootstrap exists. |
