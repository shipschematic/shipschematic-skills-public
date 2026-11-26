# Propose

Write a proposal the user can approve or reject in one read.

## Inputs

- The user's intent, in their words.
- The target repository and the code that would change.
- Constraints: compatibility, deadline, dependencies, non-goals.
- Existing issues, specs, or OpenSpec changes when present.
- Check availability: which ladder steps in `references/07-feedback.md` are `present` and which are `absent`.
- CI and CD constraints: the CI config path, whether CI is currently green, and where deploy, release, or rollback run.

Read the code before writing. A proposal built on guesses is worse than no proposal.

## Steps

1. Locate the code path that would change. Read the entry point, the data flow, and the nearest tests.
2. State the problem in one paragraph. Include the cost of leaving it unsolved.
3. List two or three options, including "do nothing" when it is credible.
4. Recommend one option and say why. Name the trade-off.
5. Define scope: what is in, what is out, what is deferred.
6. List risks and unknowns. Mark each as `known` or `assumption`.
7. Define acceptance criteria the user can check.
8. Estimate effort in hours or task count. Do not promise a date.
9. Write `out/proposal.md`.

If OpenSpec is installed, create the change with `openspec propose` and keep the same content. Otherwise use the template below.

## Template

```markdown
# Proposal: {feature}

## Problem
{one paragraph, with the cost}

## Options
1. {option} — {trade-off}
2. {option} — {trade-off}

## Recommendation
{option}, because {reason}.

## Scope
- In: {items}
- Out: {items}
- Deferred: {items}

## Acceptance criteria
- {observable result}
- {observable result}

## Feedback loop
- Checks present: {ladder steps with a real command}
- Checks absent: {ladder steps with none}
- CI: {config path} — {green | red | unknown}
- CD: {deploy, release, rollback paths, or none}

## Risks
- {risk} — {mitigation} — known | assumption

## Effort
{hours or task count}
```

## Gate

Present the proposal in chat. Wait for explicit approval: "approved", "go", "yes", or a named option.

If the user rejects it, ask which part is wrong, revise, and present again. Do not start coding on a rejected proposal.

## Rules

- No code in the proposal. Signatures or file names are fine; implementation is not.
- No undefined placeholder. Every option names real files or real behavior.
- Name missing checks and CI status as risks, not as assumptions of a working loop.
- Keep it under one screen. Move detail to the plan.
