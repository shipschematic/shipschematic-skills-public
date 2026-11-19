#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

PACK="${1:-}"
BUMP="${2:-}"

say() { printf '%s\n' "$*"; }
die() { printf 'error: %s\n' "$*" >&2; exit 1; }

command -v npm >/dev/null || die "npm is required"
command -v node >/dev/null || die "node is required"

[ -n "$PACK" ] || die "usage: ./publish.sh <pack> [patch|minor|major|<version>]"

PACK_DIR="packs/$PACK"
[ -f "$PACK_DIR/package.json" ] || die "unknown pack: $PACK"

NAME="$(node -p "require('./$PACK_DIR/package.json').name")"
CURRENT="$(node -p "require('./$PACK_DIR/package.json').version")"

[ -z "$(git status --porcelain)" ] || die "working tree is dirty; commit first"
git remote get-url origin >/dev/null 2>&1 || die "no git remote named origin"

if [ -z "${NPM_TOKEN:-}" ]; then
  npm whoami >/dev/null 2>&1 || die "not logged in; run: npm login"
fi

if [ -n "$BUMP" ]; then
  say "Bumping $PACK from $CURRENT"
  (
    cd "$PACK_DIR"
    npm version "$BUMP" \
      --message "chore: release $PACK v%s" \
      --tag-version-prefix "$PACK-v"
  )
fi

VERSION="$(node -p "require('./$PACK_DIR/package.json').version")"
TAG="$PACK-v$VERSION"

say "Publishing $NAME@$VERSION"

args=(-w "$NAME" --access public)
if [ -n "${NPM_TOKEN:-}" ]; then
  args+=(--//registry.npmjs.org/:_authToken="$NPM_TOKEN")
fi
if [ -n "${NPM_OTP:-}" ]; then
  args+=(--otp="$NPM_OTP")
fi

if ! npm publish "${args[@]}"; then
  cat >&2 <<EOF

Publish failed. Common causes:
  403 suspended        wait for npm support. Do not retry in a loop.
  2FA required         rerun with: NPM_OTP=123456 ./publish.sh $PACK
  version exists       bump first: ./publish.sh $PACK patch

The version commit and tag stay local if the bump ran. Delete them only
if you are sure you will reuse the version:
  git reset --hard HEAD~1
  git tag -d $TAG
EOF
  exit 1
fi

PUBLISHED="$(npm view "$NAME" version)"
[ "$PUBLISHED" = "$VERSION" ] || die "registry reports $PUBLISHED, expected $VERSION"

say "Pushing commit and tag"
git push --follow-tags

if command -v gh >/dev/null 2>&1; then
  TGZ="$(npm pack -w "$NAME" --silent | tail -n1)"
  if gh release view "$TAG" >/dev/null 2>&1; then
    gh release upload "$TAG" "$TGZ" --clobber
  else
    gh release create "$TAG" "$TGZ" --title "$TAG" --generate-notes
  fi
fi

say "Published: https://www.npmjs.com/package/$NAME"
say "Install:   npx $NAME"
