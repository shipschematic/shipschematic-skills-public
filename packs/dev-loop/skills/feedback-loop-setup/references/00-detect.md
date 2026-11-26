# Detect

Read-only inventory. Change nothing in this step.

## Read

| Evidence | Stack | What it tells you |
|---|---|---|
| `package.json` | Node / TypeScript | `scripts` block: dev, build, test, lint, typecheck, format |
| `pnpm-lock.yaml`, `package-lock.json`, `yarn.lock` | Node package manager | which runner to invoke: `pnpm run`, `npm run`, `yarn` |
| `pyproject.toml` | Python | `[tool.ruff]`, `[tool.mypy]`, `[tool.pytest.ini_options]`, `[project.scripts]` |
| `go.mod` | Go | `go test ./...`, `go vet ./...`, `gofmt -l .` |
| `Cargo.toml` | Rust | `cargo fmt --check`, `cargo clippy`, `cargo test`, `cargo build` |
| `Makefile` | any | named targets; a target wins over a raw tool call |
| `.github/workflows/`, `.gitlab-ci.yml` | CI | each job's `run:` lines and the job name |
| `.husky/pre-commit`, `.pre-commit-config.yaml` | git hooks | hook entry commands and the files they touch |
| `Dockerfile`, `compose.yaml` | container | build and e2e entry points |

Absent evidence means the step is `absent`. Do not infer a tool from the language name.

## Conflict order

1. The CI `run:` line, because CI is the authority that must stay green.
2. The `Makefile` target.
3. The manifest script.
4. The tool default.

If two sources disagree, report both strings and the two paths. Do not pick one silently.

## Output

Print this table, then stop for approval before writing anything.

```markdown
# Inventory: {repo}

| Step | Command | Source file | Presence |
|---|---|---|---|
| format | `{command or absent}` | `{path or none}` | present/absent |
| lint | `{command or absent}` | `{path or none}` | present/absent |
| typecheck | `{command or absent}` | `{path or none}` | present/absent |
| test:focused | `{command or absent}` | `{path or none}` | present/absent |
| test:suite | `{command or absent}` | `{path or none}` | present/absent |
| build | `{command or absent}` | `{path or none}` | present/absent |
| e2e | `{command or absent}` | `{path or none}` | present/absent |

## Existing automation
- CI: `{path}` — jobs: {names}
- Hooks: `{path}` — runs: {commands}
- Deploy, release, rollback: `{paths, or none}`
```

Step names and their order come from `../../dev-cycle/references/07-feedback.md`. Use them unchanged.

## Rules

- Read only. No file written in this step.
- Record the source file for every command. A command with no source is a guess.
- Name the runner explicitly: `pnpm test`, not `test`.
- List deploy scripts when they exist, so the scaffold step can leave them alone.
