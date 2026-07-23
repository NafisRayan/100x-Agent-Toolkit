---
name: system-design-coach
description: Expert system design coach covering scalability, distributed systems, and interview preparation based on Alex Xu's System Design Interview books (Vol 1 & 2). Use when designing large-scale systems, preparing for system design interviews, or needing architecture guidance for specific components like rate limiters, chat systems, payment systems, etc.
license: MIT
metadata:
  author: Nafis Rayan
  version: "1.0.0"
  domain: architecture
  triggers: system design, system design interview, design a, scale, scalability, distributed system, back of the envelope, rate limiter, consistent hashing, key-value store, unique id generator, url shortener, web crawler, notification system, news feed, chat system, search autocomplete, youtube design, google drive design, proximity service, nearby friends, google maps design, message queue, metrics monitoring, ad click, hotel reservation, email service, object storage, leaderboard, payment system, digital wallet, stock exchange, architecture interview, high level design, HLD, design interview prep
  role: coach
  scope: system-design
  output-format: design-analysis
  related-skills: database-optimizer, planning-and-task-breakdown, pro-task-breakdown
---

# System Design Pro

Expert system design coach grounded in Alex Xu's *System Design Interview* books (Vol 1 & 2). Covers the full spectrum from foundational concepts to real-world system designs.

## When to Use This Skill

- Preparing for system design interviews
- Designing or reviewing large-scale distributed systems
- Performing back-of-the-envelope estimations for capacity planning
- Learning about specific system design patterns (rate limiting, consistent hashing, etc.)
- Architecting real-world systems like chat, payment, search, or video platforms

## Core Workflow

1. **Understand the Problem** — Clarify requirements, ask clarifying questions, establish design scope and constraints
2. **Estimate Scale** — Perform back-of-the-envelope calculations for storage, bandwidth, QPS, and memory
3. **Propose High-Level Design** — Present architecture diagram, identify core components, and get agreement on the approach
4. **Deep Dive** — Walk through detailed component design, data models, API design, and key algorithms
5. **Address Trade-offs** — Discuss bottlenecks, failure modes, scaling strategies, and operational concerns
6. **Wrap Up** — Summarize decisions, identify future improvements, and discuss monitoring/alerting

> This workflow follows the 4-step framework from Chapter 3. Always start with requirements before jumping to solutions.

## Reference Guide

Load the relevant chapter based on the system being designed or the concept being studied:

### Foundational Concepts

| Topic | Reference | Load When |
|-------|-----------|-----------|
| Scaling Fundamentals | `01. Scaling/Readme.md` | Learning about vertical vs horizontal scaling, load balancers, CDNs, caching, database replication/sharding |
| Back-of-the-Envelope Estimation | `02. Back Of the Envelope Estimation/Readme.md` | Estimating QPS, storage, bandwidth, or memory for any system |
| System Design Framework | `03. System Design Framework/Readme.md` | Understanding the 4-step interview framework or structuring any design session |

### Core Building Blocks

| Topic | Reference | Load When |
|-------|-----------|-----------|
| Rate Limiter | `04. Rate Limiter/Readme.md` | Designing API rate limiting, token bucket, sliding window algorithms |
| Consistent Hashing | `05. Consistent Hashing/Readme.md` | Distributing data across nodes, virtual nodes, hash rings |
| Key-Value Store | `06. Key-Value Store/Readme.md` | Designing distributed KV stores, CAP theorem, replication strategies |
| Unique ID Generator | `07. Unique-Id Generator/Readme.md` | Generating distributed unique IDs, Snowflake, UUID strategies |

### Web & Content Systems

| Topic | Reference | Load When |
|-------|-----------|-----------|
| URL Shortener | `08. URL Shortener/Readme.md` | Designing URL shortening services, hash functions, base62 encoding |
| Web Crawler | `09. Web Crawler/Readme.md` | Designing web crawlers, BFS traversal, politeness, deduplication |
| News Feed System | `11. News Feed System/Readme.md` | Designing social media feeds, fan-out strategies, ranking |
| Search Autocomplete | `13. Search Autocomplete/Readme.md` | Designing typeahead/autocomplete, trie data structures, prefix matching |
| YouTube | `14. Youtube/Readme.md` | Designing video streaming platforms, transcoding, CDN delivery |
| Google Drive | `15. Google Drive/Readme.md` | Designing file storage/sync, block-level sync, conflict resolution |

### Communication & Real-Time Systems

| Topic | Reference | Load When |
|-------|-----------|-----------|
| Notification System | `10. Notification System/Readme.md` | Designing push notifications, SMS, email delivery pipelines |
| Chat System | `12. Chat System/Readme.md` | Designing messaging platforms, WebSocket, online presence |
| Distributed Message Queue | `19. Distributed Message Queue/Readme.md` | Designing message brokers, producer-consumer patterns, ordering guarantees |

### Location & Geo Systems

| Topic | Reference | Load When |
|-------|-----------|-----------|
| Proximity Service | `16. Proximity Service/Readme.md` | Designing location-based search, geohashing, quadtrees |
| Nearby Friends | `17. Nearby Friends/Readme.md` | Designing real-time location sharing, WebSocket pub/sub |
| Google Maps | `18. Google Maps/Readme.md` | Designing navigation, map tile serving, shortest path algorithms |

### Infrastructure & Monitoring

| Topic | Reference | Load When |
|-------|-----------|-----------|
| Metrics Monitoring & Alerting | `20. Metrics Monitoring and Alerting System/Readme.md` | Designing monitoring pipelines, time-series databases, alerting rules |
| Ad Click Event Aggregation | `21. Ad Click Event Aggregation/Readme.md` | Designing real-time event aggregation, MapReduce, stream processing |
| S3-like Object Storage | `24. S3-like Object Storage/Readme.md` | Designing object storage, data durability, erasure coding |

### Business & Transaction Systems

| Topic | Reference | Load When |
|-------|-----------|-----------|
| Hotel Reservation System | `22. Hotel Reservation System/Readme.md` | Designing booking systems, inventory management, concurrency control |
| Distributed Email Service | `23. Distributed Email Service/Readme.md` | Designing email platforms, SMTP, storage, search |
| Real-time Gaming Leaderboard | `25. Real-time Gaming Leaderboard/Readme.md` | Designing leaderboards, sorted sets, Redis-based ranking |
| Payment System | `26. Payment System/Readme.md` | Designing payment processing, idempotency, reconciliation |
| Digital Wallet | `27.  Digital Wallet/Readme.md` | Designing wallet services, balance management, distributed transactions |
| Stock Exchange | `28. Stock Exchange/Readme.md` | Designing trading platforms, order matching engines, low-latency architectures |

## How to Coach

When helping with system design:

1. **Don't give the full answer upfront.** Ask the user what they think first, then guide them.
2. **Start broad, go deep.** Begin with high-level architecture, then drill into the components that matter most.
3. **Always quantify.** Use back-of-the-envelope estimation to justify design decisions.
4. **Discuss trade-offs explicitly.** There is no perfect design — every choice has consequences.
5. **Reference real systems.** Cite how companies like Discord, Netflix, Uber, or Google solved similar problems (the chapter references include these).
