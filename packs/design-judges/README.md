# @shipschematic/design-judges

Public. Five agent skills that gate design work. Ten gated sections each. One failed gate blocks ship.

```bash
npx @shipschematic/design-judges
```

Installs into `./.opencode/skills`.

| Flag | Target |
|---|---|
| `--global` | `~/.config/opencode/skills` |
| `--claude` | `./.claude/skills` |
| `--global --claude` | `~/.claude/skills` |
| `--dest <path>` | custom directory |
| `--only <a,b>` | install named skills |
| `--list` | list skills |
| `--force` | overwrite |

Skills: `book-design-judge`, `cover-judge`, `page-judge`, `carousel-judge`, `thumbnail-judge`.
