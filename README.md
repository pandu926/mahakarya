# MAHAKARYA

MAHAKARYA is a React + TypeScript + Vite portfolio presented as a cinematic career journey. A single continuous WebGL world connects six chapters with a restrained golden trail, while semantic React DOM carries the readable story and controls.

## Requirements

- Node.js 20 or newer
- npm
- A modern browser with WebGL support (the semantic UI remains usable when WebGL is unavailable)

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local Vite URL shown in the terminal. Useful checks are:

```bash
npm test
npm run lint
npm run typecheck
npm run test:browser
```

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
├── app/              application orchestration
├── components/       semantic DOM UI and shared controls
├── chapters/         six chapter world compositions
├── experience/       scroll/runtime/WebGL coordination
├── hooks/             scroll, history, and accessibility hooks
├── lib/              pure progress, history, and utility helpers
├── shaders/          optional focused GLSL programs
├── store/             low-frequency Zustand experience state
├── styles/            tokens, global styles, and component styles
├── data/              typed chapter, project, navigation, and profile content
└── types/             shared TypeScript contracts
public/assets/         images, textures, fonts, and icons
tests/                 Vitest and React Testing Library coverage
```

The experience uses one shared R3F `<Canvas>`. React owns semantic content, navigation, overlays, focus behavior, and fallback UI; the WebGL layer owns the continuous spatial world.

`test:browser` starts an isolated Vite server and drives Chromium through eight desktop progress checkpoints, five viewport sizes, project deep links, menu navigation, and a forced no-WebGL fallback. It checks that all six landmarks have finite coordinates and writes screenshots to the temporary directory printed on completion. Use installed Google Chrome, set `CHROME_PATH`, or install Playwright Chromium with `npx playwright install chromium`.

## Editing personal content

Edit the typed data files in `src/data/` rather than duplicating copy inside components. Chapter order, labels, titles, descriptions, and ranges live in the chapter data. Project titles, roles, outcomes, tags, links, and case-study details live in the project data. Keep chapter IDs stable because they are public hash anchors (`#prelude`, `#origins`, `#craft`, `#impact`, `#process`, and `#future`).

The six reference panels are storyboard/mockup states for horizontal journey movement. The UI should show one active chapter state over the cinematic stage at a time; any chapter rail or bottom index is navigation only and must not merge those states into one static card gallery.

Desktop uses the 1536×1024 composition grid (664px world, 258px index, 102px footer). Below 768px, the six narrative sections form a vertical stack over the same fixed canvas. Fonts are hosted locally. Chapter index/fallback images in `public/assets/images/chapters` are browser captures of the procedural landmarks.

## Replacing project images

Place optimized project artwork in `public/assets/images/` and update the corresponding typed project record. Prefer AVIF or WebP with stable dimensions and meaningful alt text. Images are enhancement assets: a procedural or solid fallback must preserve the composition if an image is late or unavailable.

## How master progress works

Browser vertical scroll is normalized to a single `masterProgress` value from `0` to `1`:

```text
P = clamp(scrollY / max(1, documentHeight - viewportHeight), 0, 1)
```

The scroll controller is the canonical owner. R3F reads the mutable runtime value per frame; React subscribes only to low-frequency state such as the active chapter, menu, project overlay, quality tier, and input mode. Chapter ranges intentionally overlap:

```text
Prelude  0.000–0.155   Origins 0.135–0.320   Craft   0.285–0.490
Impact   0.450–0.665   Process 0.625–0.835   Future  0.790–1.000
```

Shared pure helpers derive local chapter progress, smooth section weight, dominant chapter, world position, and scroll targets. Chapter clicks resolve the center of a range, update the hash without reloading, and use native smooth scrolling or Lenis according to the motion preference.

## Procedural assets

Landmarks are procedural-first and must remain intentional without Blender or mandatory GLB files. Use memoized Three.js geometry such as boxes, planes, cylinders, toruses, icosahedra, tubes, `BufferGeometry`, and `InstancedMesh`, with seeded randomness for repeatable composition. Generated textures, restrained shaders, fog, lighting, and reusable materials provide atmosphere. External models may enhance a scene but may not be required for the primary silhouette.

## Performance and quality tiers

The experience supports `high`, `medium`, and `low` tiers based on viewport and basic device capabilities. Tiers adjust particle/instance counts, shadows, antialiasing, DPR, and fog density. Repeated terrain, buildings, foliage, and architectural beams use instancing. One warm light follows the dominant chapter. There is one shared render loop; React receives throttled UI snapshots, while the camera reads the canonical runtime directly. Automatic frame-time downgrading is not implemented.

## Verification limits

Passing type checks and browser checks does not establish pixel identity with the supplied concept artwork. Procedural geometry, material detail, cloud depth, and reflections still differ from that artwork. Coverage thresholds currently apply to the utility/store scope configured in `vite.config.ts`, not the complete WebGL scene; browser screenshots are the visual-review evidence.

## Accessibility behavior

- Story copy and controls are semantic DOM; the canvas is `aria-hidden`.
- The six chapter labels are keyboard-reachable navigation/index controls, while only the active chapter state is presented in the stage.
- Skip navigation, visible focus styles, heading hierarchy, meaningful image alt text, and minimum 44px touch targets are required.
- Menu and project overlays use dialog semantics, trap focus while open, close on `Escape`, and restore focus to the invoking control.
- Browser back/forward and public chapter/project hashes remain meaningful.
- Reduced motion disables Lenis/parallax and minimizes camera, particle, and nonessential animation without removing content or navigation.
- If WebGL initialization fails, a static fallback keeps all chapter copy, navigation, contact links, and project content available.
- A concise `<noscript>` message provides a contact path when JavaScript is disabled.
