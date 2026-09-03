package com.devcoach.assistant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/** Starts the independently deployable learning-assistant microservice. */
@SpringBootApplication
public class LearningAssistantApplication {
    public static void main(String[] args) {
        SpringApplication.run(LearningAssistantApplication.class, args);
    }
}
