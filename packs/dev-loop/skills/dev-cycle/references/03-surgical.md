# Surgical

One precise change. No refactor, no adjacent cleanup.

## Pre-surgery

1. Read the request and the `[Architecture Context]` block from the architect.
2. Read `out/checks.md` when it exists. It holds the only allowed command for each ladder step.
3. Locate the target file and the function that owns the behavior.
4. Find every caller of the code you will change.
5. Read the nearest tests and the repository's style.
6. Write the impact list before editing.

## Impact list

```text
Change: {one line}
Files: {paths}
Callers: {symbols and paths}
Tests: {paths}
Risk: {what could break}
```

If a caller is outside the stated scope, stop and report it. Do not edit it silently.

## Rules

- **Minimal diff.** Change the fewest lines that fix the behavior.
- **Match the style.** Follow the existing formatter, naming, and error handling, even when imperfect.
- **No drive-by edits.** Do not reformat, rename, reorder imports, or rewrite comments you did not change.
- **Clean only your own mess.** If your change orphans an import or helper, remove it. Leave pre-existing dead code alone.
- **No refactor while fixing.** A fix and a restructure are two tasks.
- **No behavior change beyond the request.** If the fix needs one, report it and get approval.

## Test

1. Reproduce the bug with a failing test when possible.
2. Implement the minimal fix.
3. Run the fast ladder from `out/checks.md`, in order: `format`, `lint`, `typecheck` when `present`. An `absent` step is skipped, not replaced.
4. Run `test:focused`, then `test:suite`.
5. If a test cannot be written, state why and give a manual check.

No drive-by edits: do not fix lint, type, or format findings outside the touched lines. Report them instead.

## Stop conditions

- The fix requires a public interface change.
- The bug is caused by a design flaw that a one-line fix would hide.
- Two callers need opposite behavior.
- The test suite was already failing before your change.

Report the condition and the evidence. Do not force the fix.

## Exit

The fast ladder and the focused test pass, the surrounding suite has no regression, and the diff contains only the intended change. Return a receipt: files changed, tests added, commands run, remaining risk.
