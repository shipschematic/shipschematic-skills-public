# Feedback Loop

One ladder. One command string per step. The local script, the git hook, and the CI job run that same string. This file is the only place the ladder is defined; every other file links here by name.

## Ladder

Ordered cheapest and fastest first.

| # | Step | Proves | Fast loop |
|---|---|---|---|
| 1 | `format` | style is canonical | yes |
| 2 | `lint` | no banned pattern | yes |
| 3 | `typecheck` | types agree | yes |
| 4 | `test:focused` | the changed behavior works | yes |
| 5 | `test:suite` | nothing else broke | on scope change |
| 6 | `build` | the artifact compiles | no |
| 7 | `e2e` | the system works end to end | no |

Fast loop while coding: steps 1-4. Run step 5 when the change reaches past the touched module. Steps 6-7 run at Verify and in CI.

## Presence

A step is `present` only when the repository has a real command for it. Otherwise it is `absent`. Never invent a command and never swap in a different tool. `absent` is a valid state: record it and continue to the next step.

## Detection

Read the repository. Do not guess a command from the language name alone.

| Evidence | Stack | Commands live in |
|---|---|---|
| `package.json` | Node / TypeScript | `scripts` block |
| `pnpm-lock.yaml`, `package-lock.json`, `yarn.lock` | Node package manager | lockfile pins the runner: `pnpm run`, `npm run`, `yarn` |
| `pyproject.toml` | Python | `[tool.*]` sections, `[project.scripts]` |
| `go.mod` | Go | `go test`, `go vet`, `gofmt` |
| `Cargo.toml` | Rust | `cargo fmt`, `cargo clippy`, `cargo test`, `cargo build` |
| `Makefile` | any | named targets; prefer them over raw tools |
| `.github/workflows/`, `.gitlab-ci.yml` | CI | the job's `run:` lines |
| `.husky/pre-commit`, `.pre-commit-config.yaml` | git hooks | hook entry commands |

Rules:

1. A `Makefile` target wins over a raw tool call.
2. A CI `run:` line wins over a guessed default, because CI is the authority that must stay green.
3. If CI and the local script disagree, that is a parity defect. Report it; do not pick one silently.
4. If nothing matches, every step is `absent` and the setup skill is required.

## `out/checks.md`

Written at Plan, read at Build, Verify, the CI gate, and Review, archived at Archive. The command recorded here is the only allowed command for that step.

```markdown
# Checks: {feature}

| Step | Command | Source file | Presence | Hook | CI |
|---|---|---|---|---|---|
| format | `{command}` | `{path}` | present | `{hook or none}` | `{job or none}` |
| lint | `{command}` | `{path}` | present | `{hook or none}` | `{job or none}` |
| typecheck | `{command}` | `{path}` | absent | none | none |
| test:focused | `{command}` | `{path}` | present | none | none |
| test:suite | `{command}` | `{path}` | present | `{hook or none}` | `{job or none}` |
| build | `{command}` | `{path}` | present | none | `{job or none}` |
| e2e | `{command}` | `{path}` | absent | none | none |

## CI
- Provider and config: `{path}`
- Status: `{green | red | unknown}`
- Evidence: `{run URL, user report, or clean-environment rerun}`

## CD
- Deploy, release, rollback: `{paths, or none}`
- Separate from CI jobs: `{yes | no}`
```

## Parity

For each `present` step: local script, hook, and CI job must invoke the same command string. A hook may run a subset; it may not run a different command. A CI job may add a wrapper for caching or artifacts, but the underlying command is unchanged.

Mismatch is a finding, not a preference. Fix the source, then rerun the ladder.

## CI gate

CI validates. It is green only when every `present` step passes in a clean environment. Evidence is a user-provided CI status or a clean-environment rerun of the ladder. Without evidence, stop at the gate; do not assume green.

## Bypass

The default is a stop. A gate that fails, or a step that is missing, blocks the change.

One exception: the user may explicitly override one named gate for one run, in chat. The user says `bypass`, `warn only`, or `override` and names the gate.

- Surface the findings in chat before continuing. Never proceed silently.
- Record the gate, the user's words, the findings, and the accepted risk in `out/verification.md`.
- The bypass covers that one gate in that one run. The next run starts with the hard gates again.
- CI green still holds. The non-bypassable rules in `SKILL.md` still hold: a passing verdict before Archive, and no deploy, release, rollback, secret handling, commit, amend, push, or tag.

## CD boundary

CD ships. `dev-cycle` never deploys, releases, rolls back, handles secrets, or calls a remote CI provider API.

- Deploy, release, and rollback live in their own scripts or jobs, outside the CI validation jobs.
- Secrets and environment config are injected only at deploy time, never committed and never written into CI config by this cycle.
- Verify records that the separation holds. It never executes the deploy path.
