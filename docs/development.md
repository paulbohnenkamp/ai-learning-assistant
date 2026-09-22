# Development

## Local setup

Copy `.env.example` to `.env`, install the frontend dependencies, and start the
Next.js application:

```bash
cp .env.example .env
npm install
npm run dev
```

Start the Spring Boot service separately:

```bash
cd backend
mvn spring-boot:run
```

The frontend is available at `http://localhost:3000`.

## Chat modes

`CHAT_MODE=local` uses a deterministic response service and is the default for
local development and tests. `CHAT_MODE=external` routes requests through
Spring AI and the configured model provider. Keep `MODEL_KEY` in the ignored
local `.env` file; it must never be placed in browser code or committed.

## Verification

```bash
npm run typecheck
npm test
npm run build
cd backend && mvn test
```

While the services are running, the API can be exercised through the same-origin
proxy:

```bash
curl -s -X POST http://localhost:3000/api/chat \
  -H 'content-type: application/json' \
  -d '{"message":"Explain Java microservices","role":"learner"}'
```
