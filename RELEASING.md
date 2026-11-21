# Releasing

Public packages publish to npm through GitHub Actions. After the one-time bootstrap, do not run `npm publish` from a laptop.

## Current gate

The Release workflow is disabled until the repository variable `NPM_PUBLISH_ENABLED` is `true`:

```bash
gh variable list
gh variable set NPM_PUBLISH_ENABLED --body true
```

While the variable is not `true`, the Release job is skipped.

## One-time bootstrap

npm Trusted Publishing requires the package to exist before it can be configured. The first publish is the only manual publish.

After npm access is restored:

```bash
npm login
CONFIRM_NPM_BOOTSTRAP=1 npm run bootstrap:npm
```

The script publishes `@shipschematic/design-judges@1.0.0`, verifies that npm reports the version, and prints the next commands.

Bind the package to this repository and workflow:

```bash
npm trust github @shipschematic/design-judges \
  --file release.yml \
  --repository shipschematic/shipschematic-skills-public \
  --allow-publish -y
```

Enable CI publishing:

```bash
gh variable set NPM_PUBLISH_ENABLED --body true
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
6. The Release workflow validates, publishes to npm, creates the git tag and GitHub release, and verifies the npm version.

## Guardrails

- CI-only publishing after bootstrap.
- No long-lived npm token in GitHub Secrets.
- npm provenance is generated in CI with OIDC.
- `main` requires the `validate` status check and linear history.
- Force pushes and branch deletion are disabled.

## Troubleshooting

`403 suspended`: npm has suspended publishing. Wait for npm support. Do not retry in a loop.

`EOTP` or 2FA prompt: complete the npm login or provide an OTP for the one-time bootstrap.

`version already exists`: do not reuse a version. Add a changeset and let Changesets bump it.

`403 trusted publisher`: run the `npm trust github` command again, or confirm the repository, workflow filename, and package name match exactly.

`E404` right after a successful publish: registry propagation can lag. The verification step retries for 30 seconds.

GitHub Packages is not used for the public package. npm is the public host.
