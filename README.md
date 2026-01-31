# Stacks Quest

Learn Bitcoin. Build on Stacks. Anchored to Truth.

Stacks Quest is an interactive learning experience that combines a modern web UI with Web3 primitives. The repository is structured as a small monorepo:

- `frontend/`: Next.js (App Router) web application
- `smartcontract/`: Clarity smart contracts for progress tracking + achievement NFTs

If you want a *screen-by-screen* walkthrough of the UI and product concepts, see `SCREENS.md`.

---

## Table of Contents

- [Project Goals](#project-goals)
- [What’s in this Repo](#whats-in-this-repo)
- [Tech Stack](#tech-stack)
- [Quick Start (Frontend)](#quick-start-frontend)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [App Routes / Pages](#app-routes--pages)
- [Smart Contracts (Clarity)](#smart-contracts-clarity)
- [Chainhooks Integration](#chainhooks-integration)
- [Repository Documentation](#repository-documentation)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Project Goals

Stacks Quest aims to:

- Teach core Bitcoin and Stacks concepts through a progression-based “quest” UX.
- Make learning feel like a game (chambers, inscriptions, trials, achievements).
- Provide a foundation for on-chain progress tracking and achievement rewards via Clarity contracts.

---

## What’s in this Repo

```
.
├── frontend/         # Next.js app (UI + wallet integrations)
├──    
└── smartcontract/         # Clarity contracts (progress + NFTs)
```

- The frontend is what you run locally during development.
- The smart contracts are included as source files and can be deployed using Clarinet (see below).

---

## Tech Stack

### Frontend

- **Framework**: Next.js `16.0.10` (App Router)
- **UI**: React `19.2.1`
- **Language**: TypeScript
- **Styling**: Tailwind CSS (`^4`)
- **Server state**: `@tanstack/react-query`
- **EVM wallet + chains**: `wagmi` + `viem`
  - Default configured chains: `mainnet`, `sepolia` (see `frontend/wagmi.config.ts`)
- **Wallet UI / modal**: Reown AppKit (`@reown/appkit`)
- **Stacks auth/wallet (experimental/legacy paths)**: `@stacks/connect`
- **Stacks Chainhooks**: `@hirosystems/chainhooks-client`

### Smart Contracts

- **Language**: Clarity
- **Contracts**:
  - `stacks-quest-progress.clar`
  - `stacks-quest-nft.clar`

---

## Quick Start (Frontend)

### Prerequisites

- Node.js `18+` recommended
- One package manager:
  - `npm` (recommended here because `frontend/package-lock.json` is present)
  - or `pnpm` (a `pnpm-lock.yaml` also exists)

Important: pick **one** and stick to it to avoid lockfile drift.

### Install

Run these commands from the `frontend/` directory:

```bash
npm install
```

### Run dev server

```bash
npm run dev
```

Then open:

- `http://localhost:3000`

---

## Environment Variables

The repo includes a `frontend/.env` in your workspace, but it is gitignored, so it won’t be readable from GitHub and shouldn’t be committed. For GitHub-friendly onboarding, configure your local env like this:

1. Create `frontend/.env.local`
2. Add the variables you need
3. Restart the dev server

### Required / Optional variables

#### Chainhooks (optional)

Used by `frontend/lib/chainhooks.ts` and the `/chainhooks` page.

- `NEXT_PUBLIC_CHAINHOOKS_BASE_URL`
  - Optional. Defaults to Hiro testnet base URL.
- `NEXT_PUBLIC_CHAINHOOKS_API_KEY`
  - Optional, but required to list chainhooks.

Example:

```bash
NEXT_PUBLIC_CHAINHOOKS_BASE_URL=https://your-chainhooks-host
NEXT_PUBLIC_CHAINHOOKS_API_KEY=your_api_key_here
```

Security note: any `NEXT_PUBLIC_*` variable is exposed to the browser. Do not store secrets that must remain private.

---

## Available Scripts

All scripts live in `frontend/package.json`:

- `npm run dev`
  - Start Next.js dev server.
- `npm run build`
  - Production build.
- `npm run start`
  - Start production server (after build).
- `npm run lint`
  - Run ESLint.

---

## App Routes / Pages

This project uses the Next.js App Router (`frontend/app/`). Key routes include:

- `/`
  - Landing page (“Stacks Quest”) with a connect button and entry to the learning roadmap.
- `/roadmap`
  - “Path of Knowledge” progression screen. Unlocks content sequentially.
- `/lesson?topic=<id>`
  - Lesson content for a topic.
- `/quest?topic=<id>`
  - Interactive “Chamber of Inscriptions” word-hunt style quest.
- `/dashboard`
  - User dashboard (currently uses mock data).
- `/leaderboard`
  - Leaderboard screen (currently uses mock data).
- `/marketplace`
  - Marketplace screen (currently uses mock data).
- `/profile`
  - Profile editor/view. Redirects to `/` if not authenticated.
- `/chainhooks`
  - Chainhooks integration example screen.

Notes:

- Some user state is persisted locally (for example, quest completion and roadmap progression are stored in `localStorage`).
- Profile data is stored via a React context provider (`frontend/contexts/ProfileContext.tsx`).

---

## Smart Contracts (Clarity)

The `smartcontract/` folder contains the Clarity contracts that are intended to power on-chain:

- Learning progress tracking
- Quiz attempts / score validation
- Achievement NFT minting

See the detailed contract documentation here:

- `smartcontract/README.md`

### Contracts in this repo

- `smartcontract/stacks-quest-progress.clar`
  - Progress tracking, completion, unlocking logic.
- `smartcontract/stacks-quest-nft.clar`
  - NFT minting for achievements.

### Deploying the contracts (recommended approach)

This repository stores the `.clar` sources but does not include a full Clarinet project scaffold at the repo root.

To deploy/test locally with Clarinet:

1. Install Clarinet: `https://docs.hiro.so/smart-contracts/clarinet`
2. Create a Clarinet project:

```bash
clarinet new stacks-quest-contracts
```

3. Copy the contract files from `smartcontract/` into the new project’s `contracts/` folder.
4. Update the Clarinet configuration to include the contracts.
5. Run tests / deploy:

```bash
clarinet test
clarinet deployments apply -p testnet
```

If you want this repo itself to be a Clarinet project, add the Clarinet scaffold files (`Clarinet.toml`, `settings/`, etc.) and wire these contracts into it.

---

## Chainhooks Integration

The frontend includes a minimal Chainhooks client wrapper:

- `frontend/lib/chainhooks.ts`

And a UI example page:

- Route: `/chainhooks`
- Component: `frontend/components/ChainhooksExample.tsx`

If you see errors there, it’s usually because `NEXT_PUBLIC_CHAINHOOKS_API_KEY` is missing.

---

## Repository Documentation

- `SCREENS.md`
  - Comprehensive product + screen documentation (architecture, flows, and UI breakdown).
- `frontend/README.md`
  - Frontend-specific docs.
- `smartcontract/README.md`
  - Contract-specific docs.

---

## Troubleshooting

### Dev server starts but pages look unstyled

- Ensure Tailwind is installed and the dev server is restarted.
- Verify `frontend/app/globals.css` is present.

### Chainhooks page errors

- Confirm `NEXT_PUBLIC_CHAINHOOKS_BASE_URL` (optional) and `NEXT_PUBLIC_CHAINHOOKS_API_KEY` (usually required).
- Restart `npm run dev` after changing env vars.

### “Works on my machine” lockfile issues

- Choose **one** package manager and delete the other lockfile(s) only if you intentionally standardize (do this in a dedicated PR).
- In the meantime, for this repo:
  - Use `npm install` + `package-lock.json`.

---

## Contributing

There is currently no root `CONTRIBUTING.md` in this repository.

Recommended contribution workflow:

- Create a feature branch
- Keep PRs focused (UI changes separate from contract changes)
- Prefer adding screenshots for UI changes
- Avoid committing `.env*` files or API keys


