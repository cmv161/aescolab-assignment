# Biomarker Results UI (React + TypeScript)

**Live demo:** https://aescolab-assignment.vercel.app/

A small UI that displays biomarker results in a table, with a details drawer and autosaved notes.

---

## Setup

### Requirements
- Node.js (LTS recommended)
- pnpm

### Install
```bash
pnpm install
```

### Run locally
```bash
pnpm dev
```

## Demo controls (query params)

To demonstrate real-world UX states without a backend:

- **Control delay:** `?delay=1500` (milliseconds, default: `1000`)
- **Trigger error:** `?error=1`
- **Combine:** `?delay=2000&error=1`

---

## Key decisions and trade-offs

- **Dark theme and mobile responsiveness** align with common expectations for modern web applications.
- **Table-first layout:** results are shown in a table because the data is naturally tabular (biomarker, result, status, reference, category). This makes it easier to scan and compare biomarkers.
  - On small screens, the table can be scrolled horizontally, which keeps the layout simple and easy to read.
- **Details as an overlay drawer:** I used an overlay drawer pattern to keep the list context visible while exploring details.
  - Radix Dialog provides solid accessibility defaults (focus management, Escape to close, portal/overlay).
- **Simulated “API” + real-world states:** data loading is simulated with a delay; error state can be triggered via a query parameter(see "Demo controls"). This demonstrates loading/error/ UX without introducing a backend.

- **Autosave notes:** notes are stored per biomarker in `localStorage` with a small debounce. This avoids backend complexity while still demonstrating real-world behavior (persistence + feedback states).

### Trade-offs
- Because this is a demo, some UI and data logic are intentionally more tightly coupled to the current domain and data shape. This keeps the implementation small, at the cost of reusability and abstraction.
- Minimal state management (local component state + hooks) to keep complexity low.

---

## How I used AI tools

AI was used mainly to speed up boilerplate and validate implementation details. Core architecture and product decisions were made by me.

---

## What I’d do next with more time

- Decouple UI from data shape.
- Improve accessibility.
