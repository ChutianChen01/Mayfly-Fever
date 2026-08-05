---
title: Signal Board
blurb: A single-screen status display for home servers, designed to be readable from across a room.
date: 2024-09-01
status: Shipped
tech:
  - TypeScript
  - Svelte
  - Prometheus
cover: ""
repo: https://github.com/ChutianChen01/example
demo: ""
featured: true
order: 20
draft: false
---

Most monitoring dashboards are built for someone leaning into a screen
debugging an incident. I wanted the opposite: something glanceable on a spare
monitor that tells me, from three metres away, whether anything needs my
attention.

## Design constraints

- One screen. No scrolling, no tabs, no drill-down.
- Readable at distance, which ruled out most default chart libraries.
- Silent when healthy. Colour appears only when something is wrong.

The hardest part was resisting the urge to add more. Every metric I removed
made the remaining ones easier to read.
