# NEXUS Validation Notes

This environment could not complete `npm install` because outbound npm registry access timed out. The source tree was therefore validated with static checks rather than a local Vite production build.

Static checks completed:
- Manifest JSON parsed successfully.
- All manifest icon files exist.
- Local TS/TSX relative imports resolve to files.
- GitHub Actions workflow contains an install → build → Pages deployment sequence.
- Service Worker registration uses Vite's runtime base path.
- Vite is configured with a relative base for repository subpaths.
- The app uses hash navigation so GitHub Pages refreshes do not require server-side route fallback.

Before the first deployment, run:

```bash
npm install
npm run typecheck
npm run build
npm run preview
```

Then validate the published GitHub Pages URL on a supported browser by installing once online and reopening while offline.
