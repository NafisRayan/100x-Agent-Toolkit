---
name: duckduckgo-search
description: Use when searching the web for information and you need clean, parseable search results without API keys
---

# DuckDuckGo Search

## Overview

Use DuckDuckGo HTML endpoint to search the web and get structured results. Free, no API key required, returns clean HTML that's easy to parse.

## When to Use

- Need to search the web for information
- Don't have an API key for Brave/Google/Bing
- Need parseable search results (not JavaScript-rendered)
- Want privacy-respecting search

**Skip when:**
- You have a Brave Search API key (use web-search skill instead)
- You need advanced filtering (use Brave Search)
- You need image/video search specifically

## Quick Reference

| Task | Method |
|------|--------|
| Basic search | `webfetch` with HTML endpoint |
| Format | markdown |
| Endpoint | `https://html.duckduckgo.com/html/?q=QUERY` |

## Syntax

```javascript
webfetch({
  url: "https://html.duckduckgo.com/html/?q=YOUR+SEARCH+QUERY",
  format: "markdown"
})
```

## Examples

### Basic search
```javascript
webfetch({
  url: "https://html.duckduckgo.com/html/?q=what+is+react+hooks",
  format: "markdown"
})
```

### Multiple words (use + or %20)
```javascript
webfetch({
  url: "https://html.duckduckgo.com/html/?q=nafis+rayan+github",
  format: "markdown"
})
```

### Time-filtered search
Results can be filtered by adding time filters to the query terms:
- "past day" - `q=topic+past+day`
- "past week" - `q=topic+past+week`
- "past month" - `q=topic+past+month`

## Response Format

Returns markdown with structured results containing:
- **Title**: Link to the page
- **URL**: Actual website link
- **Description**: Snippet from the page
- **Date**: Publication date (when available)

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Using `duckduckgo.com/?q=` | Use `html.duckduckgo.com/html/?q=` for parseable results |
| Spaces in query | Replace with `+` or `%20` |
| Not using format: "markdown" | Add `format: "markdown"` for clean output |
| Using main DuckDuckGo URL | It requires JavaScript; use HTML endpoint |

## Why This Works

The `/html/` endpoint returns simple HTML without JavaScript, making it:
- Easy to parse with `webfetch`
- Works without browser automation
- Returns consistent results
- No rate limiting for basic use
