# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

A Docusaurus site for presenting documentation for the Waterwheel front-end testing AI agent. All content displayed on the site is in Markdown format.

## Technology

- Docusaurus with TypeScript

## Commands

Once the Docusaurus scaffold exists (`package.json` is present), use:

```bash
npm install          # install dependencies
npm start            # start local dev server (hot reload)
npm run build        # production build
npm run typecheck    # TypeScript type check
```

To run a single specific test (if tests are added):
```bash
npx jest <test-file-path>
```

## Architecture

- All site content lives in Markdown files under `docs/` (standard Docusaurus convention)
- Static assets (icons, favicons) are in `static/img/`
  - `waterwheel_128.png` — logo
  - `waterwheel_favicon.ico`, `waterwheel_favicon_16.png`, `waterwheel_favicon_32.png` — favicons
- Docusaurus configuration lives in `docusaurus.config.ts`
- Sidebar structure is defined in `sidebars.ts`
