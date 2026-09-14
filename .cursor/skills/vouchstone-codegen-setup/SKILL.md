---
name: vouchstone-codegen-setup
description: >-
  Local zero-codegen setup for Vouchstone. Use when cloning the repo, running
  codegen, or when .codegen is missing. Never commit .codegen to GitHub.
---

# Vouchstone codegen setup

## Hard rule

**Never commit or push `.codegen/` to GitHub.** It is gitignored. The tool is copied from the scaffold for local use only.

## After clone

```bash
# From a machine that has the scaffold
rsync -a --exclude '**/__pycache__' --exclude '*.pyc' \
  /path/to/zero-apps-codegen-scaffold/.codegen/ \
  /path/to/ai-cyber-vouchstone/.codegen/

cd /path/to/ai-cyber-vouchstone
pnpm install
pnpm codegen:paths
```

## Package scope

All packages use `@vouchstone/*`. Config: `package_scope` in `.codegen/.zero-codegen-merged.json`.

## Modes

- **Mode A (new domain):** full multi-layer generate for that domain.
- **Mode B (YAML edit):** bundle → `--layers core` only → handwrite platform/webapp deltas.
