# @shipschematic/dev-loop

Two development-loop skills for AI coding agents.

## Install

```bash
npx @shipschematic/dev-loop
```

Installs both skills into `./.agents/skills`. Requires Node.js 18 or newer.

| Flag | Target |
| --- | --- |
| `--global` | `~/.agents/skills` |
| `--claude` | `./.claude/skills` |
| `--global --claude` | `~/.claude/skills` |
| `--dest <path>` | Custom directory |
| `--only <a,b>` | Install named skills |
| `--list` | List skills |
| `--force` | Overwrite existing skills |

## Skills

| Skill | Use for |
| --- | --- |
| `dev-cycle` | Propose, approve, plan, build, verify, CI gate, archive. Defines artifacts, gates, feedback ladder, and CI/CD boundary. |
| `feedback-loop-setup` | Detect stack, scaffold format/lint/typecheck/test/build, wire hook and CI, prove parity. Install alongside `dev-cycle`; reads `dev-cycle/references/07-feedback.md`. |

## Optional agents

Skills work without agents. For the full gated pipeline, copy the shipped templates:

```bash
mkdir -p .opencode/agents
cp ./node_modules/@shipschematic/dev-loop/agents/*.md .opencode/agents/
```

| Agent | Role |
| --- | --- |
| `architect` | Routes work, owns gates. |
| `executor` | Implements planned tasks with TDD. |
| `surgeon` | Makes minimal fixes. |
| `reviewer` | Read-only diff review. |

The skill installer does not copy `agents/`.

## Runtime artifacts

`dev-cycle` writes `out/` and `archive/`. Add to `.gitignore`:

```gitignore
out/
archive/
```

## License

MIT
