---
name: product-management
description: Product management skill suite covering discovery, strategy, roadmapping, execution, analytics, go-to-market, and PM ops. Use for PRDs, user stories, OKRs, roadmaps, prioritization, A/B test analysis, market sizing, pricing, personas, interviews, competitive analysis, product docs, and more. Each task has a dedicated playbook under references/ — load the matching file before executing.
---

# Product Management — Skill Suite

One umbrella skill with **68 task-specific playbooks** organized by PM discipline. Each playbook is a standalone runbook for a single task — PRDs, A/B test analysis, NDAs, pricing, user interviews, and more.

## How to Use

1. Find your task in the category tables below (or just describe what you need).
2. Read the matching playbook: `references/<category>/<name>.md`.
3. Follow its instructions.

> No exact match? Use the closest playbook — e.g. `references/product-discovery/wwas.md` for opportunity framing — then adapt.

## Playbooks by Category

### AI Shipping

| Playbook | Use when |
|----------|-----------|
| `intended-vs-implemented` | The method for finding the gap between what a system is supposed to do and what the code actually does — the class of b... |
| `shipping-artifacts` | The durable documentation set that makes an AI-built (vibe-coded) app reviewable before shipping. A small core every ap... |

### Data & Analytics

| Playbook | Use when |
|----------|-----------|
| `ab-test-analysis` | Analyze A/B test results with statistical significance, sample size validation, confidence intervals, and ship/extend/s... |
| `cohort-analysis` | Perform cohort analysis on user engagement data — retention curves, feature adoption trends, and segment-level insights... |
| `sql-queries` | Generate SQL queries from natural language descriptions. Supports BigQuery, PostgreSQL, MySQL, and other dialects. Read... |

### Execution & Delivery

