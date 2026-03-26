---
title: "Observability for Engineers Who Don't Think They Need It"
status: "in-progress"
abstract: "Most engineers think observability is someone else's job — an ops problem, a platform team problem, a future problem. This talk challenges that assumption. Through real examples of shipping features blind vs. with intent, we explore how instrumenting your own code changes how you think about it. You'll leave with practical patterns for adding meaningful telemetry to any codebase, and a different relationship with your production systems."
tags: ["observability", "opentelemetry", "grafana", "engineering-culture"]
---

## Outline

### The Problem
- What happens when you ship without observability
- Real incidents that better data would have prevented
- The "it works on my machine" problem, extended to production

### Shifting Left on Observability
- Instrumentation as a design activity, not an afterthought
- What to measure vs. what to log vs. what to trace
- OpenTelemetry basics: the lingua franca of observability

### Practical Patterns
- The RED method for services (Rate, Errors, Duration)
- Structured logging that a human can read and a machine can index
- Tracing across service boundaries without losing your mind

### Building the Habit
- Making instrumentation part of your PR checklist
- Dashboard-driven development
- How to convince your team it's worth the time

## Notes

Target audience: mid-level backend engineers who've never set up their own observability tooling.
Conference targets: KubeCon, Grafana CONline, local meetups.
