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
git clone https://github.com/cmv161/aescolab-assignment.git
cd aescolab-assignment
pnpm install
```

### Run locally
```bash
pnpm dev
The app will be available at http://localhost:5173
```

## Demo controls (query params)

To demonstrate real-world UX states without a backend:

- **Control delay:** `?delay=1500` (milliseconds, default: `1000`)
- **Trigger error:** `?error=1`
- **Combine:** `?delay=2000&error=1`

---

## UX Decisions

### Overall summary component
I added an overall summary component at the top of the page to give users a quick understanding of their results without scanning the full list.

It shows three clear states:
- **All Clear** when all biomarkers are within the reference range
- **Review Suggested** when 1 to 5 results are outside the reference range
- **Detailed Results** when more than 5 results are outside the reference range

This component also allows quick filtering directly from the summary, so users do not need to open the filters panel. The goal was to reduce cognitive load and help users understand the situation at a glance.

### Cards instead of table-first view
I added a card-based view for biomarkers. A large table on first entry can feel overwhelming and create unnecessary anxiety. Cards make the experience calmer and easier to scan, especially for non-technical users.

The selected view mode (card or table) is saved in local storage, so the user’s preference is preserved between sessions.

### Date switching
I added the ability to switch between different test dates, so users can review past results.

### Biomarker detail view with trend chart
In the biomarker detail panel, I added a trend chart that shows how the value changes over time. The chart highlights when the value is within the reference range and when it goes below or above the range. This helps users understand not only the current value, but also the direction and history.

To demonstrate the full flow of below range, in range, and above range, I added additional sample trend data for the biomarker Alkaline Phosphatase (ALP).

### Search
I added a search input to quickly find a specific biomarker, which is especially helpful when many results are present.

## What I Changed and Why

### Mobile experience
I improved the mobile experience to feel closer to a polished native app. Using familiar mobile patterns makes the app easier to use and reduces cognitive load because users already know how these patterns work.

### Color system
I adjusted the color scheme for normal, low, and high states. The colors are intentionally softer and calmer to reduce unnecessary anxiety while still clearly communicating status.

## Trade-offs

- I focused more on clarity and emotional comfort than on showing everything at once.


## What I Would Improve Next

- Add a compact mode for search and filters on mobile after scrolling:
  - keep only Search visible at the top
  - move the date selector and view switch into the Filters panel

This would free up vertical space and keep the most important action always accessible.
