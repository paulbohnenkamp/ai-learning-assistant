# Architecture

```text
React chat UI → Next.js same-origin proxy → Spring Boot /api/chat
                                           ├→ local response service
                                           └→ Spring AI ChatClient → model
```

The local response service is deliberately small and deterministic so the core
learning flow can be tested without an external provider. The backend validates
incoming JSON before business logic runs and keeps model calls behind the
Spring AI boundary.

The prototype does not claim production readiness. A production implementation
would need authentication, conversation persistence, retrieval over approved
course documents, moderation, observability, and a provider adapter behind the
same API boundary.
