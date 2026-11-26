# Archive

Close a verified change and leave a clean workspace.

## Preconditions

- `out/verification.md` exists and says `pass`.
- CI is green on the commands recorded in `out/checks.md`, with evidence in `out/verification.md`. If the status is `unknown` or `red`, stop.
- Every task in `out/tasks.md` is `[x]`.
- The user confirmed the archive.

If any condition fails, stop and say which one.

## Steps

1. Choose the feature slug: lowercase kebab-case, same as the proposal.
2. Create `archive/{slug}/`.
3. Move these files into it:
   - `out/proposal.md`
   - `out/plan.md`
   - `out/tasks.md`
   - `out/checks.md`
   - `out/verification.md`
4. Keep `out/PROJECT_MAP.md` in place. It is project state, not feature state.
5. Remove empty files and directories from `out/`.
6. If OpenSpec created `openspec/changes/{slug}/`, run `openspec archive`.
7. Write `archive/{slug}/summary.md`.
8. Report the archive path and the next feature state.

## Summary template

```markdown
# {feature}

- Status: archived
- Verified: {date}
- CI: {green} — {evidence}
- Files changed: {n}
- Tests added: {n}
- Key decision: {one line}
- Known limits: {one line or none}
```

## Rules

- Never overwrite an existing archive. If the slug exists, add `-2` and say so.
- Do not archive `PROJECT_MAP.md`.
- Do not archive a feature with red or unknown CI.
- Do not delete source changes. Archive only the planning artifacts.
- Do not run deploy, release, or rollback while archiving.
- Do not commit or push unless the user asks.
- If the user wants to keep a feature open, leave `out/` untouched.

## Done when

The artifacts are under `archive/{slug}/`, including `checks.md`, `out/` has no stale feature files, the summary records the CI evidence, and the user has the path.
