# npm Bootstrap Record

Status: complete. `@shipschematic/design-judges@1.0.0` was published to npmjs on 2026-11-23. npmjs is the canonical registry. Normal releases are configured to use Trusted Publishing in `release.yml`.

## What happened

- The one-time bootstrap published `1.0.0` to `https://registry.npmjs.org/`.
- npm created a temporary `0.0.0-stage` placeholder while it scanned the new package. This is normal for a first publish.
- The published tarball was verified: 9 files, 13,448 bytes, contents match the local dry-run.
- `1.0.0` is public with `latest: 1.0.0`.

## Do not

- Do not republish `1.0.0`.
- Do not run `npm publish` by hand. Add a changeset and let CI publish.
- Do not add npm tokens to GitHub Secrets. Trusted Publishing uses OIDC.
- Do not retry a suspended or `403` response in a loop.

See [RELEASING.md](RELEASING.md) for the current release process.
