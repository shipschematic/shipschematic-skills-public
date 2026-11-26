---
name: feedback-loop-setup
description: "Set up a repo's feedback loop: detect the stack, scaffold format, lint, typecheck, test, and build commands, wire git hooks and CI, and prove local, hook, and CI parity. Use when the user says 'set up feedback loops', 'scaffold checks', 'add CI', 'add a pre-commit hook', or when dev-cycle intake finds missing checks. Idempotent; never installs a dependency or writes a deploy step without approval."
metadata:
  version: "1.0.0"
  owner: dev-cycle
---

# Feedback Loop Setup

Give a repo one command per ladder step, run the same string locally, in a hook, and in CI, and record the result in `out/checks.md`.

## Non-goals

- No deploy, release, or rollback step. Those are CD and stay out of CI validation.
- No secret written to a config, hook, or CI file.
- No dependency installed without explicit approval.
- No command invented for a step the repo does not support. `absent` is a valid result.

## Steps

### 1. Detect

Read `references/00-detect.md`. Inventory the repo read-only: manifests, lockfiles, CI config, hooks, existing scripts. Produce the step table with `present` or `absent` and the source file for each command.

Stop if the repo is not a git repository or has no test harness and no build. Report what is missing; do not guess.

### 2. Scaffold

Read `references/01-scaffold.md`. Add only what is missing, and only after the user approves the file list. Every write is idempotent: detect an existing file or block first, then merge or skip.

Ask before any dependency install. Default to using tools the repo already declares.

### 3. Verify and hand off

Read `references/02-verify.md`. Run the ladder in the order defined by `../dev-cycle/references/07-feedback.md`, prove parity between local script, hook, and CI job, and write `out/checks.md`.

Stop before `build` if a required check is still missing. Report the step and the file that would supply it.

## Output

| Artifact | Contents |
|---|---|
| `out/checks.md` | step, command, source file, presence, hook mapping, CI mapping, CI status, CD paths |
| Config files | the hook and CI files created or merged, listed in the receipt |
| Receipt | files changed, commands run, steps still `absent`, approvals needed |

## Rules

- The ladder and the artifact format live in `../dev-cycle/references/07-feedback.md`. Do not restate them here.
- A step with no real command is `absent`. Never substitute a different tool.
- One command string per step, shared by local, hook, and CI.
- Never add a deploy command to a CI validation job.
- Never write a token, key, or environment value into a tracked file.
- Never commit, amend, push, or tag unless the user explicitly asks.
- Match the repo's existing file layout and style.
- Report the exact command and the shortest decisive error line on failure.
