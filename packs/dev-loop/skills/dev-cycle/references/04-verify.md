# Verify

Prove the change works, the scope is clean, and the loop matches CI.

## Read the commands

Open `out/checks.md`. It holds the only allowed command for each ladder step, with its source file and CI job. The ladder, detection rules, and parity rule live in `references/07-feedback.md`.

- Do not rediscover a command. Do not substitute a tool.
- An `absent` step is recorded as absent and skipped. It is not a pass.
- If `out/checks.md` is missing, stop and ask.

## Steps

1. Run the ladder in `references/07-feedback.md` order: `format`, `lint`, `typecheck`, `test:focused`, `test:suite`, `build`, `e2e`. Capture each exit code.
2. Run only steps marked `present`.
3. Open `out/tasks.md` and confirm every task is `[x]`.
4. Run `git diff --stat` and compare it with the plan's file list.
5. Look for placeholders: `TODO`, `FIXME`, stub returns, skipped tests.
6. Record the CI result: user-provided status, or a clean-environment rerun of the ladder. Without evidence, write `unknown` and stop before the CI gate.
7. Confirm the CD boundary: deploy, release, and rollback scripts exist apart from the CI validation jobs, and no secret is committed. Record it. Never run them.
8. If a bypass is active, write its section in `out/verification.md` before continuing. An empty table means none.
9. Write `out/verification.md`.

## Template

```markdown
# Verification: {feature}

## Commands
| Step | Command | Result | Evidence |
|---|---|---|---|
| format | `{command}` | pass/fail/absent | {counts or error line} |
| lint | `{command}` | pass/fail/absent | {counts} |
| typecheck | `{command}` | pass/fail/absent | {counts} |
| test:focused | `{command}` | pass/fail/absent | {counts} |
| test:suite | `{command}` | pass/fail/absent | {counts} |
| build | `{command}` | pass/fail/absent | {evidence} |
| e2e | `{command}` | pass/fail/absent | {evidence} |

## CI
- Config: `{path}`
- Status: {green | red | unknown}
- Evidence: {run URL, user report, or clean-environment rerun}

## CD
- Deploy, release, rollback: `{paths, or none}`
- Separate from CI jobs: {yes | no | not applicable}
- Executed by this cycle: no

## Tasks
- {n}/{n} complete

## Scope
- Planned files: {n}
- Changed files: {n}
- Out-of-scope changes: {none | list}

## Placeholders
- {none | list}

## Bypasses
| Gate | User words | Findings | Risk accepted |
|---|---|---|---|
| {gate, or none} | {quoted user words} | {findings} | {risk} |

## Verdict
pass | fail

## Notes
{flaky tests, skipped checks, manual checks}
```

## Failure handling

- A failing test blocks the change. Fix it or report it; never archive.
- A pre-existing failure must be shown as pre-existing. Run the same command on the base commit when possible.
- A skipped test is not a pass. Name it.
- Flaky test: rerun once, then report the flake with both results.
- A parity mismatch between local, hook, and CI blocks the CI gate. Report the two strings.
- A deploy step inside a CI validation job blocks the change. Report the job and line.

## Gate

Present the verdict and the evidence. CI must be green on the recorded commands before Archive. A bypass does not make CI green and does not change the verdict; it records who accepted which risk. If the user asked for verify only, stop here. Archive needs an explicit request or confirmation.
