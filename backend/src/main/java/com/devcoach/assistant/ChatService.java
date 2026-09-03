package com.devcoach.assistant;

import java.util.Locale;
import java.util.UUID;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.stereotype.Service;

/**
 * Application service that owns the chat use case.
 *
 * The local path is deterministic, making the demo and its tests useful with
 * no network or secret. When CHAT_MODE=external, Spring AI's ChatClient is used
 * through the same service boundary.
 */
@Service
public class ChatService {
    private final ChatClient chatClient;
    private final String mode;
    private final String model;

    public ChatService(
            ObjectProvider<ChatClient.Builder> chatClientBuilderProvider,
            @Value("${chat.mode:local}") String mode,
            @Value("${MODEL:gpt-5.6-luna}") String model) {
        this.mode = mode;
        this.model = model;
        ChatClient.Builder chatClientBuilder = chatClientBuilderProvider.getIfAvailable();
        this.chatClient = chatClientBuilder == null ? null : chatClientBuilder.build();
    }

    public ChatResponse answer(ChatRequest request) {
        String content = mode.equalsIgnoreCase("external")
                ? requireChatClient().prompt()
                    .system("You are DevCoach AI, a concise software engineering coach for learners and trainers. "
                            + "Focus on Java, Spring Boot, Node.js, React, microservices, and responsible AI-augmented development.")
                    .user(request.message())
                    .call()
                    .content()
                : localReply(request);

        return new ChatResponse(new ChatMessage(UUID.randomUUID().toString(), "assistant", content), mode, model);
    }

    private ChatClient requireChatClient() {
        if (chatClient == null) {
            throw new IllegalStateException("CHAT_MODE=external requires a configured Spring AI ChatClient and API key");
        }
        return chatClient;
    }

    private String localReply(ChatRequest request) {
        String text = request.message().toLowerCase(Locale.ROOT);
        if (text.contains("microservice") || text.contains("spring boot")) {
            return "A Java microservice is a small, independently deployable service that owns one business capability. "
                    + "For practice, build a Spring Boot Order Service with POST /orders, GET /orders/{id}, validation, persistence, and unit tests.";
        }
        if (text.contains("react") || text.contains("hook")) {
            return "For React practice, build a course-progress component with useState for the selected lesson and a form that marks it complete. Test the learner-visible behavior.";
        }
        if (text.contains("quiz") || text.contains("question")) {
            return request.role() == UserRole.trainer
                    ? "Starter quiz: 1) What makes a microservice independently deployable? 2) Where should React state live? 3) What must a developer review in AI-generated code?"
                    : "Try this question: What is the difference between a monolith and a microservice? Reply with your answer and I will give feedback.";
        }
        if (text.contains("error") || text.contains("stuck") || text.contains("help")) {
            return "Share the error message, the smallest relevant code sample, and what you expected to happen. I will help isolate the cause and suggest a test.";
        }
        return request.role() == UserRole.trainer
                ? "I can help create quizzes, assignments, and feedback for Java, Node.js, React, microservices, and AI-augmented development."
                : "I can explain Java, Node.js, React, microservices, or AI-augmented development; generate practice work; and help troubleshoot code.";
    }
}
