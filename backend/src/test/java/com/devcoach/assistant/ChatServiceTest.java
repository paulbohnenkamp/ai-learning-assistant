package com.devcoach.assistant;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.ObjectProvider;

class ChatServiceTest {
    @Test
    void localModeAnswersMicroserviceQuestionWithoutAnApiKey() {
        ObjectProvider<org.springframework.ai.chat.client.ChatClient.Builder> noClient = new ObjectProvider<>() {
            public org.springframework.ai.chat.client.ChatClient.Builder getObject(Object... args) { throw new IllegalStateException(); }
            public org.springframework.ai.chat.client.ChatClient.Builder getIfAvailable() { return null; }
            public org.springframework.ai.chat.client.ChatClient.Builder getIfUnique() { return null; }
            public java.util.Iterator<org.springframework.ai.chat.client.ChatClient.Builder> iterator() { return java.util.Collections.emptyIterator(); }
        };
        ChatService service = new ChatService(noClient, "local", "gpt-5.6-luna");

        ChatResponse response = service.answer(new ChatRequest("Explain Java microservices", UserRole.learner));

        assertTrue(response.message().content().contains("independently deployable"));
        assertTrue(response.mode().equals("local"));
    }
}
