package com.devcoach.assistant;

/** The two business personas supported by the demo. */
enum UserRole { learner, trainer }

record ChatRequest(String message, UserRole role) {}

record ChatMessage(String id, String role, String content) {}

record ChatResponse(ChatMessage message, String mode, String model) {}
