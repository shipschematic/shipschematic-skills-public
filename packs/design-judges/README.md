# @shipschematic/design-judges

Five agent skills that gate design work before ship. Each skill has ten gated sections. One failed gate blocks ship.

Published on npmjs. No registry authentication needed.

## Install

```bash
npx @shipschematic/design-judges
```

Installs all five skills into `./.opencode/skills`.

| Flag | Target |
|---|---|
| `--global` | `~/.config/opencode/skills` |
| `--claude` | `./.claude/skills` |
| `--global --claude` | `~/.claude/skills` |
| `--dest <path>` | custom directory |
| `--only <a,b>` | install named skills |
| `--list` | list skills |
| `--force` | overwrite existing skills |

Without `--force`, existing skills are skipped.

## Skills

| Skill | Use for | Install only this skill |
|---|---|---|
| `book-design-judge` | Print book cover or interior page, 7×9.25 in, two-ink | `npx @shipschematic/design-judges --only book-design-judge` |
| `cover-judge` | A5 screen-edition book cover, HTML and PDF | `npx @shipschematic/design-judges --only cover-judge` |
| `page-judge` | A5 screen-edition book page, type, figures, accessibility | `npx @shipschematic/design-judges --only page-judge` |
| `carousel-judge` | LinkedIn, Instagram, and X carousels | `npx @shipschematic/design-judges --only carousel-judge` |
| `thumbnail-judge` | YouTube thumbnail, 1280×720, mobile-first | `npx @shipschematic/design-judges --only thumbnail-judge` |
