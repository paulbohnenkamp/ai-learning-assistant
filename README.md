# DevCoach AI

DevCoach AI is a small, runnable learning assistant that gives software-
development learners explanations, exercises, and troubleshooting guidance,
while giving trainers help with quizzes and assignments.

![DevCoach AI chat interface](docs/app-screenshot.png)

## What it demonstrates

- Role-aware learner and trainer experiences.
- A deterministic local response path that runs without a model token.
- A Spring Boot API boundary for validation and optional model integration.
- A simple same-origin path from the React UI to the backend.

## AI interaction flow

1. A learner or trainer submits a message and selected role in the chat UI.
2. The Next.js same-origin route validates the request before forwarding it.
3. Spring Boot `ChatService` chooses the deterministic local path or the
   Spring AI/LLM path.
4. The backend returns a structured response containing the assistant message,
   execution mode, and model identifier.
5. The UI renders the response as Markdown.

This demonstrates boundary validation, server-side provider isolation,
deterministic fallbacks, structured responses, and a replaceable model path.

## Technology used

- **React / Next.js** — render the chat experience and same-origin API route.
- **TypeScript** — validates and shares the frontend request/response model.
- **Spring Boot / Java** — own backend validation and chat orchestration.
- **Spring AI** — isolates optional model-provider calls behind `ChatService`.
- **OpenAI starter** — connects the external mode to a configured model.

## Quick start

```bash
cp .env.example .env
npm install
npm run dev
```

In a second terminal:

```bash
cd backend
mvn spring-boot:run
```

Open <http://localhost:3000>. The default `CHAT_MODE=local` is deterministic and
does not require credentials.

## Further reading

- [Development and provider configuration](docs/development.md)
- [Architecture](docs/architecture.md)
- [Project scope](specs/001-learning-assistant-demo.md)
