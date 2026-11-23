# Releasing

Packages publish to npmjs from GitHub Actions. Do not run `npm publish` from a laptop.

- Registry: `https://registry.npmjs.org/`
- Scope: `@shipschematic`
- Package: `@shipschematic/design-judges`
- Auth: npm Trusted Publishing (OIDC). No long-lived npm token.

## Normal release

1. Add a changeset:

```bash
npx changeset
```

2. Commit the changeset on a branch and open a pull request.
3. Merge the pull request after CI passes.
4. The Release workflow opens or updates the `Version Packages` pull request.
5. Merge the `Version Packages` pull request.
6. The Release workflow validates, publishes to npmjs with provenance, verifies the registry metadata and tarball, then pushes tag `v<version>` and creates the GitHub release. `npm run post-release` is idempotent; re-run Release if tagging fails after a successful publish.

## New package

npm Trusted Publishing requires the package to exist. Publish the first version once from a trusted local session with 2FA, then bind it. Do not reuse an existing version.

## Trusted publisher

The package must be bound to the exact workflow that runs `npm publish`. For this repo that is `release.yml`.

One-time setup, after the workflow exists on `main`:

```bash
npm trust github @shipschematic/design-judges \
  --file release.yml \
  --repository shipschematic/shipschematic-skills-public \
  --allow-publish -y

npm trust list @shipschematic/design-judges
```

The binding requires 2FA. Repository, workflow filename, and optional environment are case-sensitive. If `release.yml` is renamed or moved, rebind before the next release.

## Install

Published on npmjs. No registry authentication needed.

```bash
npx @shipschematic/design-judges
```

## Guardrails

- CI-only publishing.
- OIDC Trusted Publishing. No npm tokens in GitHub Secrets.
- `release.yml` is the trusted workflow. Do not rename it without rebinding.
- The release job needs `id-token: write` and npm CLI 11.5.1 or later.
- `main` requires the `validate` status check and linear history.
- Force pushes and branch deletion are disabled.
- Versions are immutable. Let Changesets bump them.

## Troubleshooting

`EOTP` in CI: Trusted Publishing is not active. Check the binding, the workflow filename, the repository, and `id-token: write`.

`ENEEDAUTH` or `404` on publish: the trusted publisher does not match the running workflow, or the package does not exist. The repository, workflow file, and environment must match exactly.

`version already exists`: do not reuse a version. Add a changeset and let Changesets bump it.

`E404` right after a successful publish: registry propagation can lag. Verification retries for 5 minutes, then checks the published tarball.

`403 Forbidden`: the npm account or package permissions block publishing. Do not retry a suspended response in a loop.
