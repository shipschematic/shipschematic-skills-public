# Verify and hand off

Prove the loop works, then record it. Ladder order and the artifact format come from `../../dev-cycle/references/07-feedback.md`; do not restate them.

## Steps

1. Run the shared command locally. It runs the `present` steps in ladder order and stops at the first failure.
2. Run the hook path directly, without committing: the hook script itself, not the command it wraps.
3. Run the same script in a clean environment: fresh checkout, fresh dependency install from the lockfile, no local caches. This is the CI stand-in.
4. Compare the three command strings, step by step. They must be identical.
5. Confirm `build` and `e2e` run only in CI and Verify, never in the hook.
6. Confirm no deploy, release, or rollback command sits in a validation job, and no secret is tracked.
7. Write `out/checks.md`, or merge rows into the existing file.
8. Report the receipt.

## Parity proof

```text
Step: format
  local: {command}
  hook:  {command}
  CI:    {command}
  match: yes/no
```

Repeat for every `present` step. A single `no` blocks the handoff.

`absent` steps are listed once, as absent, with the reason.

## `out/checks.md`

The table, CI block, and CD block are defined in `../../dev-cycle/references/07-feedback.md`. Fill them from the inventory and the parity run.

- Keep one row per step, in ladder order.
- The `Command` cell is the exact string that passed. Copy it; do not retype it.
- Record the CI status and its evidence. No evidence means `unknown`.
- Merge into an existing file: update the command and evidence cells, keep prior history in `## Notes`.

## Stop conditions

- A `present` step has no passing command. Report the step and the error line.
- Local, hook, and CI strings differ. Report all three.
- A required dependency is missing and the user has not approved an install.
- The repo has no test harness and no build. Stop before `build`; the loop cannot be proven.
- A deploy command is inside a validation job and the user has not approved moving it.

Stop means: no `out/checks.md` write, no claim that the loop is ready, and a receipt that names the blocker.

## Done when

Every `present` step passes locally, through the hook, and in a clean environment; the three strings match; `out/checks.md` is written or merged; and the receipt lists what changed and what stays `absent`. Hand back to `dev-cycle` at Plan, or at Intake when a cycle is already running.
