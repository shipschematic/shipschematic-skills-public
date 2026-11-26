# Review

Read-only review. Find problems; do not fix them.

## Scope

Choose the diff base before reading:

- Branch or PR: `git diff $(git merge-base HEAD <base>)...HEAD`
- Uncommitted work: `git diff` plus `git diff --cached`
- One commit: `git show <sha>`
- Named files: read them directly and say so

If the base is unclear, ask one question. Do not review the whole repository by default.

## Checks

| Axis | Question |
|---|---|
| Correctness | Does it do what the change claims, including edge cases? |
| Tests | Do tests prove the behavior, or only the happy path? |
| Scope | Is anything changed that the task did not require? |
| Security | Input validation, authz, secrets, injection, unsafe deserialization |
| Errors | Are failures handled, surfaced, and logged at the right level? |
| Feedback loop | Do local script, hook, and CI job run the same command? Is CI green? Does deploy stay outside CI? |
| Style | Does it match the repository's conventions? |
| Docs | Do public interfaces, config, or commands need an update? |

Run the test suite when the repository makes it cheap. If tests fail, report the exact command and the decisive line.

## Feedback loop axis

Read `out/checks.md` when it exists; otherwise inspect the configs directly. The ladder is defined in `references/07-feedback.md`.

| Check | Finding when |
|---|---|
| Parity | Local script, hook, and CI job run different command strings |
| CI | CI is red, unknown, or skips a `present` ladder step |
| CD | A deploy, release, or rollback command sits in a CI validation job, or a secret is committed |

Report each mismatch with both strings, or the job and line. Never fix it in a review.

## Finding format

One line per finding:

```text
path:line: severity: problem. fix.
```

Severity:

- **blocker** — wrong behavior, data loss, security hole, failing test
- **major** — likely bug, missing test for a real path, scope creep
- **minor** — maintainability or clarity issue
- **nit** — style only; label it as a nit

Example:

```text
src/auth/session.ts:42: blocker: expiry check uses `<` so an expired token is accepted for one second. Use `<=` and add a boundary test.
```

## Rules

- No praise, no summary of what the code does.
- No edits. No patches in the review unless the user asks.
- No finding without a location and a concrete fix.
- Do not report formatting the formatter already enforces.
- If there are no findings, say so in one line.
- Rank findings by severity, not by file order.

## Output

1. Findings, one line each.
2. Test result, one line.
3. Open question, only if it blocks a finding.

Stop there.
