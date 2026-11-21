# @shipschematic/design-judges

Public. Five agent skills that gate design work. Ten gated sections each. One failed gate blocks ship.

The package lives on GitHub Packages. Add this to `.npmrc` and export a token with `read:packages` first:

```
@shipschematic:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
export GITHUB_TOKEN=<token with read:packages>
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
