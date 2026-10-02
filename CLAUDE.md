# videoedition

Remotion 4 project for video editing. Remotion agent skills live in `.claude/skills/` (installed with `npx skills add remotion-dev/skills`, pinned in `skills-lock.json`). Start with `/remotion-best-practices`.

- Preview: `npm run dev` (Remotion Studio)
- Render: `npx remotion render MyComp out/video.mp4`
- Still: `npx remotion still MyComp out/frame.png --frame=30`
- Lint + typecheck: `npm run lint`

Media to edit goes in `public/` and is referenced with `staticFile()`. Renders go to `out/` (gitignored).

In Claude Code cloud sessions `remotion.media` is blocked, so `remotion.config.ts` points Remotion at the preinstalled Playwright headless shell under `/opt/pw-browsers`. Override with `REMOTION_BROWSER_EXECUTABLE`.
