/**
 * The domain model for one chat turn.
 *
 * Keeping this shape in one place prevents the UI and API route from slowly
 * inventing different names for the same business concepts.
 */
export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  readonly id: string;
  readonly role: ChatRole;
  readonly content: string;
};

export type ChatRequest = {
  readonly message: string;
  readonly role: "learner" | "trainer";
};

export type ChatResponse = {
  readonly message: ChatMessage;
  readonly mode: "local" | "external";
  readonly model: string;
};

/** Boundary validation: untrusted JSON becomes a trusted request here. */
export function parseChatRequest(input: unknown): ChatRequest | null {
  if (typeof input !== "object" || input === null) return null;
  if (!("message" in input) || !("role" in input)) return null;

  const candidate = input as { message?: unknown; role?: unknown };
  if (typeof candidate.message !== "string" || candidate.message.trim() === "") return null;
  if (candidate.role !== "learner" && candidate.role !== "trainer") return null;

  return { message: candidate.message.trim(), role: candidate.role };
}
