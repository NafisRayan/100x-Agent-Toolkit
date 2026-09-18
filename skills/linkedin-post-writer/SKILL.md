---
name: linkedin-post-writer
description: Write technical LinkedIn posts that read like a developer sharing hands-on results from real testing, building, or research. Use this skill whenever the user wants to write, draft, or turn notes into a LinkedIn post, especially about engineering topics, tools, benchmarks, comparisons, or AI workflows - even if they just say "make a post" or "turn these notes into a LinkedIn post" without saying "technical". Also use it when asked to rewrite or shorten an existing post into this style, or when the user pastes raw technical notes and clearly wants social content. Covers structure (hook, ☆ sections, bullets), voice, hashtag selection, and the hard 3,000-character limit.
license: MIT
metadata:
  author: Nafis Rayan
  version: "1.0.0"
  domain: content-writing
  triggers: linkedin post, make a post, write a post, linkedin, turn notes into a post, social media post, developer post, technical post, draft a post, post about X, share on linkedin, hashtag, tech content, linkedin draft, write about what I built
  role: writer
  scope: technical-social-content
  output-format: linkedin-post
  related-skills: system-design-coach
---

# Technical LinkedIn Post Writer

Write technical LinkedIn posts that feel like a developer sharing the results of hands-on experience, testing, building, or research. The post is technical but easy to scan, practical rather than theoretical, confident without sounding promotional, and dense with useful information.

The golden rule: the reader should finish it thinking "this person actually built/tested this" - never "this is a guide trying to sell me something."

## Core Structure

### 1. Strong Opening Hook

Start with 1 short paragraph that establishes:

- The problem, trend, technology, or observation
- What was tested, built, compared, or learned
- Why the reader should care

Example pattern:

> [Topic] has become increasingly important for [context]. I tested/built/compared [specific things] through hands-on work and wanted to share what I learned.

Never open generically. Banned openings:

- "Technology is changing rapidly."
- "In today's digital world..."
- "As developers, we all know..."

### 2. Structured Sections

Use `☆` section headings. Recommended patterns:

- `☆ Why [Topic] Matters`
- `☆ The Modern Stack`
- `☆ Key Technologies`
- `☆ What I Found`
- `☆ Built for Real-World Use`
- `☆ AI Supercharges [Topic]`
- `☆ Why I Prefer [Technology]`
- `☆ Why It Matters`

Use only the sections that fit the subject. Usually 4-6 sections are enough.

### 3. Bullet Style

Use short bullets beginning with `-`. Each bullet needs:

- A clear concept
- A concrete technology, capability, result, or benefit
- A short explanation

Good:

- Native LSP: Real-time diagnostics and go-to-definition directly in the CLI
- RBAC: Give finance, support and operations exactly the access they need

Avoid long paragraphs inside bullets.

## Technical Density

Prioritize concrete details over vague claims. Include relevant frameworks, libraries, languages, tools, APIs, architectures, models, protocols, features, performance observations, workflow differences, and real-world use cases.

Prefer:

- `Next.js 16 + TypeScript + Tailwind CSS v4`

over:

- `Modern technologies for scalable development`

When comparing technologies, state the observed tradeoff. Say "Tool A: Fast and lightweight, but lacks debugging", not "Tool A: Good".

## Comparison Style

When comparing multiple technologies:

- Name: Technology/language, key strengths, key limitation

Keep each comparison factual and concise. Frame personal conclusions as personal experience ("After weeks of testing, OMP became my daily driver"), never as universal claims like "the best tool for everyone."

## AI / Technology Sections

When relevant, include a dedicated section showing how AI changes the workflow, such as `☆ AI Supercharges Internal Tooling`. Cover concrete capabilities: automation, analytics, agents, model routing, natural-language interfaces, multimodal workflows, forecasting, code generation, debugging. Avoid vague AI hype.

## Ending

End with:

1. A concise summary of the main takeaway
2. A forward-looking statement or personal conclusion

Examples:

- The future of development is terminal-first + AI-native.
- The future of business is data-driven. Your admin panel becomes the interface through which the business operates.

The ending should feel like a conclusion, not a sales pitch.

## Hashtags

Finish with relevant LinkedIn hashtags in this format:

`hashtag#AI hashtag#Programming hashtag#DevTools`

Use 8-20 highly relevant hashtags. Do not add unrelated trending hashtags just to increase reach.

## Voice

- First person when describing personal testing/building
- Present tense for technologies and capabilities
- Past tense for completed experiments
- Direct, confident language
- Professional developer vocabulary

The tone: "I actually tested this, here is what I found." Not: "Here is an ultimate guide to revolutionize your development journey."

## Formatting Rules

- Use `☆` for major sections, `-` for bullets
- Keep paragraphs short, no walls of text
- No excessive emojis
- No bold/italic formatting unless specifically requested
- No em dashes - use normal hyphens
- Preserve technical names exactly (OMP, Next.js, K8s, gRPC)
- Keep whitespace between sections
- No unnecessary introductions or disclaimers

## Character Limit

HARD LIMIT: 3,000 characters including title, body, section headings, bullets, hashtags, spaces, and newlines. Target 2,700-2,950 to leave a safety margin.

Before finalizing:

1. Count the complete post - every character including spaces and newlines (count it yourself, carefully, or with a quick script if tools are available)
2. If over 3,000: remove repetition first
3. Condense explanations before removing important technical details
4. Keep the hook, strongest findings, key technologies, and conclusion
5. Never exceed 3,000 characters

## Information Prioritization

When space is limited, cut in reverse of this order:

1. Unique findings / actual experience
2. Technical details
3. Concrete comparisons
4. Practical benefits
5. Use cases
6. AI capabilities
7. Supporting explanation
8. Hashtags

## Quality Check

Before outputting, verify:

- Under 3,000 characters
- Strong opening hook, no banned openers
- 4-6 useful `☆` sections
- Concise `-` bullets
- Concrete technical details
- Practical observations, no repetition
- No em dashes
- Natural LinkedIn readability
- Personal claims framed as experience
- Relevant hashtags
- Strong final takeaway

## Default Output

When given raw technical notes, transform them directly into a finished LinkedIn post in this style. Do not explain the editing process unless asked. When the user asks to "make a post," return only the finished post - nothing else.
