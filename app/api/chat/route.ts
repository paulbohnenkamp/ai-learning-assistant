import { NextResponse } from "next/server";
import { parseChatRequest } from "@/src/domain/chat";

/**
 * Server-side boundary for chat.
 *
 * The model configuration is read here, never in the browser. The local mode
 * is the default because a demo should run safely without sending learner data
 * to a third party. The actual chat business logic belongs to Spring Boot;
 * this route is only a same-origin browser proxy.
 */
export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = parseChatRequest(body);

  if (!parsed) {
    return NextResponse.json({ error: "message and role are required" }, { status: 400 });
  }

  const backendResponse = await fetch(`${process.env.BACKEND_URL ?? "http://localhost:8080"}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed),
    cache: "no-store",
  }).catch(() => null);

  if (!backendResponse) {
    return NextResponse.json({ error: "Spring Boot service is not running. Start it with ./mvnw spring-boot:run." }, { status: 503 });
  }

  const payload: unknown = await backendResponse.json();
  return NextResponse.json(payload, { status: backendResponse.status });
}
