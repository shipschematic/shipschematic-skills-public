# shipschematic skills

Public skill packs. One repo, one pack per job, one installer per pack.

## Install

```bash
npx @shipschematic/design-judges
```

Installs all five design judge skills into `./.opencode/skills`.

| Flag | Target |
| --- | --- |
| `--global` | `~/.config/opencode/skills` |
| `--claude` | `./.claude/skills` |
| `--global --claude` | `~/.claude/skills` |
| `--dest <path>` | Custom directory |
| `--only <a,b>` | Install named skills |
| `--list` | List skills |
| `--force` | Overwrite existing skills |

## Packs

| Pack | Use for |
| --- | --- |
| `@shipschematic/design-judges` | Book, cover, page, carousel, and YouTube thumbnail design review |
