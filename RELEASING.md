# Releasing

Packages publish to GitHub Packages from GitHub Actions. Do not run `npm publish` from a laptop.

- Registry: `https://npm.pkg.github.com`
- Scope: `@shipschematic`
- Package: `@shipschematic/design-judges`

## First publish

The Release workflow publishes the current version when that version is not on the registry yet. Start it once by hand:

```bash
gh workflow run release.yml
```

Verify:

```bash
npm view @shipschematic/design-judges version --registry=https://npm.pkg.github.com
```

## Normal release

1. Add a changeset:

```bash
npx changeset
```

2. Commit the changeset on a branch and open a pull request.
3. Merge the pull request after CI passes.
4. The Release workflow opens or updates the `Version Packages` pull request.
5. Merge the `Version Packages` pull request.
6. The Release workflow validates, publishes to GitHub Packages, creates the package tag and GitHub release, and verifies the registry version.

## Install

GitHub Packages requires authentication even for public packages. Consumers need a token with `read:packages`.

Add to `.npmrc`:

```
@shipschematic:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then:

```bash
export GITHUB_TOKEN=<token with read:packages>
npx @shipschematic/design-judges
```

## Guardrails

- CI-only publishing.
- CI authenticates with the workflow `GITHUB_TOKEN` (`packages: write`). No long-lived token in GitHub Secrets.
- `main` requires the `validate` status check and linear history.
- Force pushes and branch deletion are disabled.

## Troubleshooting

`E401 Unauthorized`: the token is missing. Locally, set `GITHUB_TOKEN` and keep the `${GITHUB_TOKEN}` placeholder in `.npmrc`. In CI, confirm the job sets `NODE_AUTH_TOKEN`.

`403 Forbidden`: the token lacks `write:packages`, or org policy blocks the package. CI needs `permissions: packages: write`.

`version already exists`: do not reuse a version. Add a changeset and let Changesets bump it.

`E404` right after a successful publish: registry propagation can lag. Verification retries for 30 seconds.

## npm (disabled)

npmjs publishing is blocked because the npm account is suspended. `NPM_RESTORE.md` keeps the checklist for a future switch back. Publish to only one registry per version.
