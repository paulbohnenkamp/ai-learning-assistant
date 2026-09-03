---
id: 001-learning-assistant-demo
title: Local-first AI learning assistant demo
status: in-progress
created: 2026-09-02
updated: 2026-09-02
result: results/001-learning-assistant-demo.md
---

## Goal

Create a simple runnable business chatbot demonstrating a focused learner and
trainer experience for software-development practice.

## Non-goals

- Production authentication, persistence, analytics, or multi-tenant behavior.
- A real external model call before its provider contract and secret handling
  are agreed.

## Current-state findings

The new repository did not exist. Node `v24.14.1` is the available runtime.

## Chosen approach

Use Next.js with a React client and same-origin proxy, plus a Spring Boot
microservice. Spring AI's `ChatClient` is the external model adapter; a
deterministic local response path keeps the demo runnable without a secret.

## Affected files

`app/`, `backend/`, `src/domain/`, `content/`, `tests/`, `.env.example`,
`AGENTS.md`, and `README.md`.

## Acceptance criteria

- A learner/trainer can select a role and send a chat message in the browser.
- The API validates input and returns a role-aware response.
- The app runs without an API key in local mode.
- Spring Boot tests cover the local service path.
- README documents setup, environment variables, architecture, and next steps.
- Typecheck, tests, and production build pass.

## Verification commands

```bash
npm install
npm run typecheck
npm test
npm run build
npm run dev
curl -s -X POST http://localhost:3000/api/chat -H 'content-type: application/json' -d '{"message":"Explain Java microservices","role":"learner"}'
```

## Risks and open questions

The requested model name appears to be a placeholder or custom deployment name;
the provider API and exact authentication contract remain open.

## Progress log

- 2026-09-02: Created isolated repository and initial implementation.

## Decision log

- 2026-09-02: Defaulted to local deterministic mode so the demo is runnable
  without exposing a token or assuming an unverified provider API.