| Playbook | Use when |
|----------|-----------|
| `brainstorm-okrs` | Brainstorm team-level OKRs aligned with company objectives — qualitative objectives with measurable key results. Use wh... |
| `create-prd` | Create a Product Requirements Document using a comprehensive 8-section template covering problem, objectives, segments,... |
| `dummy-dataset` | Generate realistic dummy datasets for testing with customizable columns, constraints, and output formats (CSV, JSON, SQ... |
| `job-stories` | Create job stories using the 'When [situation], I want to [motivation], so I can [outcome]' format with detailed accept... |
| `outcome-roadmap` | Transform an output-focused roadmap into an outcome-focused one that communicates strategic intent. Rewrites initiative... |
| `pre-mortem` | Run a pre-mortem risk analysis on a PRD or launch plan. Categorizes risks as Tigers (real problems), Paper Tigers (over... |
| `prioritization-frameworks` | Reference guide to 9 prioritization frameworks with formulas, when-to-use guidance, and templates — RICE, ICE, Kano, Mo... |
| `release-notes` | Generate user-facing release notes from tickets, PRDs, or changelogs. Creates clear, engaging summaries organized by ca... |
| `retro` | Facilitate a structured sprint retrospective — what went well, what didn't, and prioritized action items with owners an... |
| `sprint-plan` | Plan a sprint with capacity estimation, story selection, dependency mapping, and risk identification. Use when preparin... |
| `stakeholder-map` | Build a stakeholder map using a power/interest grid, identify communication strategies per quadrant, and generate a com... |
| `strategy-red-team` | Red-team a PRD, roadmap, or strategy by attacking its load-bearing assumptions before reality does. Steelmans then atta... |
| `summarize-meeting` | Summarize a meeting transcript into structured notes with date, participants, topic, key decisions, summary points, and... |
| `test-scenarios` | Create comprehensive test scenarios from user stories with test objectives, starting conditions, user roles, step-by-st... |
| `user-stories` | Create user stories following the 3 C's (Card, Conversation, Confirmation) and INVEST criteria with descriptions, desig... |
| `wwas` | Create product backlog items in Why-What-Acceptance format — independent, valuable, testable items with strategic conte... |

### Go-to-Market

| Playbook | Use when |
|----------|-----------|
| `beachhead-segment` | Identify the first beachhead market segment for a product launch. Evaluates segments against burning pain, willingness... |
| `competitive-battlecard` | Create sales-ready competitive battlecards comparing your product against a specific competitor — positioning, feature... |
| `growth-loops` | Identify growth loops (flywheels) for sustainable traction. Evaluates 5 loop types: Viral, Usage, Collaboration, User-G... |
| `gtm-motions` | Identify the best GTM motions and tools across 7 motion types: Inbound, Outbound, Paid Digital, Community, Partners, AB... |
| `gtm-strategy` | Create a go-to-market strategy covering marketing channels, messaging, success metrics, and launch timeline. Use when p... |
| `ideal-customer-profile` | Identify the Ideal Customer Profile (ICP) from research data with demographics, behaviors, JTBD, and needs. Use when de... |

### Market Research

| Playbook | Use when |
|----------|-----------|
| `competitor-analysis` | Analyze competitors with strengths, weaknesses, and differentiation opportunities. Identifies direct competitors and ma... |
| `customer-journey-map` | Create an end-to-end customer journey map with stages, touchpoints, emotions, pain points, and opportunities. Use when... |
| `market-segments` | Identify 3-5 potential customer segments with demographics, JTBD, and product fit analysis. Use when exploring market s... |
| `market-sizing` | Estimate market size using TAM, SAM, and SOM with top-down and bottom-up approaches. Use when sizing a market opportuni... |
| `sentiment-analysis` | Analyze user feedback data to identify segments with sentiment scores, JTBD, and product satisfaction insights. Use whe... |
| `user-personas` | Create refined user personas from research data — 3 personas with JTBD, pains, gains, and unexpected insights. Use when... |
| `user-segmentation` | Segment users from feedback data based on behavior, JTBD, and needs. Identifies at least 3 distinct user segments. Use... |

### Marketing Growth

| Playbook | Use when |
|----------|-----------|
| `marketing-ideas` | Generate 5 creative, cost-effective marketing ideas with channels, messaging, and engagement rationale. Use when brains... |
| `north-star-metric` | Define a North Star Metric and 3-5 supporting input metrics that form a metrics constellation. Classify the business ga... |
| `positioning-ideas` | Brainstorm product positioning ideas differentiated from competitors. Identifies top competitors and generates position... |
| `product-name` | Brainstorm 5 unique, memorable product names with rationale aligned to brand values and target audience. Use when namin... |
| `value-prop-statements` | Generate value proposition statements for marketing, sales, and onboarding from existing value propositions. Use when w... |

### Product Discovery

| Playbook | Use when |
|----------|-----------|
| `analyze-feature-requests` | Analyze and prioritize a list of feature requests by theme, strategic alignment, impact, effort, and risk. Use when rev... |
| `brainstorm-experiments-existing` | Design experiments to test assumptions for an existing product — prototypes, A/B tests, spikes, and other low-effort va... |
| `brainstorm-experiments-new` | Design lean startup experiments (pretotypes) for a new product. Creates XYZ hypotheses and suggests low-effort validati... |
| `brainstorm-ideas-existing` | Brainstorm product ideas for an existing product using multi-perspective ideation from PM, Designer, and Engineer viewp... |
| `brainstorm-ideas-new` | Brainstorm feature ideas for a new product in initial discovery from PM, Designer, and Engineer perspectives. Use when... |
| `identify-assumptions-existing` | Identify risky assumptions for a feature idea in an existing product across Value, Usability, Viability, and Feasibilit... |
| `identify-assumptions-new` | Identify risky assumptions for a new product idea across 8 risk categories including Go-to-Market, Strategy, and Team.... |
| `interview-script` | Create a structured customer interview script with JTBD probing questions, warm-up, core exploration, and wrap-up secti... |
| `metrics-dashboard` | Define and design a product metrics dashboard with key metrics, data sources, visualization types, and alert thresholds... |
| `opportunity-solution-tree` | Build an Opportunity Solution Tree (OST) to structure product discovery — map a desired outcome to opportunities, solut... |
| `prioritize-assumptions` | Prioritize assumptions using an Impact × Risk matrix and suggest experiments for each. Use when triaging a list of assu... |
| `prioritize-features` | Prioritize a backlog of feature ideas based on impact, effort, risk, and strategic alignment with top 5 recommendations... |
| `summarize-interview` | Summarize a customer interview transcript into a structured template with JTBD, satisfaction signals, and action items.... |

### Product Strategy

| Playbook | Use when |
|----------|-----------|
| `ansoff-matrix` | Generate an Ansoff Matrix analysis mapping growth strategies across market penetration, market development, product dev... |
| `business-model` | Generate a Business Model Canvas with all 9 building blocks. Use when creating a business model, documenting how a busi... |
| `lean-canvas` | Generate a Lean Canvas with problem, solution, metrics, cost structure, UVP, unfair advantage, channels, segments, and... |
| `monetization-strategy` | Brainstorm 3-5 monetization strategies with audience fit, risks, and validation experiments. Use when exploring revenue... |
| `pestle-analysis` | Perform a PESTLE analysis covering Political, Economic, Social, Technological, Legal, and Environmental factors. Use wh... |
| `porters-five-forces` | Perform Porter's Five Forces analysis — competitive rivalry, supplier power, buyer power, threat of substitutes, and th... |
| `pricing-strategy` | Analyze and design pricing strategies including pricing models, competitive pricing analysis, willingness-to-pay estima... |
| `product-strategy` | Create a comprehensive product strategy using the 9-section Product Strategy Canvas — vision, segments, costs, value pr... |
| `product-vision` | Brainstorm an inspiring, achievable, and emotional product vision that motivates teams and aligns stakeholders. Use whe... |
| `startup-canvas` | Generate a Startup Canvas combining Product Strategy (9 sections) and Business Model (costs + revenue) for a new produc... |
| `swot-analysis` | Perform a detailed SWOT analysis — strengths, weaknesses, opportunities, and threats with actionable recommendations. U... |
| `value-proposition` | Design a detailed value proposition using a 6-part JTBD template — Who, Why, What before, How, What after, Alternatives... |

### Toolkit

| Playbook | Use when |
|----------|-----------|
| `draft-nda` | Draft a detailed Non-Disclosure Agreement between two parties covering information types, jurisdiction, and clauses nee... |
| `grammar-check` | Identify grammar, logical, and flow errors in text and suggest targeted fixes without rewriting the entire text. Use wh... |
| `privacy-policy` | Draft a detailed privacy policy covering data types, jurisdiction, GDPR and compliance considerations, and clauses need... |
| `review-resume` | Comprehensive PM resume review and tailoring against 10 best practices including XYZ+S formula, keyword optimization, j... |
