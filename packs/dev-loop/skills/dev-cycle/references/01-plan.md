# Plan

Turn an approved proposal into tasks small enough to verify.

## Inputs

- `out/proposal.md`, or the approved chat summary.
- `out/PROJECT_MAP.md` when it exists.
- The repository's test, lint, and typecheck commands, detected as `references/07-feedback.md` describes.
- Existing conventions: file layout, naming, error handling.

## Steps

1. Read the proposal and the target code.
2. Detect every ladder step in `references/07-feedback.md` order. Record the command, its source file, and its presence.
3. Map the change: files to create, files to edit, data flow, public interface.
4. Choose the test level for each behavior: unit, integration, or end-to-end.
5. Break the work into tasks of 2-5 minutes. A task is one edit plus one check.
6. Order tasks so the codebase stays working after each one.
7. Mark tasks that can run in parallel. Default to sequential.
8. Write `out/plan.md`, `out/tasks.md`, and `out/checks.md`.

## Task rules

- One outcome per task. "Add validation" is not a task; "reject empty email in `signup()` with a test" is.
- Every task names the file and the check.
- Every task's check is a command from `out/checks.md` or a stated assertion. No undefined command.
- Every task has an acceptance criterion.
- No task depends on a decision that is still open. Resolve it in the plan.
- If a task needs more than five minutes, split it.
- Tests come before or with the implementation, never after the whole feature.

## `out/plan.md` template

```markdown
# Plan: {feature}

## Approach
{one paragraph}

## Files
- `{path}` — {create | edit} — {purpose}

## Interfaces
- `{name}` — {signature or shape} — {consumer}

## Test strategy
- {level} — {what it proves} — {command}

## Risks
- {risk} — {mitigation}

## Rollback
{how to revert safely}
```

## `out/tasks.md` template

```markdown
# Tasks: {feature}

## Milestone 1: {name}
- [ ] T1 — {outcome} — `{file}` — check: {command or assertion}
- [ ] T2 — {outcome} — `{file}` — check: {command or assertion}

## Milestone 2: {name}
- [ ] T3 — {outcome} — `{file}` — check: {command or assertion}

## Done
- [ ] All checks pass
- [ ] No placeholders
- [ ] Verification artifact written
```

## `out/checks.md` template

Full ladder, detection rules, and the artifact table live in `references/07-feedback.md`. Write the file at this stage, before Build. Required columns:

```markdown
# Checks: {feature}

| Step | Command | Source file | Presence | Hook | CI |
|---|---|---|---|---|---|
| {step} | `{command or absent}` | `{path}` | present/absent | {hook or none} | {job or none} |

## CI
- Provider and config: `{path}`
- Status: `{green | red | unknown}`

## CD
- Deploy, release, rollback: `{paths, or none}`
```

## Gate

Present the plan and the task count. Proceed when the user says "go", "approved", or asks for the full cycle. If the user changes scope, update both artifacts before building.

## Rules

- No code in the plan.
- No undefined placeholder in a task.
- Do not plan work the proposal excluded.
- Keep `tasks.md` as the single progress source. Do not duplicate task state elsewhere.
