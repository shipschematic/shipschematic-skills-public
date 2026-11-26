# Scaffold

Add only what the inventory marks `absent`. Every write is idempotent: look for the file or the block first, then create, merge, or skip.

## Order

1. Format and lint config, if the repo has neither.
2. Typecheck config, if the language has a checker and no config.
3. Test runner config, if tests exist but no runner is declared.
4. A local script that runs the ladder steps in order.
5. The git hook, calling the same script.
6. The CI job, calling the same script.
7. `out/checks.md`, written in `references/02-verify.md`.

Stop after each group and show the file list. Do not write the whole set without approval.

## Idempotence

| Target | Check first | Action |
|---|---|---|
| `package.json` script | key exists in `scripts` | skip and report; never overwrite a user's script |
| `Makefile` target | `grep -n '^target:'` | add the target only if absent |
| `pyproject.toml` section | section key present | merge keys, keep existing values |
| `.husky/pre-commit` | file exists | append the command only if not already present |
| `.pre-commit-config.yaml` | repo entry exists | append one entry, keep the rest |
| CI job | job name exists in the config | merge steps; do not replace the job |
| `out/checks.md` | file exists | merge rows; keep prior evidence |

A second run of this step must produce an empty diff. If it does not, the scaffold is not idempotent: fix it before continuing.

## The shared command

One script per repo, named for the repo's convention, for example `scripts/check.sh` or a `check` script in `package.json`. It runs the `present` steps in ladder order and stops at the first failure. The hook and the CI job call this script; they do not repeat its commands.

An `absent` step is a comment in the script, not a fake command.

## Hooks

- Pre-commit runs the fast steps: format, lint, typecheck, `test:focused`.
- Pre-push may run `test:suite` when the suite is fast.
- A hook must not run `build`, `e2e`, deploy, or anything that needs the network.
- A hook must be skippable, and the skip must be documented in the receipt.

## CI

- One validation job calls the shared script, then runs `build` and `e2e` when `present`.
- CI uses the same runner and lockfile as local: `pnpm install --frozen-lockfile`, `npm ci`, `pip install -e .`, and so on.
- No deploy, release, or rollback command in a validation job. Those live in their own job or script, gated by a tag or a manual trigger.
- CI may cache dependencies and upload artifacts. It may not change the command string.

## Approvals and hard limits

- Ask before adding any dependency, including a linter, formatter, or test runner. Default answer is no install; use what the repo declares.
- Never write a token, key, password, or environment value into a tracked file. Reference a secret by name only.
- Never add a deploy command to CI. If the repo already has one in a validation job, report it; do not move it silently.
- Environment config is injected at deploy time, in the deploy script, from the platform's secret store.
- Never commit, amend, push, or tag.

## Output

A receipt: files created, files merged, files skipped, dependencies requested, and the exact command each file invokes. Then continue to `references/02-verify.md`.
