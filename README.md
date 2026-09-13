# NEXUS — Messaging beyond the Internet

A polished, static, offline-first Messenger prototype for GitHub Pages.

## What is real
- React + TypeScript + Vite static build.
- GitHub Pages deployment via GitHub Actions.
- Installable PWA with Web App Manifest and Service Worker.
- IndexedDB persistence for conversations, outbox packets, emergency packets, settings, and a demo AES-GCM key.
- Browser Web Crypto API for AES-GCM encryption of message bodies before entering the outbox.
- Online/offline/connecting status based on browser connectivity signals.
- Explicit opt-in Relay Mode UI and device battery/storage guardrails.
- Real capability detection for Service Worker, IndexedDB, Web Crypto, WebRTC and Web Bluetooth.
- Optional browser geolocation permission for SOS creation.

## What is simulated
The four-node A → B → C → D route demo is a deterministic competition simulation. It intentionally labels nodes as `SIMULATED NODE` and does not pretend that nearby arbitrary phones are being discovered or used as relays.

A production mesh system would need a native Android/iOS transport layer (or a very specifically constrained browser-to-browser transport with an explicit signaling/discovery flow). Web Bluetooth is not a universal browser mesh API; it is limited-availability and permission gated. WebRTC can carry peer-to-peer data channels, but peers still need a signaling/discovery path before they can connect.

## Security boundary
This project demonstrates native AES-GCM encryption at the packet-body layer. It is a prototype, not an audited end-to-end messaging protocol. It does not implement a production multi-device identity scheme, forward secrecy, ratcheting, key verification, or audited metadata-hiding onion routing. Relays should be treated as untrusted and only receive ciphertext packets.

## Install
```bash
npm install
npm run dev
```

## Production build
```bash
npm run typecheck
npm run build
npm run preview
```

## GitHub Pages
1. Create a GitHub repository and push the project to `main`.
2. In GitHub: **Settings → Pages → Source → GitHub Actions**.
3. The included `.github/workflows/deploy.yml` builds and deploys `dist/`.
4. `vite.config.ts` uses `base: './'`, and the app uses hash navigation plus relative PWA paths so it remains compatible with repository subpaths.

## PWA installation
Open NEXUS online once. When the browser exposes an install prompt, the app shows **ADD TO HOME SCREEN**. Otherwise it provides manual browser instructions. First-time installation cannot happen from a completely offline state.

## Offline behavior
After first online load and Service Worker caching, the app shell can reopen from the home-screen icon while offline. Previously stored conversations, packets and settings remain in IndexedDB.

## Architecture
- `src/features/*` reserved for future transport modules.
- `src/crypto` contains browser-native cryptographic helpers.
- `src/storage` contains IndexedDB persistence.
- `src/offline` and `src/services` are available for transport/background expansion.
- `src/pages` contains feature screens.
- `src/components` contains reusable UI primitives.

## Testing checklist
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run build`.
- [ ] Open `dist/` with `npm run preview`.
- [ ] Install the PWA from a Chromium-based browser when prompted.
- [ ] Turn the OS/browser offline after first visit and reopen the app.
- [ ] Verify IndexedDB conversations remain available.
- [ ] Send an offline message and verify it is queued.
- [ ] Toggle Relay Mode and adjust battery limit.
- [ ] Run the Network route demo and observe route loss/recovery.
- [ ] Create an SOS packet and inspect the local log.
- [ ] Test the final GitHub Pages repository URL, including a hard refresh.
