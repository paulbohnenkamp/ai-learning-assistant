# AI Learning Assistant

## Purpose

This repository is a small, runnable demonstration of an AI learning assistant
for learners and trainers. It is intentionally a local-first prototype.

## Working rules

- Keep learning behavior in `content/` and pure domain logic in `src/domain/`.
- Keep external model calls behind the Spring AI boundary in `backend/`.
- Never put `MODEL_KEY` or an API key in client-side code.
- Prefer small, typed functions over broad utility modules.
- Run `npm run typecheck`, `npm test`, and `npm run build` before declaring work complete.
- Update `README.md` when the run instructions or configuration changes.

## Environment

Copy `.env.example` to `.env`. `MODEL_KEY` is the name of the shell variable that
would hold a secret; it is not itself a secret. The default `CHAT_MODE=local`
uses deterministic responses and does not require a network or API key.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
