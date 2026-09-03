"use client";

import { FormEvent, useState } from "react";
import Markdown from "react-markdown";
import type { ChatMessage } from "@/src/domain/chat";

const starterPrompts = ["Explain Java microservices", "Give me a React exercise", "Create a quiz"];

export default function HomePage() {
  const [role, setRole] = useState<"learner" | "trainer">("learner");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", role: "assistant", content: "Hi! I’m DevCoach AI. I can explain concepts, create practice work, or help troubleshoot code." },
  ]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function sendMessage(event?: FormEvent) {
    event?.preventDefault();
    const message = draft.trim();
    if (!message || isSending) return;

    setDraft("");
    setMessages((current) => [...current, { id: crypto.randomUUID(), role: "user", content: message }]);
    setIsSending(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, role }),
      });
      const data: { message?: ChatMessage; error?: string } = await response.json();
      if (!response.ok || !data.message) throw new Error(data.error ?? "Chat request failed");
      setMessages((current) => [...current, data.message!]);
    } catch (error) {
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: error instanceof Error ? error.message : "Something went wrong." }]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="shell">
      <section className="hero">
        <div className="eyebrow">AI learning assistant · local demo</div>
        <h1>Build confidence,<br /><em>one question</em> at a time.</h1>
        <p className="lede">DevCoach AI gives learners and trainers a focused place to learn full-stack engineering with practical, reviewable guidance.</p>
        <div className="pills"><span>Java + Spring Boot</span><span>Node.js</span><span>React</span><span>AI-augmented development</span></div>
      </section>

      <section className="workspace" aria-label="DevCoach chat">
        <header className="chat-header">
          <div><div className="bot-name"><span className="status-dot" /> DevCoach AI</div><div className="muted">Your full-stack learning partner</div></div>
          <label className="role-select">I am a <select value={role} onChange={(event) => setRole(event.target.value as "learner" | "trainer")}><option value="learner">Learner</option><option value="trainer">Trainer</option></select></label>
        </header>
        <div className="messages" aria-live="polite">
          {messages.map((message) => <div className={`message-row ${message.role}`} key={message.id}><div className="avatar">{message.role === "assistant" ? "✦" : "You"}</div><div className="message"><div className="message-label">{message.role === "assistant" ? "DevCoach" : "You"}</div><div className="message-content">{message.role === "assistant" ? <Markdown>{message.content}</Markdown> : message.content}</div></div></div>)}
          {isSending && <div className="message-row assistant"><div className="avatar">✦</div><div className="message muted">Thinking…</div></div>}
        </div>
        <div className="suggestions">{starterPrompts.map((prompt) => <button key={prompt} onClick={() => setDraft(prompt)}>{prompt} <span>↗</span></button>)}</div>
        <form className="composer" onSubmit={sendMessage}><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Ask about your learning path…" aria-label="Message DevCoach AI" /><button type="submit" disabled={isSending || !draft.trim()} aria-label="Send message">↑</button></form>
        <div className="privacy-note">Server-side model · key stays private · Markdown responses</div>
      </section>
    </main>
  );
}
