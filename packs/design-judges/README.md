# @shipschematic/design-judges

Five design judge skills for AI coding agents. Each skill reviews one design surface before ship. A failed gate blocks ship.

## Install

```bash
npx @shipschematic/design-judges
```

Installs all five skills into `./.opencode/skills`. Requires Node.js 18 or newer.

| Flag | Target |
| --- | --- |
| `--global` | `~/.config/opencode/skills` |
| `--claude` | `./.claude/skills` |
| `--global --claude` | `~/.claude/skills` |
| `--dest <path>` | Custom directory |
| `--only <a,b>` | Install named skills |
| `--list` | List skills |
| `--force` | Overwrite existing skills |

## Skills

| Skill | Use for |
| --- | --- |
| `book-design-judge` | Print book cover or interior page: 7×9.25 in, two-ink, print files |
| `cover-judge` | A5 screen-edition book cover: 148 × 210 mm, two-ink, HTML and PDF |
| `page-judge` | A5 screen-edition interior page: type, figures, accessibility, HTML and PDF |
| `carousel-judge` | LinkedIn, Instagram, and X carousels: hook, copy, design, flow, CTA |
| `thumbnail-judge` | YouTube thumbnails: 1280 × 720, mobile-first, attention and feed proof |
