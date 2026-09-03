import test from "node:test";
import assert from "node:assert/strict";
import { parseChatRequest } from "../src/domain/chat";

test("parses a valid learner request at the boundary", () => {
  assert.deepEqual(parseChatRequest({ message: "  Explain React  ", role: "learner" }), { message: "Explain React", role: "learner" });
});

test("rejects malformed external input", () => {
  assert.equal(parseChatRequest({ message: "", role: "learner" }), null);
  assert.equal(parseChatRequest({ message: "hello", role: "admin" }), null);
});

test("parses both supported business personas", () => {
  assert.deepEqual(parseChatRequest({ message: "create a quiz", role: "trainer" })?.role, "trainer");
  assert.deepEqual(parseChatRequest({ message: "create a quiz", role: "learner" })?.role, "learner");
});
