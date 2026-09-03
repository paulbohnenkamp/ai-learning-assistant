# Learning catalog

This is the business knowledge used by the local demo response engine.

## Java microservices

A Java microservice is a small, independently deployable application that owns
one business capability. A typical Spring Boot service exposes REST endpoints,
validates input, talks to a database, and publishes useful health information.

## React fundamentals

React components should have one clear responsibility. State belongs close to
the interaction that owns it, and effects should be used for synchronization
with systems outside React.

## AI-augmented development

An AI coding tool can draft code, tests, documentation, and refactors. A senior
developer still owns the design, reviews generated code, protects secrets, and
runs tests. Claude Code, GitHub Copilot, and Cursor are development tools, not
substitutes for engineering judgment.

## Practice assignment

Build an Order Service with Spring Boot. Add `POST /orders` and
`GET /orders/{id}`, validate the request, persist the order, and write unit tests.
