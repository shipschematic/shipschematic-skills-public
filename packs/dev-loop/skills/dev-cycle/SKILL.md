---
name: dev-cycle
description: "Run a disciplined development cycle: propose, approve, plan, build, verify, CI gate, archive. Use when the user says 'build a feature', 'implement this', 'plan this feature', 'fix this bug', 'refactor this module', 'review my code', 'verify this', 'what's the status', or 'archive this feature'. Defines the artifacts, gates, feedback-loop ladder, CI/CD boundary, and agent handoffs for single-repo work."
---

# Dev Cycle

Enforce one path from intent to archived change. No coding before a plan exists for non-trivial work. CI validates; CD ships; this cycle never deploys.

## Modes

| Mode | Stages | Use when |
|---|---|---|
| Feature | 0-7 | New behavior, multi-file change, unclear design |
| Design only | 0-3 | User wants a proposal or plan, not code |
| Fix | 0, 4-6 | Known bug, single behavior, clear cause |
| Refactor | 0, 3-6 | Structure change with no behavior change |
| Review | Standalone | User asks for a code review |
| Resume | Detect | `out/` artifacts exist from an earlier run |
| Archive | 7 | Work is verified, CI is green, and the user wants it closed |

Review is a standalone read-only pass. It does not require the stages before it.

## Stages

| # | Stage | Owner | Artifact | Gate |
|---|---|---|---|---|
| 0 | Intake | architect | None | Intent, scope, and repo identified |
| 1 | Propose | architect | `out/proposal.md` | Problem, options, scope, risks, acceptance criteria written |
| 2 | Approve | user | Approval in chat | Explicit sign-off |
| 3 | Plan | architect | `out/plan.md`, `out/tasks.md`, `out/checks.md` | Tasks are 2-5 minutes with a check; every command comes from a real source |
| 4 | Build | executor or surgeon | Code + updated `out/tasks.md` | Every task verified with the fast ladder, no placeholders |
| 5 | Verify | architect | `out/verification.md` | Ladder run in order; CI and CD rows recorded |
| 6 | CI | architect | `out/checks.md`, `out/verification.md` | CI config exists, uses the recorded commands, and the run is green |
| 7 | Archive | architect | `archive/<feature>/` | CI green; user confirms; `out/` cleaned |

Fix mode skips stages 1-3 only when the cause and the change are both obvious. If either is unclear, run the full cycle.

## Read map

- `references/00-propose.md` — proposal content, options, scope, and gate.
- `references/01-plan.md` — task sizing, acceptance criteria, artifact formats.
- `references/02-execute.md` — executor protocol: TDD, task tracking, stop conditions.
- `references/03-surgical.md` — impact analysis and minimal-edit rules.
- `references/04-verify.md` — ladder order, evidence, and the verification artifact.
- `references/05-archive.md` — archive layout and cleanup.
- `references/06-review.md` — review rubric and finding format.
- `references/07-feedback.md` — the ladder, command detection, `out/checks.md`, parity, CI/CD boundary.

`references/07-feedback.md` is the single source for the ladder and the command strings. No other file restates them.

## Intake

Ask only what changes the plan:

1. Is this a new feature, a fix, a refactor, or a review?
2. Which repo or directory is the target?
3. Is there a hard constraint: compatibility, deadline, dependency, or non-goal?

Read the code before proposing. Do not ask the user for facts the repository already answers.

Check for a feedback loop: a test command, a linter, a CI config, and a git hook. If any of them is absent, load the `feedback-loop-setup` skill before Plan. Scaffolding is its job, not this skill's.

## Agents

| Agent | Mode | Job |
|---|---|---|
| `architect` | primary | Routes, writes proposal, plan and checks, gates, verifies, archives |
| `executor` | subagent | Implements planned tasks with TDD |
| `surgeon` | subagent | Makes one precise fix with impact analysis |
| `reviewer` | subagent | Read-only review; never edits |

The architect passes an `[Architecture Context]` block and a `[Task List]` block to a subagent. A subagent that receives neither stops and asks.

## Hard rules

- No code before an approved proposal, except Fix mode with an obvious cause.
- No task is `[x]` until its test or check passes.
- Commands come from `out/checks.md`. Never invent a command; an absent step stays absent.
- Local script, git hook, and CI job run the same command string. A mismatch is a defect.
- A named gate may be bypassed once when the user explicitly says `bypass`, `warn only`, or `override` in chat. Record the gate, user words, findings, and accepted risk in `out/verification.md` before continuing. Default is a hard stop.
- Bypass never covers CI green, a passing verdict before Archive, deploy, release, rollback, secrets, commit, amend, push, or tag.
- TDD when a test can be written. Reproduce a bug before fixing it.
- No placeholder, stub, or `TODO` in delivered code.
- Match the repository's existing style, formatter, and type rules.
- Touch only what the task requires. Do not reformat adjacent code.
- Never commit or push unless the user explicitly asks.
- Never archive a change whose verification failed or whose CI is not green.
- Never deploy, release, roll back, or handle secrets. Those live in CD scripts outside this cycle.
- Report failures with the exact command and the shortest decisive error line.

## Done when

The requested mode's gate passes. For a full cycle: `out/verification.md` says `pass`, every task is `[x]`, CI is green on the recorded commands, and the user has seen the result. Archive only after confirmation.
