# Execute

Implement planned tasks. One task at a time, verified before the next.

## Pre-execution

1. Read `out/plan.md` and `out/tasks.md`.
2. Read `out/checks.md`. It holds the only allowed command for each ladder step.
3. Read `out/PROJECT_MAP.md` when it exists.
4. Inspect the repository: layout, and the files the checks come from.
5. Pick the first unchecked task. Do not reorder without a reason.

If `out/checks.md` is missing, stop and ask. Do not discover commands again.

## Per-task loop

1. State the success criterion in one line.
2. Write the failing test when a test is possible.
3. Implement the smallest change that passes.
4. Run the fast ladder from `out/checks.md`, in order: `format`, `lint`, `typecheck` when `present`. An `absent` step is skipped, not replaced.
5. Run `test:focused`. Then run `test:suite` when the change reaches past the touched module.
6. Refactor only the code you just touched.
7. Mark the task `[x]` in `out/tasks.md`.
8. Update `out/PROJECT_MAP.md` when it exists: remove the item from pending, record the change.
9. Move to the next task.

## Code rules

- Production-ready: error handling, logging at boundaries, no `TODO`, no stub, no fake return.
- Match the project's formatter, linter, types, and naming.
- Keep the diff inside the task's files. If the task needs another file, update the plan first.
- Prefer deleting code over adding a flag.
- No new dependency without the user's approval.
- Do not touch unrelated dead code. Remove only what your change orphaned.

## Stop conditions

Stop and report when:

- The task is ambiguous or contradicts the plan.
- `out/checks.md` is missing, or a step's command is not recorded there.
- A test fails twice for a reason you cannot explain.
- The change needs a new dependency or a public interface change.
- The repository has no test harness and the task changes behavior.
- Two tasks conflict.

Report the task id, what you tried, the exact failing command, and the shortest decisive error line.

## Git

- Run `git status` before finishing to confirm the diff scope.
- Never commit, amend, push, or tag unless the user explicitly asks.
- Never revert someone else's work to make a test pass.

## Exit

All tasks are `[x]`, the fast ladder and the focused and surrounding tests pass, and the diff is inside scope. Hand back a receipt: tasks completed, files changed, commands run, and anything left.
