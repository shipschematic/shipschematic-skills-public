# design-judges

[![npm version](https://img.shields.io/npm/v/design-judges.svg)](https://www.npmjs.com/package/design-judges)
[![license](https://img.shields.io/npm/l/design-judges.svg)](LICENSE)

Agent skills that gate design work. Five judges, ten gated sections each. One failed gate blocks ship.

Works with OpenCode and Claude Code. No dependencies.

## Quick start

```bash
npx design-judges
```

Installs all five skills into `./.opencode/skills`. Run it from the project that should use the judges.

## Install

```bash
npx design-judges                      # ./.opencode/skills
npx design-judges --global             # ~/.config/opencode/skills
npx design-judges --claude             # ./.claude/skills
npx design-judges --global --claude    # ~/.claude/skills
npx design-judges --dest ./path        # custom directory
```

Flags:

```bash
npx design-judges --list
npx design-judges --only cover-judge,page-judge
npx design-judges --force
npx design-judges --help
```

Existing skills are skipped unless you pass `--force`.

## Skills

| Skill | Use when |
|---|---|
| `book-design-judge` | print book covers and interior pages, 7×9.25 in, two-ink |
| `cover-judge` | A5 screen-edition book covers |
| `page-judge` | A5 screen-edition interior pages |
| `carousel-judge` | LinkedIn, Instagram, and X carousels |
| `thumbnail-judge` | YouTube thumbnails, AHQ spine |

## Run a judge

Each skill carries a fixed spec and a checklist of gates. Run the artifact against every gate. Any unchecked box means the artifact does not ship. Fix, rerun, repeat.

The skills are self-contained. No reference files, no build step.

## Update

```bash
npx design-judges@latest --force
```

## Uninstall

Remove the installed folders:

```bash
rm -rf .opencode/skills/book-design-judge .opencode/skills/cover-judge \
       .opencode/skills/page-judge .opencode/skills/carousel-judge \
       .opencode/skills/thumbnail-judge
```

## Development

```bash
npm pack --dry-run
node bin/install.js --dest /tmp/design-judges-test
```

## Publish

Maintainer flow. Requires npm login and a clean tree.

```bash
npm version patch
git push --follow-tags
npm publish --access public
```

Releases after the first publish run from GitHub Actions with npm provenance. Enable trusted publishing on npmjs.com for `shipblueprint/design-judges`, workflow `publish.yml`.

## License

MIT
