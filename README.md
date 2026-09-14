# Vouchstone

Evidenced cyber assurance — OpenAPI-first DDD monorepo (`@vouchstone/*`).

Product specs: [PRODUCT.md](./PRODUCT.md) · [USER_STORIES.md](./USER_STORIES.md) · [WEBAPP.md](./WEBAPP.md)

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
platform/webapp  → API clients + product UI
```

## Setup (required: `.codegen`)

`.codegen/` is **never committed**. Copy it from the scaffold after clone:

```bash
rsync -a --exclude '**/__pycache__' --exclude '*.pyc' \
  /path/to/zero-apps-codegen-scaffold/.codegen/ \
  ./.codegen/

# Python 3.12+ venv for zero-codegen (lives under .codegen/, also gitignored)
/opt/homebrew/bin/python3.12 -m venv .codegen/.venv
.codegen/.venv/bin/pip install -e .codegen/codegen

pnpm install
pnpm codegen:paths
```

Use `.codegen/.venv/bin/python` (not system Python 3.9) when invoking codegen.
For webapp layer regen, keep `pipeline.clean: false` in `.codegen/.zero-codegen-merged.json`
so service/facade/hooks generators do not wipe each other.

## Quick start

```bash
pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: vouchstone_demo_local_dev_key

pnpm --filter @vouchstone/webapp dev
```

Optional Dynamo Local:

```bash
docker compose up -d
TABLE_NAME=vouchstone-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
```

## Codegen rules

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. Never commit `.codegen/` or `packages/openapi-core/src/.bundled/`.

See `.cursor/skills/` and `docs/CODEGEN.md`.
