# MAHAKARYA — ULTIMATE REACT PRODUCTION PROMPT
## Career Journey Portfolio / Cinematic Continuous WebGL World / React + TypeScript + React Three Fiber

> **Tujuan dokumen ini:** menjadi prompt produksi yang dapat langsung diberikan ke AI coding agent / creative developer untuk membangun website portfolio yang terasa seperti karya digital kelas festival, bukan template portfolio biasa. Dokumen ini sengaja sangat spesifik mengenai desain, komposisi, interaksi, motion, WebGL, asset, performa, responsivitas, accessibility, dan acceptance criteria.

> **Versi ini menggantikan versi HTML-only.** Implementasi sekarang wajib memakai React + TypeScript + Vite + React Three Fiber. Visual direction, six-chapter journey, master progress, dan museum-like storytelling tetap dipertahankan dan diperkuat. Blender bukan dependency wajib; landmark utama harus memiliki procedural runtime implementation.

---

# 0. NON-NEGOTIABLE CREATIVE INTENT

Bangun sebuah website portfolio bernama **MAHAKARYA** yang terasa seperti **museum sinematik tentang perjalanan karier**. Pengguna tidak sedang “membaca halaman portfolio”; pengguna sedang **menjelajahi dunia visual yang memiliki enam monumen/ruang**, masing-masing mewakili satu bab perjalanan.

Website harus memiliki kualitas visual yang terasa seperti gabungan:

- art direction film sci-fi arsitektural,
- exhibition design museum kontemporer,
- title sequence premium,
- interactive editorial,
- WebGL spatial storytelling,
- dan portfolio personal yang tetap mudah dibaca.

Arah visual harus mengikuti reference image: ruang gelap biru-hitam, arsitektur monolitik, landscape surealis, jalur cahaya emas yang menghubungkan tiap bab, elemen batu melayang, kabut volumetrik yang halus, pantulan lantai, kontras hangat-dingin, dan typography editorial berjarak lebar.

**Jangan membuat “website 3D generik”.** Hasil akhir harus terasa diciptakan khusus untuk narasi MAHAKARYA. Setiap elemen harus memiliki alasan konseptual.

Kata kunci pengalaman:

`cinematic` · `monumental` · `quiet luxury` · `editorial` · `museum` · `spatial narrative` · `precision` · `dark atmospheric` · `warm gold light` · `career journey` · `future-facing` · `high craft`

---

# 1. SOURCE OF TRUTH & PRIORITY

Gunakan urutan prioritas berikut saat ada konflik:

> **Important migration rule:** dokumen ini adalah versi React yang menggantikan constraint lama “single self-contained index.html / no framework”. Jika reference lama menyebut HTML-only, vanilla JS, atau no-build-step, anggap constraint tersebut **deprecated**. Creative intent, chapter structure, motion philosophy, dan visual language tetap dipertahankan; implementation architecture sekarang mengikuti React stack dalam dokumen ini.


1. **Creative intent + visual composition dalam prompt ini.**
2. **Reference image MAHAKARYA** sebagai target nuansa, framing, kedalaman, hierarki, dan komposisi.
3. **Functional requirements**: navigasi, accessibility, responsivitas, performa, keyboard, reduced motion.
4. Detail dekoratif.

Jangan meniru reference sebagai gambar statis. Reinterpretasikan sebagai pengalaman web hidup dengan depth, motion, camera choreography, dan interaction state yang coherent.

---

# 2. ROLE

Anda adalah gabungan dari:

- Creative Director,
- Senior Interactive Designer,
- Award-winning Front-End Engineer,
- React Three Fiber / Three.js / WebGL Artist,
- Motion Designer,
- Technical Artist,
- Accessibility-minded Product Designer.

Tugas Anda adalah membuat pengalaman ini **siap produksi**, bukan sekadar mockup atau proof-of-concept.

Setiap keputusan implementasi harus menjaga empat hal sekaligus:

1. kualitas visual,
2. keterbacaan,
3. kelancaran interaksi,
4. performa nyata di perangkat pengguna.

---

# 3. FINAL DELIVERABLE — REACT APPLICATION

Bangun proyek sebagai **production-grade React application**, bukan single-file HTML dan bukan kumpulan demo terpisah.

Stack wajib:

- **React** untuk UI/component architecture.
- **TypeScript** dengan `strict: true`.
- **Vite** sebagai dev server dan production bundler.
- **Three.js** sebagai WebGL engine.
- **@react-three/fiber (R3F)** sebagai React renderer untuk Three.js.
- **@react-three/drei** hanya untuk helper yang benar-benar berguna; jangan jadikan preset sebagai art direction.
- **GSAP + ScrollTrigger** untuk choreography DOM, chapter transitions, dan timeline yang membutuhkan deterministic sequencing.
- **Lenis** sebagai canonical smooth-scroll driver pada desktop/tablet jika motion preference mengizinkan.
- **Zustand** sebagai lightweight shared experience store.
- CSS Modules atau scoped CSS + satu global token layer. Tidak perlu component UI library.

Jangan gunakan:

- Next.js hanya demi routing atau SSR; Vite SPA lebih sesuai untuk pengalaman ini.
- Bootstrap, Material UI, Chakra, Ant Design, shadcn, atau template UI generik.
- React Spring sebagai sistem motion kedua jika GSAP sudah menangani kebutuhan motion.
- beberapa `<Canvas>` independen untuk tiap chapter.
- satu React `setState()` per frame untuk master progress.
- premade 3D asset packs sebagai fondasi visual.
- Blender sebagai dependency produksi wajib.

## 3.1 Required project output

Coding agent harus menghasilkan **seluruh project yang dapat dijalankan**, minimal:

```text
mahakarya/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── assets/
│       ├── images/
│       ├── textures/
│       ├── fonts/
│       └── icons/
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── app/
    ├── components/
    ├── chapters/
    ├── experience/
    ├── shaders/
    ├── hooks/
    ├── store/
    ├── data/
    ├── styles/
    ├── lib/
    └── types/
```

Project harus dapat dijalankan dengan pola:

```bash
npm install
npm run dev
npm run build
npm run preview
```

Gunakan package manager yang dipilih secara konsisten. Jangan menghasilkan lockfile campuran.

## 3.2 Recommended dependencies

```text
react
react-dom
three
@react-three/fiber
@react-three/drei
gsap
lenis
zustand
```

Tambahan hanya jika benar-benar memberi nilai:

```text
@react-three/postprocessing   # hanya jika 1–2 efek ringan lolos budget
vite-plugin-glsl              # jika shader dipisah ke file .glsl
```

Jangan menambah dependency hanya untuk fungsi yang dapat dibuat dalam 10–30 baris kode yang jelas.

## 3.3 Core architecture rule

Pengalaman terdiri dari dua layer yang bergerak sebagai satu sistem:

```text
REACT DOM / EDITORIAL UI
        ↑     ↓
EXPERIENCE STORE + MASTER PROGRESS
        ↑     ↓
R3F / THREE.JS CONTINUOUS WORLD
```

React menangani:

- semantic content,
- navigation,
- loader,
- chapter rail,
- story cards,
- project overlay,
- menu,
- accessibility,
- route/hash state,
- responsive presentation.

React Three Fiber menangani:

- one continuous WebGL world,
- camera rail,
- chapter landmarks,
- environment,
- lighting,
- fog,
- particles,
- trail,
- procedural geometry,
- custom shaders.

GSAP menangani choreography yang membutuhkan timeline presisi. `useFrame()` menangani transform real-time yang harus mengikuti frame loop WebGL.

## 3.4 No-Blender / procedural-first rule

**Blender tidak diperlukan dan jangan dijadikan bagian wajib dari pipeline.**

Landmark utama harus bisa dibangun dari:

- `BoxGeometry`,
- `PlaneGeometry`,
- `IcosahedronGeometry`,
- `CylinderGeometry`,
- `TorusGeometry`,
- `TubeGeometry`,
- `BufferGeometry`,
- `InstancedMesh`,
- merged geometries,
- seeded procedural noise,
- custom vertex/fragment shaders,
- generated canvas textures,
- image textures untuk project artwork/backplates bila diperlukan.

Jika coding agent memilih asset model eksternal, asset itu hanya optional enhancement dan tidak boleh menjadi syarat agar komposisi utama bekerja.

Target utama: **scene tetap terlihat intentional walau semua landmark dibuat 100% procedural di kode.**

---

# 3A. REACT APPLICATION ARCHITECTURE — NON-NEGOTIABLE

Gunakan arsitektur **continuous experience**, bukan page-per-route.

```text
Browser vertical scroll
        ↓
Lenis canonical scroll
        ↓
JourneyScrollController
        ↓
masterProgress 0..1 + velocity + direction
        ↓
┌───────────────────────────────┐
│ Experience Runtime           │
│ - refs / mutable runtime     │
│ - Zustand discrete state     │
└───────────────────────────────┘
        ↓                 ↓
 React DOM UI         R3F Canvas
        ↓                 ↓
 editorial layer      spatial world
```

## 3A.1 Store design

Suggested state:

```ts
interface ExperienceState {
  activeChapter: ChapterId
  previousChapter: ChapterId | null
  menuOpen: boolean
  projectSlug: string | null
  webglReady: boolean
  webglEnabled: boolean
  reducedMotion: boolean
  qualityTier: 'high' | 'medium' | 'low'
  inputMode: 'mouse' | 'touch' | 'keyboard'

  setActiveChapter(id: ChapterId): void
  openMenu(): void
  closeMenu(): void
  openProject(slug: string): void
  closeProject(): void
}
```

Do **not** put large scene objects or 60fps camera position into reactive store state.

## 3A.2 Runtime refs

Use stable mutable runtime for high-frequency values:

```ts
export const journeyRuntime = {
  progress: 0,
  targetProgress: 0,
  velocity: 0,
  direction: 0 as -1 | 0 | 1,
  pointerX: 0,
  pointerY: 0,
}
```

## 3A.3 Chapter composition API

Each chapter exports both content metadata and world component:

```ts
export const chapterConfig = { ... }
export function CraftWorld(props: ChapterWorldProps) { ... }
```

Shared interface:

```ts
interface ChapterWorldProps {
  chapter: ChapterConfig
  position: [number, number, number]
  qualityTier: QualityTier
}
```

Chapter component itself derives local progress from canonical runtime.

## 3A.4 R3F hooks policy

Use:

- `useFrame` for per-frame object/shader animation.
- `useThree` for camera/renderer access.
- `useMemo` for stable geometry/curves/material configs.
- `useRef` for mutable Three objects.
- Drei helpers selectively, not automatically.

Avoid:

- expensive geometry generation on every render,
- state setters in frame loop,
- React context carrying 60fps floats through the DOM tree,
- nested Canvas components.

## 3A.5 GSAP policy

GSAP is for:

- loader intro,
- DOM masks/reveals,
- menu/project overlay transitions,
- deterministic sequencing,
- scroll-to chapter coordination when useful.

R3F `useFrame` is for:

- camera rail,
- shader time,
- particles,
- landmark progress interpolation,
- pointer parallax.

Do not animate the same property simultaneously from GSAP and `useFrame`.

---

# 4. CORE EXPERIENCE MODEL

Website adalah **satu perjalanan horizontal kontinu**.

Pengguna melakukan scroll vertikal biasa, tetapi dunia bergerak secara horizontal dan sedikit ke depan seolah kamera mengikuti jalur museum yang panjang.

Konsep utama:

- scroll = langkah perjalanan,
- chapter = monumen,
- glowing gold trail = benang merah karier,
- horizon = masa depan,
- camera = kurator,
- user = pengunjung museum.

Tidak boleh terasa seperti slider.
Tidak boleh ada snapping kasar antar section.
Tidak boleh terasa seperti enam halaman terpisah.

Seluruh pengalaman harus terasa sebagai **satu dunia 3D kontinu**.

---

# 5. EXPERIENCE MAP

Gunakan enam chapter utama:

1. **Prelude — A Journey in Motion**
2. **Origins — Where It Began**
3. **Craft — Tools Into Possibilities**
4. **Impact — Ideas That Deliver**
5. **Process — A System That Works**
6. **Future — What’s Next**

Setiap chapter memiliki:

- landmark 3D,
- typography overlay,
- visual motif,
- local animation state,
- detail card di story rail,
- nav anchor,
- dan local progress dari `0 → 1`.

---

# 6. REFERENCE FRAME & MASTER COMPOSITION

Gunakan **1536 × 1024** sebagai master reference frame desktop.

Skala seluruh layout secara fluid, tetapi pertahankan proporsi berikut.

## 6.1 Vertical zoning

Untuk viewport 1536 × 1024:

- `0–56px` → top navigation atmosphere.
- `56–664px` → cinematic world / hero stage.
- `664–922px` → story chapter rail / visual index.
- `922–1024px` → closing footer strip.

Rasio relatif:

- Cinematic stage: ±65% tinggi viewport.
- Story rail: ±25%.
- Footer: ±10%.

Pada viewport desktop yang lebih pendek, story rail boleh mengecil ke 18–22vh, tetapi world stage tidak boleh terasa sesak.

## 6.2 Horizontal zoning

Desktop:

- Left utility/navigation rail: `32–136px`.
- Main content origin: sekitar `144px`.
- Hero title/manifesto zone: `360–760px`.
- 3D world mengambil seluruh layar dan berada di belakang UI.
- Right edge tidak boleh terlalu padat; sisakan negative space untuk Future/horizon.

## 6.3 Safe margins

Gunakan safe margin:

- Desktop: `32px` minimum, `48px` preferred.
- Laptop: `24px`.
- Tablet: `20px`.
- Phone: `16px`.

Jangan menempelkan typography penting ke edge layar.

---

# 7. ART DIRECTION

## 7.1 Global look

Dunia MAHAKARYA menggunakan perpaduan:

- deep navy-black,
- charcoal mineral,
- muted steel blue,
- warm ivory typography,
- restrained gold/amber light,
- cool atmospheric haze.

Jangan gunakan warna neon cyberpunk.
Jangan gunakan gradient pelangi.
Jangan gunakan holographic glass UI.
Jangan gunakan chrome berlebihan.

## 7.2 Color palette

Gunakan palette berikut sebagai konstanta:

```css
--bg-void: #071018;
--bg-deep: #0a131b;
--bg-panel: #101a22;
--bg-panel-2: #141f28;
--surface-stone: #242b30;
--surface-steel: #5f6971;
--ink-primary: #f3efe8;
--ink-secondary: #b8c0c5;
--ink-muted: #7f8b93;
--gold-primary: #e7b86b;
--gold-bright: #ffd99b;
--gold-dim: #9f7745;
--cool-light: #b7d5ea;
--line-dim: rgba(223, 232, 238, 0.18);
--line-soft: rgba(255,255,255,0.08);
--overlay-black: rgba(2,7,11,0.62);
```

Gold dipakai hemat sebagai:

- journey trail,
- active nav dot,
- chapter highlight,
- beacon,
- selected interactive state.

Jika semua elemen emas, art direction gagal.

## 7.3 Material language

Gunakan material:

- basalt / matte stone,
- smoked metal,
- dark brushed aluminium,
- weathered architectural panels,
- faintly reflective wet floor,
- glass hanya sebagai aksen arsitektural tipis,
- warm emissive seams.

Roughness dominan tinggi.
Specular dominan rendah.
Reflection harus subtle.

## 7.4 Atmosphere

Tambahkan:

- depth fog,
- low cloud layers,
- sparse star/particle field,
- floating rock fragments,
- soft environment gradients,
- distant silhouettes,
- thin contour lines.

Kabut adalah alat depth, bukan efek dekoratif yang menutupi UI.

---

# 8. TYPOGRAPHY SYSTEM

Gunakan maksimal dua typeface.

Recommended:

- **Display / chapter / numeral:** `Barlow Condensed`
- **Body / UI / brand:** `Manrope`

Google Fonts diperbolehkan.

## 8.1 Brand wordmark

`MAHAKARYA`

Desktop:

- Manrope 300–400,
- uppercase,
- letter-spacing `0.52em`,
- font-size `14–18px` untuk top bar,
- headline hero versi besar `clamp(42px, 5vw, 78px)`.

Pada hero, beberapa huruf boleh diberi warna gold dim dengan sangat halus, tetapi jangan membuat efek rainbow.

## 8.2 Hero title

Contoh:

`M A H A K A R Y A`

Gunakan:

- large spacing,
- breathing room besar,
- white/ivory dengan 1–2 letters gold accent,
- line-height sekitar `0.9–1.0`.

## 8.3 Chapter labels

Contoh:

`01 PRELUDE`

- numeral: Barlow Condensed 300, 34–48px.
- label: 12–14px, letter spacing `0.26em`.
- supporting line: 11–13px.

## 8.4 Body

- 14–17px desktop.
- line-height `1.55–1.7`.
- max-width 46ch.
- color `--ink-secondary`.

## 8.5 UI microcopy

- 10–12px.
- uppercase.
- tracking `0.22–0.32em`.

Jangan membuat semua text terlalu kecil hanya demi estetika.

---

# 9. GLOBAL REACT UI + EXPERIENCE SHELL

UI editorial harus dirender sebagai DOM React di atas satu fixed R3F canvas. Typography utama tidak boleh digambar ke WebGL.

Component tree konseptual:

```text
<App>
├── <ExperienceProvider />
├── <Loader />
├── <WebGLStage>
│   └── <Canvas>
│       └── <Suspense>
│           ├── <World />
│           │   ├── <Environment />
│           │   ├── <JourneyTrail />
│           │   ├── <PreludeWorld />
│           │   ├── <OriginsWorld />
│           │   ├── <CraftWorld />
│           │   ├── <ImpactWorld />
│           │   ├── <ProcessWorld />
│           │   └── <FutureWorld />
│           ├── <CameraRig />
│           ├── <JourneyLighting />
│           ├── <Atmosphere />
│           └── <PerformanceController />
├── <AtmosphereOverlay />
├── <TopBar />
├── <ChapterRail />
├── <HeroManifesto />
├── <ChapterStoryRail />
├── <CurrentChapterIndicator />
├── <Footer />
├── <MenuOverlay />
├── <ProjectOverlay />
├── <CustomCursor />
└── <A11yAnnouncements />
```

## 9.1 DOM layering

Gunakan z-index contract yang konsisten:

```text
0   WebGL canvas
10  CSS atmospheric overlay / grain / vignette
20  decorative connector SVG
30  editorial chapter content
40  persistent navigation
50  story card rail / footer
80  menu overlay
90  project overlay
100 loader
110 focus / debug / development overlays
```

Jangan mengatur z-index ad hoc pada puluhan komponen.

## 9.2 React responsibility boundaries

- `App.tsx` hanya orchestration.
- Chapter DOM copy tidak boleh bercampur dengan low-level shader code.
- `World.tsx` tidak boleh mengatur menu state.
- `CameraRig.tsx` tidak boleh memodifikasi DOM langsung.
- `ExperienceStore` tidak boleh menyimpan object Three.js berat yang tidak perlu.
- refs boleh digunakan untuk object 3D yang perlu update per-frame.

## 9.3 Re-render discipline

Master scroll progress bergerak setiap frame, maka:

- jangan menyimpan `masterProgress` di React local state yang menyebabkan full tree re-render.
- simpan canonical progress di mutable store/ref.
- UI hanya subscribe ke derived state frekuensi rendah seperti `activeChapter`, `menuOpen`, `projectOpen`, `qualityTier`.
- R3F object membaca progress melalui ref/store di `useFrame()`.
- gunakan selector Zustand agar komponen hanya re-render jika slice yang dipakai berubah.

Contoh prinsip:

```ts
// GOOD: active chapter changes occasionally
const activeChapter = useExperienceStore(s => s.activeChapter)

// AVOID: entire DOM tree subscribing to 60fps float progress
const progress = useExperienceStore(s => s.masterProgress)
```

## 9.4 Error boundaries

Sediakan error boundary untuk WebGL stage. Jika WebGL init gagal:

- pertahankan React UI,
- gunakan static fallback background,
- tetap izinkan semua chapter dibaca,
- jangan blank screen.

---

# 10. TOP BAR

Top bar fixed di bagian atas.

Desktop:

- height `56px`.
- left: MAHAKARYA + `Career Journey Portfolio`.
- right: tagline `A Journey of Ideas. A Lifetime of Impact.`
- far right: `MENU` button + 4-dot glyph.

Visual:

- background transparan.
- bottom border `1px solid rgba(255,255,255,.08)` opsional hanya saat user scroll > 3%.
- backdrop blur maksimal `4px`; jangan jadikan glassmorphism.

Interaction:

- sebelum scroll: bar hampir invisible, menyatu dengan world.
- setelah global progress > `.03`: background menjadi `rgba(7,16,24,.56)` dan border muncul.
- menu hover: dot glyph rotate `45deg` dalam `240ms`.

---

# 11. LEFT CHAPTER RAIL

Letakkan vertical chapter nav di kiri seperti reference.

Isi:

```text
01 Prelude
02 Origins
03 Craft
04 Impact
05 Process
06 Future
```

Tambahkan vertical line dari chapter 1 ke 6 dengan dot kecil.

## Active state

Chapter aktif:

- dot diameter `8px` dengan glow gold.
- label `--ink-primary`.
- inactive `--ink-muted`.
- progress segment antara dot boleh menyala secara gradual sesuai perjalanan.

## Interaction

- Hover label: shift x `+4px`, color brighten, dot enlarge `1.25x`.
- Click label: smooth scroll ke chapter anchor.
- Keyboard focus: outline gold `2px` yang jelas.

## Responsive

- Hide pada <= 900px.
- Diganti chapter indicator compact di top bar.

---

# 12. HERO / MANIFESTO OVERLAY

Pada chapter Prelude, tampilkan:

```text
MAHAKARYA
A CAREER JOURNEY PORTFOLIO

Setiap langkah, sebuah makna.
Setiap karya, jejak perubahan.
Ini bukan sekadar portfolio.
Ini adalah mahakarya perjalanan.

SCROLL TO BEGIN
```

Posisi desktop reference:

- block start sekitar `x=360px`, `y=94px`.
- hero title max-width `610px`.
- paragraph start ± `y=206px`.
- scroll hint ± `y=320px`.

Motion masuk:

- wordmark reveal via masked translateY.
- subtitle letter fade stagger.
- paragraph fade up.
- scroll hint line draw dari kiri ke kanan.

Durasi intro setelah loader:

- 0.00–0.35s: canvas visible.
- 0.20–0.80s: world brightness naik.
- 0.55–1.10s: wordmark reveal.
- 0.80–1.35s: paragraph reveal.
- 1.15–1.55s: rail + scroll hint reveal.

Semua intro dapat dilewati jika user langsung scroll.

---

# 13. MASTER SCROLL ENGINE — REACT + LENIS + GSAP

Gunakan **satu canonical scroll system**. Semua chapter, camera, DOM choreography, trail, dan lighting membaca master progress yang sama.

## 13.1 Scroll ownership

`JourneyScrollController` bertanggung jawab atas:

- Lenis lifecycle,
- GSAP ticker integration,
- ScrollTrigger refresh,
- conversion `scroll → masterProgress`,
- chapter active-state calculation,
- programmatic chapter navigation,
- reduced-motion bypass.

Jangan membuat tiap component memiliki wheel listener sendiri.

## 13.2 Desktop scroll shell

Untuk desktop/tablet landscape:

- halaman tetap menggunakan vertical browser scroll,
- visual world terasa bergerak horizontal/forward,
- total target scroll distance sekitar `6.2 × viewportHeight`,
- WebGL canvas fixed,
- UI layer fixed/sticky sesuai kebutuhan,
- tidak ada literal horizontal scrollbar utama.

Canonical normalization:

```ts
const maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight)
const P = clamp(scrollY / maxScroll, 0, 1)
```

Jika Lenis aktif, gunakan posisi canonical dari Lenis. Jangan secara bersamaan membaca raw `window.scrollY` sebagai source kedua.

## 13.3 Lenis lifecycle in React

Implementasikan melalui custom hook seperti:

```text
useJourneyScroll()
```

Behavior:

- create satu Lenis instance setelah mount.
- connect ke GSAP ticker atau RAF tunggal.
- call `ScrollTrigger.update()` ketika Lenis mengeluarkan event scroll.
- cleanup instance saat unmount/HMR.
- jangan membuat instance baru pada setiap re-render.

Baseline feel:

```ts
{
  duration: 1.08,
  smoothWheel: true,
  wheelMultiplier: 0.92,
  touchMultiplier: 1.0,
  syncTouch: false
}
```

Jika API Lenis versi terpasang menggunakan konfigurasi berbeda, pertahankan feel yang ekuivalen, bukan memaksa option obsolete.

## 13.4 Master progress storage

Master progress harus tersedia tanpa memaksa React render 60 kali/detik.

Recommended pattern:

```ts
interface JourneyRuntime {
  progress: number
  velocity: number
  direction: -1 | 0 | 1
}

export const journeyRuntime: JourneyRuntime = {
  progress: 0,
  velocity: 0,
  direction: 0,
}
```

Atau simpan dalam Zustand tetapi baca melalui `store.getState()` / ref di frame loop, bukan subscribe semua DOM component.

Low-frequency derived state yang boleh masuk reactive Zustand:

```ts
activeChapter
previousChapter
isScrolling
menuOpen
projectSlug
inputMode
qualityTier
reducedMotion
webglReady
```

## 13.5 Chapter ranges

Gunakan global ranges:

```text
Prelude : 0.000 – 0.155
Origins : 0.135 – 0.320
Craft   : 0.285 – 0.490
Impact  : 0.450 – 0.665
Process : 0.625 – 0.835
Future  : 0.790 – 1.000
```

Overlap sengaja agar perjalanan tidak terasa seperti slide snapping.

Helper wajib:

```ts
clamp01(value)
mapRange(value, inMin, inMax, outMin, outMax)
localProgress(progress, range)
sectionWeight(progress, range)
getDominantChapter(progress)
```

## 13.6 Programmatic navigation

`goToChapter(id)` harus:

1. resolve chapter center progress,
2. convert progress ke scroll position,
3. scroll melalui Lenis jika aktif,
4. fallback ke native smooth scroll,
5. menghormati reduced motion,
6. update URL hash tanpa reload,
7. tidak menyebabkan duplicate analytics/history events.

## 13.7 Scroll velocity use

Velocity boleh mempengaruhi:

- tipisnya camera lag,
- trail energy,
- particle drift,
- motion blur illusion via shader offset ringan.

Velocity **tidak boleh** menyebabkan camera shake atau readability loss.

## 13.8 React StrictMode safety

Development React dapat melakukan mount/unmount ulang. Semua scroll subscriptions, GSAP contexts, resize observers, pointer listeners, dan Lenis instances harus cleanup dengan benar sehingga tidak terjadi:

- double ticker,
- double ScrollTrigger,
- duplicate RAF,
- duplicate wheel handling,
- progress acceleration setelah HMR.

---

# 14. WEBGL WORLD ARCHITECTURE — ONE R3F CANVAS, ONE WORLD

Gunakan **satu `<Canvas>` React Three Fiber** yang fixed di belakang seluruh UI.

Jangan membuat satu canvas per chapter. Jangan mengganti scene penuh setiap chapter. Semua landmark berada dalam satu world coordinate system sehingga perjalanan benar-benar kontinu.

Recommended canvas baseline:

```tsx
<Canvas
  dpr={[1, 1.5]}
  gl={{
    antialias: !isLowTier,
    alpha: true,
    powerPreference: 'high-performance',
  }}
  camera={{
    fov: 38,
    near: 0.1,
    far: 260,
    position: [-8, 3.4, 12],
  }}
>
  <World />
</Canvas>
```

Setelah renderer tersedia:

```ts
gl.outputColorSpace = THREE.SRGBColorSpace
gl.toneMapping = THREE.ACESFilmicToneMapping
gl.toneMappingExposure = 0.95
```

Gunakan `dpr` adaptif; mobile tidak boleh memaksa DPR perangkat 2–4.

## 14.1 World component plan

```text
<World>
├── <WorldFog />
├── <GroundSystem />
├── <JourneyTrail />
├── <PreludeWorld position={[0,0,0]} />
├── <OriginsWorld position={[22,0,0]} />
├── <CraftWorld position={[44,0,0]} />
├── <ImpactWorld position={[68,0,0]} />
├── <ProcessWorld position={[92,0,0]} />
├── <FutureWorld position={[118,0,0]} />
├── <DistantRockField />
├── <AtmosphericParticles />
└── <WorldLighting />
```

Semua chapter menerima:

```ts
chapterId
range
worldPosition
qualityTier
```

Setiap chapter internal menggunakan `useFrame()` dan local refs untuk animation, tetapi amplitudo dikalikan `sectionWeight`.

## 14.2 World coordinates

Landmark anchors:

```text
Prelude : x =   0
Origins : x =  22
Craft   : x =  44
Impact  : x =  68
Process : x =  92
Future  : x = 118
```

Sediakan ruang negatif antar-landmark. Jangan memenuhi setiap meter dengan object.

## 14.3 Camera spline

Gunakan `THREE.CatmullRomCurve3` atau interpolator cubic yang dibuat sekali dengan `useMemo()`.

Camera points:

```text
(-8,  3.4, 12)
( 4,  3.1, 10)
(22,  4.2, 11)
(43,  3.6, 10)
(67,  4.5, 12)
(92,  3.2, 11)
(116, 4.8, 13)
```

Target points:

```text
( 0, 2.4, 0)
(22, 2.8, 0)
(44, 2.4, 0)
(68, 2.6, 0)
(92, 2.2, 0)
(120,3.0, 0)
```

`CameraRig` melakukan:

```text
master progress
→ spline sample
→ velocity-aware smoothing
→ pointer additive offset
→ look target interpolation
→ camera transform
```

Jangan memanggil React `setState` di `useFrame` untuk camera transform.

## 14.4 CameraRig pseudocode

```tsx
function CameraRig() {
  const { camera } = useThree()
  const cameraPos = useMemo(() => new THREE.Vector3(), [])
  const targetPos = useMemo(() => new THREE.Vector3(), [])
  const look = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, dt) => {
    const p = journeyRuntime.progress
    cameraCurve.getPointAt(p, cameraPos)
    targetCurve.getPointAt(p, targetPos)

    cameraPos.x += pointerRuntime.x * 0.16
    cameraPos.y += pointerRuntime.y * 0.10

    camera.position.lerp(cameraPos, 1 - Math.exp(-dt * 7.5))
    look.lerp(targetPos, 1 - Math.exp(-dt * 6.5))
    camera.lookAt(look)
  })

  return null
}
```

Jangan allocate `new Vector3()` di hot path setiap frame.

## 14.5 Scene fog

Gunakan fog sebagai depth compositor, bukan untuk menutup geometry buruk.

Baseline:

```text
FogExp2 color: #071018
Desktop density: 0.010–0.014
Tablet density:  0.012–0.016
Mobile density:  0.014–0.018
```

Density boleh berubah halus antar-chapter, tetapi jangan membuat hard cut.

---

# 15. LIGHTING SYSTEM

Gunakan lighting sinematik tetapi ekonomis.

Global:

- HemisphereLight cool dim `0.25`.
- Directional key light cool dari upper-left `0.75`.
- Warm rim/point lights dekat portal aktif `0.3–1.1` tergantung progress.

Per chapter:

- maksimal 1–2 dynamic lights aktif bersamaan.
- inactive chapter lights diredupkan.

Shadow:

- hanya hero objects penting.
- PCFSoftShadowMap.
- shadow map 1024 desktop, off/512 tablet, off mobile low-tier.

Jangan membuat semua object cast/receive shadow.

---

# 16. JOURNEY TRAIL — SIGNATURE VISUAL

Jalur cahaya emas adalah identitas utama website.

Buat sebagai spline yang menghubungkan enam landmark.

Implementation pilihan:

- `TubeGeometry` tipis dengan emissive material,
- atau custom ribbon shader untuk garis lebih elegan.

Properties:

- base width world `0.025–0.06`.
- emissive gold `#e7b86b`.
- brightness dekat active chapter `1.8x`.
- outer halo menggunakan duplicate geometry additive blending dengan opacity rendah.

Progress behavior:

- jalur di belakang user: fully lit.
- area ±10% di depan camera: brightest.
- jauh di depan: dim 15–25%.

Gunakan uniform `uProgress` untuk reveal trail dari `0 → 1`.

Jangan gunakan dashed sci-fi laser.
Bentuk harus terasa seperti “cahaya yang menuntun perjalanan”.

---

# 17. POINTER / PARALLAX MODEL

Desktop only.

Normalize pointer:

```js
mx = (clientX / width - 0.5)
my = (clientY / height - 0.5)
```

Limit:

- camera yaw additive max ±`1.6°`.
- pitch max ±`1.0°`.
- nearby floating object translation max `0.12` world units.
- DOM hero text parallax max `8px`.

Gunakan damped lerp agar halus.

Disable parallax:

- touch device,
- reduced motion,
- low power mode heuristic.

---

# 18. CHAPTER 01 — PRELUDE

## Concept

Prelude adalah gerbang raksasa. Ini harus menjadi visual paling ikonik saat first load.

## Landmark

Buat dua slab monolit gelap tinggi membentuk portal vertikal.

Dimensi kira-kira:

- portal height: 9.5 world units.
- slab width: 2.1.
- opening width: 2.0.
- depth: 0.8.

Di tengah portal:

- vertical white-gold energy seam,
- subtle circular/cosmic ring pattern,
- faint star particles.

Di depan portal:

- lone human silhouette sangat kecil untuk memberi sense of scale.
- reflective dark floor dengan roughness tinggi.

Background:

- rugged mountain silhouettes,
- low fog,
- faint celestial body / curved ring hanya sebagai ambience.

## Motion

Local `0 → 1`:

- portal glow turun dari 100% ke 45% saat meninggalkan chapter.
- camera bergerak lateral melewati sisi kanan portal.
- energy ring rotate max 12° total, sangat lambat.
- human silhouette tetap stabil.

## DOM copy

Title:

`MAHAKARYA`

Subtitle:

`A CAREER JOURNEY PORTFOLIO`

Manifesto Indonesia:

`Setiap langkah, sebuah makna. Setiap karya, jejak perubahan. Ini bukan sekadar portfolio. Ini adalah mahakarya perjalanan.`

CTA:

`SCROLL TO BEGIN`

---

# 19. CHAPTER 02 — ORIGINS

## Concept

Asal mula direpresentasikan oleh **floating island dengan satu pohon**. Pohon = ide pertama yang hidup. Batu-batu kecil yang mengorbit = eksperimen awal.

## Landmark composition

- Main floating island: irregular rock mass, radius ±2.8.
- One sculptural tree di atasnya.
- 8–16 floating rock fragments.
- Background distant terrain.
- One thin gold trail melewati bawah island.

## Visual tone

Chapter sedikit lebih terang daripada Prelude, tetapi tetap berada dalam dunia yang sama.

## Motion

- floating island bobbing max `0.08` units.
- fragments rotate lambat dengan seeded speed.
- tree tidak bergoyang seperti game fantasy; maksimal subtle branch sway.
- camera sedikit rise saat mendekati chapter.

## Copy

Heading:

`WHERE IT BEGAN`

Subheading:

`Curiosity becomes direction.`

Supporting:

`Eksperimen awal, rasa ingin tahu, dan keputusan-keputusan kecil yang akhirnya membentuk cara saya berkarya.`

Tambahkan 3 milestone kecil yang bisa diganti user:

```text
201X — FIRST EXPERIMENT
201X — FIRST REAL PROJECT
202X — FIRST SYSTEM I WAS PROUD OF
```

## Interaction

Saat milestone di-hover:

- floating fragment terkait mendapat thin gold outline / emissive pulse.
- tidak lebih dari 500ms.

---

# 20. CHAPTER 03 — CRAFT

## Concept

Craft adalah **arsitektur modular yang sedang dirakit**.

Landmark berbentuk struktur grid tiga dimensi dengan panel, frame, beam, dan volume yang saling mengunci.

Representasi skill:

- Design Systems → grid plane.
- Interfaces → window/frame.
- Motion → ribbon/curved rail.
- 3D → sculptural node cluster.

## Structure

Gunakan 4 major modules:

1. `SYSTEM`
2. `INTERFACE`
3. `MOTION`
4. `SPACE`

Masing-masing dapat diberi small label line yang terhubung menggunakan DOM/SVG overlay atau CSS absolute line.

## Motion

Saat local progress mendekati `0.5`:

- modules align ke komposisi paling sempurna.

Di edges:

- offsets ±0.35 units.
- rotations ±4–7°.

Gunakan smooth interpolation, jangan random per frame.

## Hover interaction

Jika user hover skill label:

- object bersangkutan brighten.
- object shift toward camera `0.15` units.
- label connector line animate draw.

## Copy

Heading:

`TOOLS INTO POSSIBILITIES`

Body:

`Skill bukan daftar software. Skill adalah kemampuan mengubah batas menjadi kemungkinan.`

---

# 21. CHAPTER 04 — IMPACT

## Concept

Impact adalah dunia paling dramatis setelah Future.

Visual:

- fragmented cliff city,
- vertical waterfall,
- layered architecture,
- three project planes/monuments,
- mist,
- warm light seams.

Ini merepresentasikan hasil nyata dan konsekuensi karya.

## Project monuments

Buat 3 project anchors:

```text
01 — DIGITAL EXPERIENCE PLATFORM
02 — SUSTAINABLE TECH INITIATIVE
03 — CREATIVE AUTOMATION SYSTEM
```

Masing-masing memiliki:

- title,
- role,
- 1 outcome line,
- optional metric,
- thumbnail / abstract render.

## 3D representation

Setiap project bukan card datar biasa.

Buat sebagai:

- monolithic floating slab,
- inset screen surface,
- edge light,
- project-specific geometry motif.

## Interaction

Saat project anchor active:

- camera target shift sedikit ke slab.
- inactive slabs reduce opacity/material brightness.
- title DOM muncul dari mask.
- `VIEW PROJECT` muncul sebagai button.

Click:

- open detail overlay fullscreen, tidak berpindah page langsung.
- overlay memiliki close button, keyboard escape, focus trap.
- back button browser tetap meaningful jika hash digunakan.

## Detail overlay

Isi:

- project number,
- problem,
- role,
- process,
- contribution,
- result,
- gallery / image sequence,
- link external jika ada.

Animasi open:

- selected slab scale/translate illusion ke depan.
- DOM overlay fade in 320–420ms.
- background WebGL exposure turun 20%.

---

# 22. CHAPTER 05 — PROCESS

## Concept

Process adalah **kinetic system diagram** berbentuk orrery / concentric rings.

Visual harus terlihat seperti alat ilmiah masa depan, bukan planetarium fantasy.

Stages:

1. Discover
2. Define
3. Design
4. Develop
5. Deliver

## 3D build

Gunakan:

- 5 thin rings / torus,
- central vertical axis,
- 5 nodes,
- 1 moving warm light pulse,
- fine connector lines.

## Motion mapping

Local progress:

- `0.00–0.18` Discover ring lights.
- `0.18–0.36` Define.
- `0.36–0.56` Design.
- `0.56–0.78` Develop.
- `0.78–1.00` Deliver.

Ring rotations sangat lambat dan berbeda axis ±5°.

Setiap stage active:

- ring brightness naik.
- corresponding text row becomes primary.
- small pulse travels along connector.

Saat mencapai local `1.0`:

- seluruh sistem menyala sekali `450ms` kemudian settle.

## Copy

Heading:

`A SYSTEM THAT WORKS`

Body:

`Dari ketidakjelasan menuju hasil. Proses saya dirancang untuk mengubah kompleksitas menjadi keputusan yang dapat dijalankan.`

---

# 23. CHAPTER 06 — FUTURE

## Concept

Future adalah chapter paling terang, memberi resolusi emosional.

Visual:

- dark foreground,
- distant futuristic city / skyline,
- low sun / luminous orb,
- one large portal frame,
- solitary figure facing horizon,
- gold trail yang menuju portal lalu menghilang ke horizon.

Jangan membuat city cyberpunk penuh neon.
Gunakan sunrise/sunset ivory-gold.

## Motion

Pada global progress `0.82 → 1`:

- exposure naik sedikit.
- fog menipis.
- city silhouette lebih jelas.
- gold trail brighten.
- camera rise ±0.8 units.

Saat progress mencapai `0.985`:

- beacon pulse sekali.
- headline final lock in.

## Copy

Heading:

`WHAT’S NEXT`

Body:

`Bigger challenges. Greater impact. Let’s build what’s next together.`

CTA primary:

`GET IN TOUCH`

CTA secondary:

`VIEW RESUME`

Links:

- Email
- LinkedIn
- GitHub / Behance / Dribbble sesuai kebutuhan

---

# 24. CHAPTER STORY CARD RAIL

Di bawah cinematic stage, tampilkan 6 visual chapter cards seperti contact sheet / exhibition index.

Desktop:

- 6 columns equal width.
- height sekitar `230–260px` pada master 1024h.
- border-left antar card `1px`.

Card structure:

```text
[background image/render]
[dark bottom gradient]
01  PRELUDE
Manifesto, who I am,
and why I create.
[round arrow button]
```

## Card states

Inactive:

- image saturation 75%.
- brightness 75–85%.
- overlay dark 35%.

Active:

- brightness 100%.
- gold top edge `1px`.
- arrow ring gold.

Hover:

- image scale `1.025` over 500ms.
- background pan max `8px`.
- arrow translate x `3px`.
- title letter-spacing reduce slightly.

Click:

- scroll directly ke chapter.

## Mobile

Rail menjadi horizontal swipe-able `overflow-x:auto` dengan scroll snap hanya pada rail, bukan pada cinematic world.

---

# 25. FOOTER

Footer tidak boleh terlihat seperti template.

Layout desktop:

Left:

```text
M A H A K A R Y A
Career Journey Portfolio
```

Center:

```text
“IDEAS TRAVEL FURTHER WHEN THEY ARE REAL.”
MY JOURNEY CONTINUES ———
```

Right:

- LinkedIn
- Email
- Download CV

Visual:

- height 90–110px.
- border-top subtle.
- background #071018.
- micro typography.

Links hover:

- icon line draw / shift.
- text turns ivory.
- gold underline grows left → right.

---

# 26. MENU OVERLAY

Menu button membuka fullscreen overlay.

Visual:

- dark navy `rgba(5,12,18,.96)`.
- left large vertical chapter list.
- right: contact + short manifesto + current chapter miniature preview.
- subtle world remains visible at 20% brightness.

Open animation:

- overlay clip-path from top-right.
- duration 460ms.
- nav items stagger 45ms.

Close:

- reverse.
- ESC support.
- click outside optional.
- body scroll locked while menu open.

Accessibility:

- `aria-expanded`.
- focus trap.
- restore focus to menu button on close.

---

# 27. CURSOR SYSTEM

Desktop pointer device only.

Gunakan cursor custom sangat subtle:

- 6px center dot.
- 28px outer ring.
- default opacity 0.65.

Hover interactive:

- ring scale 1.35.
- ring border gold.

Hover project:

- outer ring berisi small label `VIEW` opsional.

Jangan gunakan cursor besar yang mengganggu membaca.

Disable pada touch.

---

# 28. TEXT REVEAL SYSTEM

Gunakan deterministic reveal.

Headlines:

- split per word.
- wrapper overflow hidden.
- hidden: `translateY(110%) rotate(1.5deg)`.
- shown: `translateY(0) rotate(0)`.

Body:

- opacity 0 → 1.
- translateY 12px → 0.

Micro labels:

- letter opacity stagger optional.

Jangan split screen reader text.
Gunakan duplicate visual layer dengan `aria-hidden="true"` bila perlu.

---

# 29. SECTION TRANSITION LANGUAGE

Saat bergerak antar chapter, gunakan kombinasi:

- camera travel,
- atmospheric occlusion,
- foreground object pass,
- DOM overlay fade/slide,
- light focus transfer,
- local soundless “breathing” movement.

Jangan melakukan:

- full-screen white flash,
- hard cut,
- page fade-to-black setiap section,
- snap carousel.

Target: transisi terasa seperti berjalan dari galeri satu ke galeri berikutnya.

---

# 30. ATMOSPHERIC LAYERS

Gunakan maksimal 4 layer ambience:

1. distant sky gradient / world background,
2. fog planes / particles,
3. main 3D landmarks,
4. foreground occluders / rocks.

Foreground occluder penting untuk depth. Saat camera melintas antar chapter, batu/struktur dekat camera boleh lewat di depan frame selama 250–700ms.

Jaga agar occluder tidak menghalangi text > 30% area text block.

---

# 31. PARTICLE SYSTEM

Gunakan instanced points, bukan ratusan meshes.

Desktop max:

- stars/dust: 500–900 points.
- rock fragments: 30–60 actual meshes/instances.

Mobile:

- 180–320 particles.
- 10–20 rock fragments.

Particles harus slow dan depth-aware.
Tidak boleh seperti snow effect.

---

# 32. SHADER GUIDELINES

Custom shader diperbolehkan tetapi minimal.

Gunakan shader hanya untuk:

- energy seam portal,
- gold trail reveal,
- waterfall flow,
- fog noise / mist,
- subtle emissive pulse.

Jangan gunakan full-screen psychedelic fragment shader.

Semua noise harus low-frequency.

Gunakan deterministic seed agar scene sama pada setiap refresh.

---

# 33. WATERFALL ASSET / SHADER

Impact chapter memerlukan waterfall yang halus.

Implementasi:

- vertical plane geometry,
- transparent texture / procedural noise,
- UV scroll downward,
- opacity 0.35–0.65,
- slight blue-grey tint,
- white highlight hanya di crest.

Tambahkan mist di dasar sebagai instanced sprite/points.

Jangan membuat air terlalu biru atau glossy.

---

# 34. REFLECTIVE FLOOR

Prelude dan beberapa transition areas menggunakan wet-floor reflection.

Jangan gunakan real-time planar reflection penuh pada semua device.

Preferred:

- dark PlaneGeometry,
- roughness `0.7–0.9`,
- low metalness,
- subtle fake reflection menggunakan duplicated blurred silhouettes / light streak.

Desktop high tier optional reflector hanya di Prelude.

---

# 35. RESPONSIVE STRATEGY

## >= 1280px — Full cinematic

- full shared 3D world.
- left rail visible.
- story card rail 6 columns.
- pointer parallax.
- shadows limited.
- advanced particles.

## 900–1279px — Laptop/tablet landscape

- shared 3D world tetap.
- left rail condensed.
- hero copy smaller.
- story cards 3–4 visible with horizontal scroll.
- fewer particles.
- simplified fog.

## 768–899px — Tablet portrait

- hide full left rail.
- top chapter indicator.
- world still horizontal.
- hero text moves to lower left safe zone.
- story rail horizontal.

## < 768px — Mobile cinematic vertical

Jangan memaksakan seluruh desktop horizontal world yang terlalu berat.

Gunakan vertical chapter stack dengan tiap chapter `min-height: 100svh`.

WebGL:

- satu canvas fixed di belakang.
- chapter landmark dimorph/di-switch berdasarkan scroll section.
- geometry simplification.
- pixel ratio cap 1.
- no shadows.
- no pointer parallax.

UI:

- sticky topbar 52px.
- chapter indicator `01/06`.
- CTA mudah disentuh min 44px.

## < 420px

- typography hero max 44px.
- story cards width 82vw.
- paragraph max 34ch.
- decorative details dikurangi 40–60%.

---

# 36. REDUCED MOTION

Jika `prefers-reduced-motion: reduce`:

- disable Lenis.
- disable pointer parallax.
- camera path tetap berpindah tetapi dengan interpolation minimal.
- particle drift hampir nol.
- no floating bob.
- no auto looping pulse kecuali satu kali state change.
- text reveal menggunakan simple opacity.
- chapter navigation tetap berfungsi penuh.

Accessibility bukan alasan untuk merusak layout.

---

# 37. KEYBOARD INTERACTION

Support:

- `ArrowDown` / `PageDown`: lanjut perjalanan.
- `ArrowUp` / `PageUp`: mundur.
- `Home`: Prelude.
- `End`: Future.
- `1–6`: optional jump chapter jika tidak berada di input.
- `Escape`: close menu/project overlay.
- `Tab`: seluruh interactive elements reachable.

Jangan hijack keyboard jika focus berada di form field.

---

# 38. TOUCH INTERACTION

Touch utama tetap vertical scroll.

Jangan mengharuskan horizontal swipe untuk menavigasi world.

Story card rail boleh di-swipe horizontal secara natural.

Gunakan passive touch listeners kecuali benar-benar perlu.

---

# 39. LOADING EXPERIENCE — REACT SUSPENSE + REAL READINESS

Loader harus singkat, elegan, dan merefleksikan readiness nyata.

Visual:

```text
MAHAKARYA
LOADING THE JOURNEY  68%
──────────────
```

Background `#071018`.

## 39.1 Loading sources

Readiness terdiri dari:

- React application mounted,
- font readiness,
- critical images loaded,
- R3F context ready,
- Prelude procedural world compiled,
- required shader programs compiled setelah first render.

Karena landmark utama procedural, jangan membuat loader pura-pura menunggu file model besar yang tidak ada.

Gunakan `<Suspense fallback={null}>` untuk resource yang memang asynchronous, tetapi loader UI tetap berada di DOM layer.

## 39.2 Progress strategy

Boleh gunakan weighted readiness:

```text
10% app mounted
15% fonts
20% critical UI image assets
25% WebGL context + first frame
20% Prelude world/material compile
10% final intro readiness
```

Jika semuanya siap sangat cepat, minimum loader exposure sekitar `350–550ms` cukup untuk mencegah flash. Jangan paksa 2–3 detik hanya demi terlihat sinematik.

## 39.3 Failure behavior

Jika WebGL gagal:

- set `webglAvailable=false`,
- continue ke static fallback,
- tetap buka aplikasi,
- loader tidak boleh stuck di 99%.

Jika image pendukung gagal:

- gunakan generated gradient/solid art block,
- catat warning hanya di development.

## 39.4 Transition

Loader exit:

1. background world exposure naik,
2. wordmark tetap sesaat,
3. line loader memanjang menjadi horizon/trail hint,
4. hero manifesto reveal,
5. controls appear.

Semua GSAP timeline dibuat dengan `gsap.context()` dan direvert saat unmount.

---

# 40. DEEP LINKING & HISTORY WITHOUT ROUTER BLOAT

Gunakan URL hash sebagai state publik:

```text
#prelude
#origins
#craft
#impact
#process
#future
#impact/project-slug
```

Tidak perlu React Router untuk enam chapter jika kebutuhan hanya hash + overlay.

Buat hook:

```text
useJourneyHistory()
```

Responsibilities:

- parse `location.hash` pada initial load,
- navigate ke chapter setelah scroll system siap,
- push/replace state ketika user click chapter,
- push state ketika project overlay dibuka,
- restore overlay/chapter pada `popstate`/`hashchange`,
- browser Back menutup project overlay sebelum meninggalkan chapter,
- tidak update hash pada setiap pixel scroll.

Hash chapter otomatis boleh diperbarui saat dominant chapter berubah **hanya** dengan `history.replaceState`, bukan `pushState`, supaya Back button tidak memiliki puluhan entri.

Project explicit click boleh `pushState`.

Jika user load langsung ke `#impact/project-slug`:

1. mount app,
2. initialize scroll runtime,
3. jump/scroll ke Impact sesuai reduced-motion rule,
4. open overlay,
5. move focus ke overlay heading.

---

# 41. ASSET CREATION PIPELINE — PROCEDURAL-FIRST, NO BLENDER REQUIRED

Prinsip utama:

> Dunia MAHAKARYA harus dapat dibuat hanya dengan React Three Fiber + Three.js + shader + image textures ringan.

Pipeline utama:

1. **Concept reference** — tentukan silhouette, scale, framing, dan narrative purpose.
2. **Procedural blockout** — buat landmark dari primitive Three.js.
3. **Seeded deformation** — tambahkan controlled noise agar batu/permukaan tidak steril.
4. **Material pass** — roughness, emissive seam, color variation, edge response.
5. **Lighting pass** — pastikan landmark terbaca tanpa post-processing berat.
6. **Motion pass** — hubungkan transform ke local progress.
7. **Optimization pass** — instancing, geometry reuse, quality tiers.
8. **Support imagery** — generate/crop project images atau chapter thumbnails bila dibutuhkan.
9. **QA pass** — silhouette harus tetap jelas pada mobile dan low quality.

Tidak ada tahap wajib:

- Blender,
- FBX,
- GLB,
- Substance Painter,
- baking pipeline.

Tool tersebut boleh dipakai secara manual oleh manusia di masa depan, tetapi implementasi yang diminta oleh prompt ini **tidak boleh bergantung pada tool eksternal tersebut**.

## 41.1 Asset categories

Bagi asset menjadi empat kategori:

```text
A. Runtime procedural geometry
B. Runtime shader/material
C. Lightweight image/textures
D. UI icons/fonts
```

Target terbesar adalah kategori A + B.

---

# 42. ASSET DIRECTORY & SOURCE ORGANIZATION

Gunakan struktur:

```text
public/
└── assets/
    ├── images/
    │   ├── projects/
    │   └── chapters/
    ├── textures/
    │   ├── noise/
    │   ├── masks/
    │   └── surfaces/
    ├── icons/
    └── fonts/

src/
├── experience/
│   ├── geometry/
│   │   ├── createRockGeometry.ts
│   │   ├── createRibbonCurve.ts
│   │   ├── createTowerLayout.ts
│   │   └── seededNoise.ts
│   ├── materials/
│   └── runtime/
├── chapters/
│   ├── Prelude/PreludeWorld.tsx
│   ├── Origins/OriginsWorld.tsx
│   ├── Craft/CraftWorld.tsx
│   ├── Impact/ImpactWorld.tsx
│   ├── Process/ProcessWorld.tsx
│   └── Future/FutureWorld.tsx
└── shaders/
    ├── portal/
    ├── trail/
    ├── fog/
    ├── waterfall/
    └── particles/
```

Tidak ada `/models` wajib.

Jika suatu saat model eksternal ditambahkan, tempatkan sebagai optional enhancement dan sediakan procedural equivalent.

---

# 43. ASSET RECIPE — PRELUDE PORTAL / PURE THREE.JS

Buat landmark monumental dari geometry runtime.

## Geometry

Gunakan dua slab utama:

```text
left slab  : 2.3 × 11.5 × 1.6
right slab : 2.0 × 12.2 × 1.5
opening    : 2.6–3.4 world units
```

Base primitive:

```ts
new THREE.BoxGeometry(width, height, depth, 8, 24, 6)
```

Setelah geometry dibuat:

1. convert/access position attribute.
2. hanya displacement vertex yang bukan bagian silhouette critical.
3. gunakan seeded 3D noise amplitude `0.02–0.08`.
4. tambahkan low-frequency deformation untuk membuat slab terasa batu, bukan cube.
5. recompute normals sekali saat creation.
6. cache hasil dengan `useMemo`.

Jangan deform geometry per frame.

## Surface detail

Tambahkan 4–8 thin inset/extruded plates dengan box primitives kecil untuk memberi architectural cuts tanpa boolean mesh.

Gunakan material matte:

```text
color      #171d22
roughness  0.82
metalness  0.04
```

Buat slight color variation antar slab, bukan texture 4K.

## Energy seam

Gunakan satu plane vertikal di tengah portal dengan custom shader:

- center ivory-white,
- edge warm gold,
- soft vertical noise,
- opacity naik saat Prelude weight tinggi,
- minor flow upward,
- no excessive bloom.

## Scale cue

Tambahkan human silhouette procedural:

- capsule/cylinder torso,
- sphere head,
- thin limb cylinders,
- all near-black.

Figure tidak perlu karakter realistis; fungsinya memberi scale.

---

# 44. ASSET RECIPE — FLOATING ROCKS / SEEDED PROCEDURAL GEOMETRY

Jangan gunakan asteroid pack generik.

Factory:

```ts
createRockGeometry({ seed, radius, detail, deformation })
```

Base:

```ts
IcosahedronGeometry(radius, detail)
```

Algorithm:

1. normalize each vertex.
2. sample seeded fractal noise menggunakan original position.
3. multiply radius dengan `1 + n * deformation`.
4. apply axis bias supaya beberapa batu lebih slab-like.
5. recompute normals.
6. reuse 3–5 generated base geometries.
7. fragments kecil dirender via `<Instances>` / `InstancedMesh`.

Target deformation:

```text
large rocks  12–18%
medium       15–22%
fragments    18–26%
```

Motion hanya pada group transform:

- drift Y ±0.05–0.18,
- rotation lambat,
- seeded phase berbeda,
- no random teleport/jitter.

---

# 45. ASSET RECIPE — ORIGINS TREE / PROCEDURAL SYMBOLIC TREE

Tree harus simbolik dan sculptural, bukan realistic game vegetation.

Buat `ProceduralTree.tsx`.

## Trunk

Gunakan recursive/iterative branch generator dengan fixed seed.

Setiap branch:

- tapered cylinder,
- 5–8 radial segments,
- 2–4 depth levels,
- branch angle controlled, bukan random chaos.

Target total branch meshes sebelum merge: 20–45.

Setelah create:

- merge static branch geometry jika memungkinkan,
- material dark brown-charcoal,
- roughness tinggi.

## Canopy

Buat 7–12 irregular clusters dari:

- distorted icosahedron,
- scale flatten sedikit,
- desaturated grey-green,
- small tone variation.

Jangan render ribuan daun individual.

## Motion

Tree hampir statis. Hanya:

- canopy sway sangat kecil berbasis sine,
- warm rim intensity mengikuti Origins weight,
- nearby fragments bergerak sedikit saat chapter masuk.

---

# 46. ASSET RECIPE — CRAFT STRUCTURE / PROCEDURAL ARCHITECTURE

Craft harus terlihat seperti **sistem yang dapat dirakit**, bukan random cube sculpture.

Sub-groups:

```text
craft.system
craft.interface
craft.motion
craft.space
```

Implement sebagai React components:

```text
<CraftSystemGrid />
<CraftInterfaceFrames />
<CraftMotionRibbon />
<CraftSpatialNodes />
```

Geometry:

- box beams,
- window frames,
- panel planes,
- line segments,
- TubeGeometry ribbon,
- instanced connector nodes.

Local progress mapping:

```text
0.00–0.25 components separated
0.25–0.55 approach alignment
0.55–0.75 perfect hero composition
0.75–1.00 controlled disassembly toward next chapter
```

Saat center chapter, composition harus memiliki symmetry/visual logic yang sangat jelas.

Gunakan connector lines dari DOM labels hanya ketika Craft dominant.

---

# 47. ASSET RECIPE — IMPACT CLIFF CITY / PROCEDURAL TERRAIN + INSTANCING

Tidak menggunakan sculpted Blender cliffs.

## Cliff generation

Buat 6–10 large rock masses dengan `createRockGeometry()` tetapi:

- radius lebih besar,
- y scale 1.3–2.4,
- x/z flatten berbeda,
- lower half boleh dipotong oleh ground/fog sehingga tidak perlu watertight terrain sempurna.

Tambahkan stepped terraces dari dark boxes untuk menyatukan city dengan cliff.

## City

Gunakan `InstancedMesh` towers:

- 30–80 instances desktop,
- 16–45 mobile,
- seeded width/depth/height,
- cluster density lebih tinggi dekat focal project monuments,
- emissive windows sebagai sparse instanced planes/points, bukan texture kompleks.

## Waterfall

Gunakan 1–3 shader planes, lihat section waterfall.

## Project monuments

Project utama direpresentasikan sebagai 3 hero monolith/plane yang memiliki:

- project image texture,
- slight depth separation,
- label DOM,
- hover raycast only when Impact active.

Tujuan visual: cliff city menjadi bukti “impact”, sedangkan project planes tetap mudah diklik.

---

# 48. ASSET RECIPE — PROCESS ORRERY / R3F KINETIC SYSTEM

Buat seluruhnya procedural.

Components:

- 5 `TorusGeometry` rings,
- 5 spherical/abstract nodes,
- 1 vertical axis,
- connector lines,
- traveling pulse,
- subtle floor shadow/contact ellipse.

React structure:

```text
<ProcessOrrery>
├── <StageRing index={0} label="Discover" />
├── <StageRing index={1} label="Define" />
├── <StageRing index={2} label="Design" />
├── <StageRing index={3} label="Develop" />
└── <StageRing index={4} label="Deliver" />
```

Setiap ring menerima derived local progress dan tidak subscribe ke full app state.

Active ring:

- emissive gold,
- rotation amplitude sedikit lebih besar,
- connector path terisi sampai tahap tersebut.

Total geometry harus ringan; landmark ini memperoleh kualitas dari timing, precision, dan lighting.

---

# 49. ASSET RECIPE — FUTURE GATE + PROCEDURAL CITY

Foreground:

- monumental gate frame dari boxes/beams,
- human silhouette kecil,
- reflective path,
- one beacon.

Background city:

- instanced towers,
- 25–80 desktop,
- 15–40 mobile,
- height distribution biased toward central skyline,
- fog menyederhanakan detail jauh.

Horizon:

- large emissive sun disc/sphere,
- warm ivory center,
- subtle gold halo via second transparent plane/sprite,
- exposure naik perlahan pada final 15% progress.

Sky:

- procedural full-screen/world dome gradient shader,
- deep blue top,
- warm desaturated horizon,
- no HDRI requirement.

Final gate harus terasa sebagai resolusi perjalanan, bukan hanya chapter keenam yang sama beratnya.

---

# 50. IMAGE GENERATION PROMPTS FOR SUPPORTING ASSETS

Jika menggunakan image generation untuk background concept atau chapter thumbnails, buat setiap prompt dengan art direction konsisten.

## Prelude thumbnail prompt

`cinematic monumental dark stone portal in a vast nocturnal mountain landscape, a single tiny human silhouette for scale, vertical warm white-gold light opening, wet reflective black floor, deep navy atmosphere, architectural sci-fi minimalism, quiet luxury, volumetric mist, restrained color palette, no neon cyberpunk, no text, widescreen editorial composition`

## Origins thumbnail prompt

`floating basalt island with one sculptural tree, fragmented rocks suspended around it, distant mountains and cool mist, a thin warm gold light trail crossing the scene, dark blue-grey cinematic sky, surreal but architectural, elegant and minimal, no fantasy saturation, no text`

## Craft thumbnail prompt

`monumental modular architecture assembled from dark metal frames, grid systems, floating panels and one elegant curved ribbon, precise industrial geometry, warm internal lights, cinematic deep navy environment, museum installation aesthetic, high-end editorial 3D render, no text`

## Impact thumbnail prompt

`fragmented futuristic cliff city with dramatic waterfall, dark basalt architecture, suspended project monoliths, mist between cliffs, subtle warm gold edge lights, cold blue atmospheric depth, cinematic large scale, refined architectural sci-fi, no neon, no text`

## Process thumbnail prompt

`minimal scientific orrery installation made of concentric steel rings, small nodes and precise connector lines, one warm gold moving light, dark gallery atmosphere, elegant technical sculpture, cinematic museum lighting, no planets, no text`

## Future thumbnail prompt

`monumental portal framing a luminous distant city at dawn, single human silhouette facing the horizon, dark foreground mountains, warm ivory-gold sun, deep blue sky, restrained futuristic architecture, hopeful cinematic atmosphere, premium editorial render, no text`

Setelah generate:

- crop ke ratio card.
- reduce saturation 10–20%.
- match blacks ke `#071018`.
- remove artifacts.
- export AVIF/WebP.

---

# 51. TEXTURE CREATION — LIGHTWEIGHT SUPPORT ONLY

Gunakan texture hanya saat texture menambah informasi yang tidak efisien dibuat secara geometry/shader.

Recommended:

```text
fog_noise_256.webp
waterfall_noise_512.webp
surface_noise_512.webp
project-01.avif
project-02.avif
project-03.avif
chapter-*.avif
```

Rock tidak wajib memiliki albedo/normal map; gunakan vertex geometry + lighting + procedural material variation terlebih dahulu.

Rules:

- default 512–1024 untuk utility textures.
- hero project artwork 1200–1600px long edge bila perlu.
- prefer AVIF/WebP.
- preload hanya asset first frame.
- set correct color space untuk color textures.
- data/noise textures tetap linear/non-color.
- jangan membuat 4K texture hanya demi label “high quality”.

Bila noise sederhana dapat dibuat via Canvas API saat runtime, lakukan itu agar asset lebih sedikit.

---

# 52. PROCEDURAL GEOMETRY & SHADER CONVENTIONS

Karena tidak bergantung pada external model, kualitas engineering procedural menjadi penting.

## 52.1 Geometry factories

Geometry kompleks yang reusable harus dibuat sebagai pure factory functions:

```ts
createRockGeometry(options): THREE.BufferGeometry
createBeveledSlabGeometry(options): THREE.BufferGeometry
createRibbonGeometry(options): THREE.BufferGeometry
createTowerTransforms(options): InstanceTransform[]
createBranchGeometry(options): THREE.BufferGeometry
```

Factory harus:

- deterministic berdasarkan seed,
- tidak membaca React state,
- tidak membuat side effect scene,
- mengembalikan geometry yang bisa di-cache/dispose.

## 52.2 Seeds

Gunakan fixed named seeds:

```text
PRELUDE_SEED = 1107
ORIGINS_SEED = 2203
CRAFT_SEED   = 3301
IMPACT_SEED  = 4409
PROCESS_SEED = 5501
FUTURE_SEED  = 6607
```

Jangan memakai `Math.random()` langsung saat render karena HMR/re-render dapat mengubah composition.

## 52.3 Shader files

Pisahkan shader kompleks:

```text
shaders/portal/vertex.glsl
shaders/portal/fragment.glsl
shaders/trail/vertex.glsl
shaders/trail/fragment.glsl
shaders/waterfall/vertex.glsl
shaders/waterfall/fragment.glsl
```

Shader uniforms update melalui refs di `useFrame`.

Jangan menyimpan shader time di React state.

---

# 53. LOD & COMPLEXITY TIERS WITHOUT MODEL FILES

Gunakan tiga quality tiers:

```text
HIGH
MEDIUM
LOW
```

Dan tiga spatial detail states:

```text
ACTIVE
NEARBY
DISTANT
```

Karena asset procedural, LOD dilakukan dengan memilih component detail/instance count, bukan mengganti GLB.

Contoh Impact:

```text
HIGH active   : 80 towers, 10 cliffs, 3 waterfall planes
MED nearby    : 45 towers,  7 cliffs, 2 waterfall planes
LOW distant   : 18 towers,  4 cliffs, 1 waterfall plane
```

Prelude portal silhouette tidak boleh berubah antar-tier; hanya detail kecil yang turun.

Gunakan hysteresis untuk perubahan tier runtime agar tidak flicker ketika FPS berada di threshold.

---

# 54. SCENE ACTIVATION IN REACT THREE FIBER

Walaupun semua landmark hidup dalam satu world, biaya update harus dikendalikan.

Setiap chapter memiliki runtime state:

```text
sleeping
nearby
active
leaving
```

Derived dari `sectionWeight` dan jarak camera.

## Sleeping

- tidak melakukan expensive uniform update,
- optional particles paused,
- dynamic lights intensity 0,
- hover/raycast disabled.

## Nearby

- low-frequency subtle motion,
- simplified particle count,
- no expensive hit testing.

## Active

- full choreography,
- interaction enabled,
- connectors enabled,
- full material animation sesuai quality tier.

## Leaving

- motion settle,
- interaction immediately disabled ketika weight di bawah threshold,
- visual fade/lighting masih boleh linger.

Jangan unmount/mount landmark besar setiap beberapa pixel scroll karena dapat memicu shader compile hitch. Lebih baik mount once lalu turunkan update cost.

---

# 55. R3F FRAME LOOP

Gunakan **R3F shared render loop**. Jangan membuat `requestAnimationFrame` manual per effect.

`useFrame()` digunakan oleh sistem yang memerlukan frame-level update:

- CameraRig,
- JourneyTrail,
- AtmosphereParticles,
- active chapter motion,
- shader time uniforms,
- pointer easing.

Prioritas konseptual:

```text
1. read runtime progress/input
2. update camera
3. update chapter transforms
4. update trail/particles/shaders
5. renderer performs frame
```

Frame code harus allocation-light.

Contoh:

```tsx
useFrame((state, dt) => {
  const clampedDt = Math.min(dt, 0.033)
  const p = journeyRuntime.progress
  const local = getLocalProgress(p, RANGE)
  const weight = getSectionWeight(p, RANGE)

  group.current.rotation.y = baseRotation + local * 0.18
  material.current.uniforms.uWeight.value = weight
  material.current.uniforms.uTime.value += clampedDt
})
```

Jangan call Zustand `set()` tiap frame hanya untuk data yang tidak dibutuhkan DOM.

Ketika tab hidden, browser/R3F dapat menurunkan update. Selain itu pause Lenis/GSAP yang tidak perlu melalui visibility handler.

---

# 56. DOM / WEBGL SYNCHRONIZATION — SHARED DERIVED MATH

Satu pengalaman tidak berarti DOM dan R3F harus saling memanggil imperative secara acak.

Buat pure shared math utilities:

```ts
getLocalProgress(progress, chapterRange)
getSectionWeight(progress, chapterRange)
getDominantChapter(progress)
progressToWorld(progress)
progressToScroll(progress)
smoothstep01(value)
```

React UI dan R3F menggunakan fungsi yang sama.

## 56.1 DOM behavior

DOM hanya perlu state diskrit/low-frequency:

- active chapter id,
- chapter entering/leaving class,
- project selected,
- menu state,
- reduced motion.

Untuk continuous transform kecil, boleh gunakan GSAP quickSetter/quickTo atau CSS custom properties yang diperbarui imperative dari controller tanpa re-render seluruh tree.

Contoh:

```text
--journey-progress
--scroll-velocity
--pointer-x
--pointer-y
```

## 56.2 WebGL behavior

R3F mengambil float progress langsung dari runtime ref/store snapshot di `useFrame`.

## 56.3 Never synchronize via timers

Jangan gunakan `setTimeout(600)` untuk menganggap camera sudah sampai chapter. Semua sequencing harus berasal dari:

- progress range,
- GSAP timeline callback,
- explicit transition state.

---

# 57. ACTIVE SECTION WEIGHT

Untuk transisi halus, hitung weight berbentuk bell curve.

Contoh:

```js
const center = (start + end) * 0.5;
const radius = (end - start) * 0.62;
weight = 1 - clamp(Math.abs(P - center) / radius, 0, 1);
weight = weight * weight * (3 - 2 * weight);
```

Gunakan weight untuk:

- light intensity,
- DOM opacity,
- section card active state,
- local animation amplitude.

---

# 58. PERFORMANCE BUDGET

Target desktop modern:

- 55–60 FPS typical.
- no long task > 100ms setelah load.
- total draw calls ideal < 110, hard cap 160.
- visible triangles ideal < 350k, hard cap 650k.
- textures in GPU memory controlled.

Mobile:

- >= 30 FPS target minimum.
- draw calls < 70.
- triangles < 180k.
- pixel ratio <= 1.

Asset size production target:

- initial critical < 2.5MB compressed.
- total optional full experience < 8MB if possible.
- heavy chapter asset lazy-loaded 1 chapter ahead.

---

# 59. ADAPTIVE QUALITY

Detect basic device class.

Quality tiers:

```text
HIGH
MEDIUM
LOW
```

HIGH:

- DPR 1.5.
- shadows limited.
- more particles.
- subtle bloom allowed.

MEDIUM:

- DPR 1.25.
- no post bloom.
- particles 60%.

LOW:

- DPR 1.
- no shadows.
- particles 35%.
- simplified fog.
- background city reduced.

Jangan mengecek GPU dengan invasive fingerprinting.
Gunakan simple heuristic dari viewport, DPR, pointer, dan average frame time.

---

# 60. OPTIONAL FRAME-TIME AUTO DOWNGRADE

Selama 3 detik pertama setelah intro:

- hitung average frame duration.
- jika > 28ms secara konsisten, downgrade quality satu level.
- hanya downgrade, jangan naik-turun terus.

Jangan tampilkan notifikasi ke user.

---

# 61. ACCESSIBILITY

Wajib:

- semantic `header`, `nav`, `main`, `section`, `footer`.
- proper headings hierarchy.
- every button actual `<button>`.
- every link actual `<a>`.
- visible keyboard focus.
- contrast text minimal WCAG AA untuk copy penting.
- WebGL canvas `aria-hidden="true"`.
- meaningful text content tetap tersedia tanpa WebGL.

Jika canvas gagal:

- user tetap dapat membaca seluruh portfolio dan mengakses links.

---

# 62. NO-WEBGL FALLBACK

Jika WebGL unavailable:

- gunakan static chapter backgrounds dari card images.
- vertical/horizontal CSS experience tetap berjalan.
- journey gold line dibuat dengan CSS/SVG.

Jangan hanya menampilkan pesan “WebGL not supported”.

---

# 63. SEO / META FOR VITE REACT SPA

`index.html` tetap berisi metadata first-load yang valid:

- title,
- description,
- canonical URL placeholder,
- theme-color,
- Open Graph,
- Twitter/X card metadata,
- favicon.

React dapat memperbarui `document.title` ketika project overlay dibuka, tetapi tidak perlu dependency head manager hanya untuk enam chapter.

Main semantic content harus tetap ada sebagai DOM React yang dapat dibaca crawler/accessibility tree; jangan menjadikan portfolio hanya canvas.

Sediakan `<noscript>` singkat yang menjelaskan bahwa interactive experience memerlukan JavaScript dan tetap menampilkan contact link jika tersedia.

---

# 64. TYPESCRIPT CONTENT DATA MODEL

Semua konten yang sering berubah harus berasal dari typed data, bukan di-hardcode ke banyak component.

Contoh:

```ts
export type ChapterId =
  | 'prelude'
  | 'origins'
  | 'craft'
  | 'impact'
  | 'process'
  | 'future'

export interface ChapterConfig {
  id: ChapterId
  index: number
  label: string
  title: string
  eyebrow: string
  range: readonly [number, number]
  worldX: number
  story: string
  thumbnail?: string
}

export interface ProjectItem {
  slug: string
  title: string
  role: string
  year?: string
  summary: string
  outcome: string
  image?: string
  href?: string
  tags: readonly string[]
}
```

Data files:

```text
src/data/chapters.ts
src/data/projects.ts
src/data/navigation.ts
src/data/socials.ts
```

Gunakan `as const`/satisfies bila membantu type safety.

Jangan duplikasi title/project metadata di overlay, card, dan scene.

---

# 65. CSS ARCHITECTURE IN REACT

Gunakan dua level CSS:

1. `src/styles/global.css` untuk reset, tokens, body, typography, accessibility utilities.
2. CSS Modules per major UI component/chapter overlay.

Contoh:

```text
TopBar.module.css
ChapterRail.module.css
HeroManifesto.module.css
StoryRail.module.css
ProjectOverlay.module.css
MenuOverlay.module.css
Footer.module.css
```

Jangan memakai CSS-in-JS runtime hanya karena menggunakan React.

## Global tokens

Tokens boleh mencakup:

```css
:root {
  --bg-void: #071018;
  --ink-primary: #f3efe8;
  --ink-secondary: #b8c0c5;
  --gold: #d7b06a;
  --safe-x: clamp(16px, 3vw, 48px);
  --topbar-h: 56px;
}
```

Gunakan class states dari React untuk discrete state. Continuous progress lebih baik via CSS custom property/GSAP daripada membuat ratusan class.

Gunakan `dvh/svh` dengan fallback untuk mobile viewport.

---

# 66. VIGNETTE & FILM GRAIN

Boleh menggunakan very subtle overlay:

- vignette: opacity 0.14–0.22.
- film grain/noise: opacity 0.025–0.045.

Gunakan small repeating noise texture atau CSS generated noise.

Jangan membuat grain mengganggu teks.

Disable grain pada low-tier mobile.

---

# 67. PROJECT DETAIL INTERACTION SPEC

Saat klik project pada Impact:

1. freeze chapter navigation progress.
2. Lenis stop.
3. selected 3D slab brighten.
4. camera shift 0.4–0.8 units toward slab.
5. overlay curtain fade in.
6. detail content enter.
7. focus moved ke close button/title.

On close:

1. reverse overlay.
2. restore camera state.
3. Lenis start.
4. restore focus ke originating project control.

Escape closes.
Browser back closes if opened through hash state.

---

# 68. MICROINTERACTIONS

Gunakan microinteractions terbatas tetapi premium.

### Buttons

- border 1px subtle.
- hover background ivory 5–8% opacity.
- arrow shift 4px.
- gold line draws.

### Links

- underline grows 0 → 100%.
- no bouncing.

### Nav dot

- active halo pulse once when chapter changes.
- no perpetual pulsing.

### Cards

- image scale 1.025.
- title shift 2px.

### Menu dots

- 4 dots morph into 2 diagonal lines / close icon if desired.

---

# 69. MOTION TIMING TOKENS

Gunakan timing berikut secara konsisten:

```text
micro hover      180–240ms
button arrow     220ms
menu open        460ms
project overlay  420ms
text reveal      520–780ms
card image pan   500ms
chapter light    600–900ms
```

Easing:

```text
micro: cubic-bezier(.2,.8,.2,1)
large: power3.out / cubic-bezier(.16,1,.3,1)
scroll-driven: linear mapping + damped interpolation
```

Jangan gunakan elastic/bounce easing.

---

# 70. CAMERA COMFORT RULES

Agar tidak membuat user pusing:

- jangan roll camera > 0.7°.
- yaw changes per second gentle.
- no sudden dolly.
- no FOV zoom pulsing.
- no handheld shake.
- no continuous orbit around user.

Depth impression harus datang dari spatial arrangement, bukan agresive camera tricks.

---

# 71. SOUND

Default: **tidak ada autoplay audio**.

Jika user ingin optional ambient sound di masa depan:

- muted by default.
- explicit sound toggle.
- save preference.
- no autoplay with sound.

Prompt utama ini tidak memerlukan audio.

---

# 72. BROWSER BEHAVIOR

Support target:

- recent Chrome.
- recent Edge.
- recent Safari.
- recent Firefox.
- mobile Safari.
- Android Chrome.

Avoid unstable experimental APIs sebagai requirement utama.

Jika View Transitions API digunakan, harus optional enhancement.

---

# 73. RESIZE HANDLING IN REACT/R3F

R3F menangani renderer resize, tetapi application logic tetap harus mengelola:

- responsive mode,
- story rail geometry,
- camera composition offsets,
- scroll distance,
- ScrollTrigger refresh,
- pointer normalization.

Gunakan `matchMedia` / responsive hook untuk **coarse breakpoint state**, bukan state update tiap resize pixel.

Untuk resize berat:

- debounce recalculation `120–180ms`,
- jangan reset progress,
- preserve nearest chapter,
- refresh ScrollTrigger setelah layout stabil,
- R3F canvas tidak boleh di-remount hanya karena breakpoint berubah.

Jika breakpoint mengubah mobile vertical fallback secara fundamental, capture dominant chapter sebelum transition dan restore posisi ekuivalen setelah layout switch.

---

# 74. ORIENTATION CHANGE

Pada orientation change:

- simpan current dominant chapter dan normalized local progress,
- re-evaluate quality tier dan layout mode,
- resize canvas via R3F normal path,
- recalc scroll length,
- map progress kembali,
- refresh ScrollTrigger,
- tidak membuat Canvas kedua,
- tidak membuat Lenis instance kedua,
- tidak menggandakan event listener.

Untuk mobile landscape yang sangat pendek, prioritaskan readability dan boleh mengurangi story rail/ornament.

---

# 75. MEMORY & RESOURCE MANAGEMENT

Karena mayoritas geometry procedural:

- buat geometry statis dengan `useMemo`,
- reuse shared materials bila transform visual sama,
- gunakan `InstancedMesh` untuk repeated towers/fragments,
- dispose custom `BufferGeometry`, textures, render targets saat benar-benar unmount,
- jangan manual-dispose resource yang masih dishare component lain,
- jangan create Color/Vector/Quaternion baru di hot loop,
- cache temporary vectors,
- shader uniforms object dibuat stabil.

React StrictMode/HMR harus tidak meningkatkan jumlah geometry/material/listener setelah setiap reload.

Project image texture boleh lazy load saat Impact mendekati active range; cache setelah dimuat.

---

# 76. DEBUG MODE

Sediakan optional debug melalui query:

`?debug=1`

Debug may show:

- FPS.
- master progress.
- active chapter.
- camera position.
- draw calls / triangles.
- chapter ranges.

Debug UI tidak boleh aktif pada normal production.

---

# 77. DEVELOPMENT BUILD ORDER — REACT-FIRST

Implementasikan berlapis. Jangan mulai dari shader kompleks.

## Phase 1 — Vite + React + TypeScript skeleton

- create Vite React TS app.
- configure strict TypeScript.
- global CSS/tokens.
- typed chapter data.
- Zustand experience store.
- semantic DOM shell.
- topbar, chapter rail, footer.

Acceptance: app clean, keyboard navigation dasar bekerja, no WebGL yet.

## Phase 2 — Scroll runtime

- Lenis hook.
- canonical master progress.
- chapter range helpers.
- active chapter derivation.
- `goToChapter()`.
- hash history.

Acceptance: DOM prototype berpindah chapter akurat tanpa R3F.

## Phase 3 — One R3F world

- one Canvas.
- CameraRig.
- fog.
- ground.
- six placeholder landmarks.
- journey trail.

Acceptance: camera melakukan perjalanan kontinu dari 0→1 tanpa jitter.

## Phase 4 — Procedural landmark replacement

Urutan:

1. Prelude portal.
2. Future gate, untuk mengunci beginning/end composition.
3. Origins island/tree.
4. Craft structure.
5. Process orrery.
6. Impact cliff city.

Acceptance: silhouette masing-masing chapter unik bahkan tanpa text.

## Phase 5 — DOM ↔ WebGL choreography

- local progress.
- chapter weights.
- light blending.
- text reveals.
- story cards.
- connectors.

## Phase 6 — Interaction

- raycast hanya chapter aktif.
- project overlay.
- menu.
- cursor.
- keyboard.
- touch behavior.
- history/back behavior.

## Phase 7 — Shader polish

- portal seam.
- trail.
- waterfall.
- atmosphere.
- film grain CSS.

Jangan menambah shader jika composition belum kuat.

## Phase 8 — Performance

- instancing.
- quality tiers.
- adaptive DPR.
- lazy image load.
- frame-time sampling.
- React Profiler inspection.

## Phase 9 — Accessibility & production QA

- reduced motion.
- no-WebGL fallback.
- focus management.
- semantic headings.
- mobile test.
- production build.
- console clean.

---

# 78. DESIGN REVIEW CHECKPOINTS

Sebelum menganggap final, lakukan review pada screenshot di progress:

```text
0.00 Prelude
0.10 Prelude leaving
0.20 Origins
0.38 Craft
0.56 Impact
0.72 Process
0.90 Future
1.00 End state
```

Untuk tiap screenshot cek:

- focal point jelas?
- text readable?
- gold accent terlalu banyak?
- depth kuat?
- chapter terlihat berbeda tetapi tetap satu dunia?
- silhouette/scale terbaca?
- UI tidak menabrak geometry?

---

# 79. MOBILE DESIGN REVIEW

Test minimal:

- 390×844
- 412×915
- 430×932
- 768×1024

Pastikan:

- safe-area iOS.
- no horizontal body overflow.
- canvas tidak blur karena overscaled DPR.
- CTA min 44×44.
- body copy tidak < 14px.
- modal scroll works.

---

# 80. DESKTOP TEST MATRIX

Test:

- 1366×768
- 1440×900
- 1536×1024
- 1920×1080
- 2560×1440

Pada 1366×768, story rail tidak boleh memakan terlalu banyak stage.
Pada 2560×1440, content jangan terlalu melebar tanpa batas; gunakan viewport-relative composition.

---

# 81. FAILURE STATES

Handle:

### Asset load failure

- show fallback geometry.
- continue experience.

### WebGL context lost

- show CSS fallback.
- attempt recovery once.

### Slow connection

- load hero first.
- lazy load next chapter.
- static card images can appear before detailed 3D.

### JS disabled

- simple semantic content visible.

---

# 82. COPY STYLE

Tone:

- concise,
- confident,
- poetic but concrete,
- no motivational cliché,
- no corporate buzzword soup.

Avoid:

`passionate`, `innovative thinker`, `results-driven`, `rockstar`, `ninja`.

Preferred:

- specific actions,
- specific outcomes,
- short declarative lines.

---

# 83. CONTENT PLACEHOLDERS

Gunakan placeholders yang mudah diganti:

```js
const profile = {
  name: 'YOUR NAME',
  role: 'Creative Developer / Designer',
  email: 'hello@example.com',
  linkedin: '#',
  resume: '#'
}
```

Jangan invent metric palsu untuk project.
Gunakan placeholder seperti `+XX%` jika data belum diberikan.

---

# 84. ANTI-GENERIC RULES

Dilarang:

- floating glass cards.
- purple/pink neon gradient.
- spinning globe.
- generic Earth hologram.
- orbiting random cubes.
- infinite particle tunnel.
- fake terminal code screen.
- AI brain iconography.
- carousel testimonials.
- skill percentage bars.
- circular progress skill charts.
- excessive rounded cards.
- giant gradient blobs.
- random lens flare everywhere.
- generic “hire me” button in hero.

Setiap chapter harus memiliki landmark yang unik dan naratif.

---

# 85. VISUAL HIERARCHY RULE

Pada setiap frame hanya boleh ada:

1. satu primary focal point,
2. satu secondary text focus,
3. maksimal dua tertiary accents.

Jika mata tidak tahu harus melihat ke mana, kurangi detail.

---

# 86. GOLD USAGE RULE

Gold adalah “active energy”, bukan theme color biasa.

Area gold total ideal < 8% dari frame.

Gunakan hanya pada:

- trail,
- active dot,
- selected chapter edge,
- portal seam,
- beacon.

Jangan membuat semua typography gold.

---

# 87. DEPTH RULE

Setiap cinematic frame harus memiliki minimal tiga depth planes:

- foreground,
- subject / chapter landmark,
- background / horizon.

Tambahkan atmosfer di antara planes.

Jangan letakkan semua object pada z=0.

---

# 88. STORY CARD ASSET CREATION

Setiap chapter card harus berasal dari render chapter, bukan stock image unrelated.

Pipeline:

1. Set camera secondary untuk chapter.
2. Render still 1600×1000.
3. Crop focal point sesuai card ratio.
4. Add subtle grade.
5. Export AVIF quality 55–65 atau WebP 70–78.
6. Use as card background fallback.

Dengan demikian story rail dan world terasa konsisten.

---

# 89. COLOR GRADING

Global grade:

- blacks slightly blue.
- highlights warm only near gold sources.
- saturation moderate-low.
- no crushed blacks that destroy material detail.
- maintain body text contrast.

Jika menggunakan images sebagai backplate, grade semua dengan LUT/look yang sama secara manual atau CSS filter ringan.

---

# 90. POST-PROCESSING POLICY

No heavy post-processing.

Allowed high-tier only:

- subtle bloom strength <= 0.25.
- light vignette.

Not required:

- SSAO.
- SSR.
- depth of field.
- motion blur.
- chromatic aberration.
- filmic distortion.

Visual quality harus datang dari lighting, composition, material, dan motion.

---

# 91. CODE QUALITY — REACT / TYPESCRIPT

Kode harus terasa seperti production code, bukan one-file demo yang dipindahkan ke JSX.

## 91.1 Component rules

- satu component memiliki satu responsibility utama.
- chapter WebGL component tidak lebih dari orchestration + subcomponents.
- utility math pure dan unit-testable secara konsep.
- props typed eksplisit.
- hindari `any`.
- hindari prop drilling untuk global experience state; gunakan store secara selektif.
- jangan memasukkan seluruh store ke satu selector object tanpa shallow equality.

## 91.2 Runtime rules

- no `setState` inside `useFrame` untuk transform per-frame.
- no geometry creation inside render body tanpa memoization.
- no `Math.random()` untuk composition runtime.
- no repeated GSAP timelines on every render.
- no direct DOM query jika ref React sudah cukup.
- global event listeners harus cleanup.
- GSAP code menggunakan `gsap.context` pada component scope.

## 91.3 Suggested source layout

```text
src/
├── main.tsx
├── App.tsx
├── app/
│   ├── ExperienceShell.tsx
│   └── ErrorBoundary.tsx
├── components/
│   ├── TopBar/
│   ├── ChapterRail/
│   ├── StoryRail/
│   ├── ProjectOverlay/
│   ├── MenuOverlay/
│   ├── Loader/
│   └── Cursor/
├── chapters/
│   ├── Prelude/
│   ├── Origins/
│   ├── Craft/
│   ├── Impact/
│   ├── Process/
│   └── Future/
├── experience/
│   ├── WebGLStage.tsx
│   ├── World.tsx
│   ├── CameraRig.tsx
│   ├── WorldLighting.tsx
│   ├── JourneyTrail.tsx
│   ├── Atmosphere.tsx
│   ├── geometry/
│   ├── materials/
│   └── runtime/
├── hooks/
│   ├── useJourneyScroll.ts
│   ├── useJourneyHistory.ts
│   ├── usePointerRuntime.ts
│   ├── useReducedMotion.ts
│   └── useResponsiveMode.ts
├── store/
│   └── experienceStore.ts
├── data/
├── shaders/
├── styles/
├── lib/
└── types/
```

## 91.4 TypeScript strictness

Enable/target:

```text
strict
noUncheckedIndexedAccess where practical
noFallthroughCasesInSwitch
forceConsistentCasingInFileNames
```

Handle nullable refs dengan guard yang jelas, bukan non-null assertion di semua tempat.

---

# 92. PRODUCTION PSEUDOCODE — REACT VERSION

```tsx
// main.tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

```tsx
// App.tsx
export function App() {
  useJourneyScroll()
  useJourneyHistory()
  usePointerRuntime()

  return (
    <ExperienceErrorBoundary>
      <div className="app-shell">
        <Loader />
        <WebGLStage />
        <AtmosphereOverlay />
        <TopBar />
        <ChapterRail />
        <HeroManifesto />
        <ChapterStoryRail />
        <CurrentChapterIndicator />
        <Footer />
        <MenuOverlay />
        <ProjectOverlay />
      </div>
    </ExperienceErrorBoundary>
  )
}
```

```tsx
// WebGLStage.tsx
export function WebGLStage() {
  const webglEnabled = useExperienceStore(s => s.webglEnabled)

  if (!webglEnabled) return <StaticWorldFallback />

  return (
    <Canvas /* renderer + camera config */>
      <Suspense fallback={null}>
        <World />
        <CameraRig />
        <PerformanceController />
      </Suspense>
    </Canvas>
  )
}
```

```tsx
// World.tsx
export function World() {
  return (
    <>
      <WorldFog />
      <WorldLighting />
      <GroundSystem />
      <JourneyTrail />
      <PreludeWorld position={[0, 0, 0]} />
      <OriginsWorld position={[22, 0, 0]} />
      <CraftWorld position={[44, 0, 0]} />
      <ImpactWorld position={[68, 0, 0]} />
      <ProcessWorld position={[92, 0, 0]} />
      <FutureWorld position={[118, 0, 0]} />
      <AtmosphericParticles />
    </>
  )
}
```

```tsx
// Example chapter frame logic
useFrame((_, dt) => {
  const p = journeyRuntime.progress
  const local = getLocalProgress(p, chapter.range)
  const weight = getSectionWeight(p, chapter.range)

  updateLandmark(refs, local, weight, dt)
})
```

Flow initialization:

```text
React mount
→ capability detection
→ store bootstrap
→ scroll runtime
→ R3F context
→ critical procedural scene creation
→ first frame ready
→ loader exit
→ intro timeline
→ background image assets lazy load
```

Tidak ada `boot()` imperative monolitik yang membangun seluruh app di luar React.

---

# 93. CAMERA + DOM RELATIONSHIP

Jangan membiarkan DOM text mengikuti object 3D secara pixel-perfect kecuali label kecil.

Primary text tetap anchored ke grid screen.

3D world bergerak bebas di belakang/sekitar grid tersebut.

Kesan premium datang dari tension antara stable editorial UI dan moving spatial world.

---

# 94. LABEL CONNECTORS

Untuk Craft dan Process, line connectors boleh dibuat dengan SVG DOM overlay.

Cara:

- project selected 3D point ke screen coordinates.
- update only when chapter active.
- SVG path dari label ke projected point.
- fade line jika point keluar safe region.

Batasi 4–5 connectors.

Jangan create full data-viz network.

---

# 95. SCROLL INDICATOR

Prelude memiliki vertical mouse/scroll hint kecil di kiri bawah.

Visual:

- rounded pill outline 18×34px.
- tiny dot inside moves downward 6px then resets.
- cycle 1.8s.
- stop animation after user scroll > 4%.

Text:

`SCROLL TO TRAVEL THROUGH MY STORY`

Reduced motion: no moving dot.

---

# 96. CURRENT CHAPTER INDICATOR

Di mobile/tablet compact header:

`03 / 06  CRAFT`

Animate number crossfade saat chapter change.

Do not rapidly update while between chapters; switch when weight new chapter > previous.

---

# 97. FINAL END STATE

Ketika progress = 1:

- camera settle.
- no endless motion except ultra-subtle fog.
- Future CTA fully visible.
- story trail completed.
- left/nav active on 06.
- footer links remain accessible.

User harus merasa perjalanan “selesai”, bukan menggantung.

---

# 98. ACCEPTANCE CRITERIA — VISUAL

Website dianggap lolos hanya jika:

- first frame terlihat premium tanpa user scroll.
- Prelude portal memiliki sense of scale yang kuat.
- Origins clearly berbeda dari Craft.
- Craft terbaca sebagai struktur skill, bukan random cubes.
- Impact terasa hasil/konsekuensi, bukan gallery cards biasa.
- Process terbaca sebagai system diagram.
- Future terasa sebagai resolusi/horizon.
- gold trail terlihat kontinu antar chapter.
- typography tetap editorial dan readable.
- tidak ada neon cyberpunk generic.

---

# 99. ACCEPTANCE CRITERIA — INTERACTION

Lolos jika:

- scroll halus dan tidak snap kasar.
- direct chapter navigation tepat.
- browser back bekerja pada overlay/hash.
- keyboard usable.
- touch tidak conflict.
- menu focus trap benar.
- project modal close/restore focus benar.
- reduced motion works.
- no-WebGL fallback works.

---

# 100. ACCEPTANCE CRITERIA — PERFORMANCE & REACT HEALTH

Lolos jika:

- production build selesai tanpa TypeScript error.
- tidak ada React warning tentang keys, invalid DOM props, atau state update after unmount.
- StrictMode development tidak menghasilkan duplicate Lenis/GSAP/listener.
- scroll tidak menyebabkan full React tree re-render setiap frame.
- one Canvas only.
- tidak ada noticeable shader compilation hitch saat chapter menjadi aktif setelah initial warmup.
- mobile DPR efektif <= 1 pada low tier dan <= ~1.25 pada medium bila performa cukup.
- desktop DPR capped sekitar 1.5.
- repeated geometry memakai instancing/reuse.
- inactive chapters tidak melakukan expensive per-frame work.
- project images lazy-load dengan placeholder stabil.
- no console errors.
- no repeated WebGL warnings.
- resize/orientation tidak leak canvas atau listener.
- membuka/menutup project overlay berkali-kali tidak membuat memory terus naik.
- final bundle tidak membengkak karena dependency UI besar yang tidak perlu.
- Lighthouse/accessibility audit tidak gagal karena canvas-only content.

---

# 101. QA CHECKLIST — REACT / R3F PRODUCTION

Sebelum selesai, verifikasi:

## Architecture

- [ ] Vite production build berhasil.
- [ ] TypeScript strict build bersih.
- [ ] Hanya ada satu R3F Canvas.
- [ ] React StrictMode tidak menggandakan Lenis.
- [ ] React StrictMode tidak menggandakan ScrollTrigger.
- [ ] React StrictMode tidak menggandakan pointer/resize listeners.
- [ ] Master progress tidak memicu full UI re-render 60fps.
- [ ] `useFrame` tidak melakukan React setState rutin.
- [ ] Geometry procedural di-memoize.
- [ ] Random composition seeded/deterministic.

## First frame / loader

- [ ] Prelude readable pada first paint setelah loader.
- [ ] Loader tidak stuck ketika WebGL fail.
- [ ] Loader tidak memiliki artificial delay panjang.
- [ ] Font swap tidak merusak layout hero.

## Navigation

- [ ] Chapter rail active state sinkron.
- [ ] Click chapter bergerak ke center range benar.
- [ ] URL hash update benar.
- [ ] Back/Forward browser benar.
- [ ] Direct hash load benar.
- [ ] Project nested hash membuka overlay benar.

## WebGL world

- [ ] Camera path tidak jitter.
- [ ] Camera path terasa satu dunia, bukan enam slide.
- [ ] Prelude portal punya sense of scale.
- [ ] Origins silhouette jelas berbeda.
- [ ] Craft bukan random cubes.
- [ ] Impact waterfall/cliff tidak menghabiskan fill-rate.
- [ ] Process terbaca sebagai system.
- [ ] Future memberi resolution/horizon.
- [ ] Gold trail kontinu antar-landmark.
- [ ] Pointer parallax subtle.
- [ ] Fog tidak menutup focal object.

## Interaction

- [ ] Impact raycast hanya aktif saat perlu.
- [ ] Project overlay focus trap benar.
- [ ] ESC menutup overlay/menu.
- [ ] Restore focus benar.
- [ ] Menu keyboard usable.
- [ ] Touch scroll natural.
- [ ] Story rail horizontal swipe tidak mengunci page scroll.
- [ ] Tap target minimal 44px.

## Accessibility

- [ ] Canvas `aria-hidden="true"`.
- [ ] Heading hierarchy semantic.
- [ ] Project images memiliki alt yang meaningful.
- [ ] Focus state visible.
- [ ] Reduced motion mengurangi camera/parallax/nonessential motion.
- [ ] No-WebGL fallback tetap memiliki semua content utama.
- [ ] Contrast text memenuhi kebutuhan keterbacaan.

## Responsive

- [ ] 1920×1080 coherent.
- [ ] 1440×900 coherent.
- [ ] 1366×768 coherent.
- [ ] 1024×768 coherent.
- [ ] tablet portrait coherent.
- [ ] 390×844 coherent.
- [ ] 360×800 coherent.
- [ ] safe-area iPhone handled.
- [ ] `dvh/svh` issue handled.
- [ ] orientation switch tidak reset ke Prelude.

## Performance

- [ ] DPR cap applied.
- [ ] Instanced towers/fragments digunakan.
- [ ] Hidden tab tidak menjalankan unnecessary work.
- [ ] No allocation storm di `useFrame`.
- [ ] Quality downgrade works.
- [ ] No memory growth signifikan setelah navigasi panjang.
- [ ] Production console clean.

## Anti-generic

- [ ] Tidak ada generic skill bars.
- [ ] Tidak ada generic testimonial carousel.
- [ ] Tidak ada glass card dashboard aesthetic.
- [ ] Tidak ada neon cyberpunk rainbow.
- [ ] Tidak ada random rotating logo.
- [ ] Tidak ada premade spaceship/planet motif.
- [ ] Tidak ada chapter yang hanya berupa card grid biasa.
- [ ] Tidak ada sound autoplay.

---

# 102. OUTPUT CONTRACT FOR THE CODING AGENT — REACT PROJECT

Ketika mengerjakan prompt ini, keluarkan **project React yang lengkap**, bukan hanya explanation atau potongan JSX.

Wajib menghasilkan:

1. `package.json` dengan dependency yang digunakan.
2. `vite.config.ts` bila diperlukan.
3. `tsconfig.json` yang valid.
4. `index.html` sebagai Vite shell.
5. `src/main.tsx`.
6. `src/App.tsx`.
7. semua components UI.
8. semua six chapter world components.
9. shared R3F `Canvas`, `World`, `CameraRig`, lighting, trail, atmosphere.
10. scroll runtime Lenis/GSAP.
11. Zustand experience store.
12. typed chapter/project data.
13. shader files atau inline shader modules yang rapi.
14. global + component CSS.
15. static/no-WebGL fallback.
16. reduced-motion behavior.
17. keyboard/focus behavior.
18. hash deep-linking.
19. project overlay.
20. responsive implementation.

Tidak boleh:

- berhenti di hero,
- meninggalkan `TODO` untuk fitur inti,
- mengubah scope menjadi gallery biasa,
- mengganti 3D world dengan background image saja,
- membuat enam canvas,
- memaksa Blender/GLB agar scene dapat tampil,
- menyimpan semua kode dalam `App.tsx`,
- menggunakan `any` secara luas,
- mengandalkan mock animation yang tidak terkait master progress.

## 102.1 README requirement

Sertakan `README.md` dengan:

```text
Requirements
Install
Development
Production build
Project structure
How to edit personal content
How to replace project images
How master progress works
How procedural assets are built
Performance/quality tiers
Accessibility behavior
```

## 102.2 Final run contract

Setelah generate project, coding agent harus:

1. install dependencies,
2. run typecheck/build,
3. fix compilation errors,
4. run app,
5. verify first frame,
6. verify scroll through all chapters,
7. verify menu/project overlay,
8. verify mobile viewport,
9. verify reduced-motion path,
10. report exact commands and any remaining non-blocking limitations.

Project belum dianggap selesai hanya karena source code telah ditulis.

---

# 102A. REQUIRED VALIDATION COMMANDS

Before declaring completion, run commands equivalent to:

```bash
npm install
npm run build
```

Recommended scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

If linting is configured, also run lint.

Do not state that the project is production-ready if build has not succeeded.

---

# 103. FINAL CREATIVE DIRECTIVE

Ini bukan proyek untuk menunjukkan sebanyak mungkin efek.
Ini proyek untuk menunjukkan **kontrol**.

Setiap gerakan harus terasa disengaja.
Setiap cahaya harus memiliki fungsi.
Setiap landmark harus mewakili satu gagasan.
Setiap chapter harus terasa seperti ruang pameran.
Seluruh perjalanan harus terasa seperti satu mahakarya yang belum selesai—karena karier terus bergerak.

Jika harus memilih antara:

- lebih banyak efek, atau komposisi yang lebih kuat → pilih komposisi;
- shader kompleks, atau lighting yang lebih baik → pilih lighting;
- banyak object, atau satu landmark ikonik → pilih landmark ikonik;
- gimmick, atau narasi → pilih narasi;
- teknologi, atau pengalaman → pilih pengalaman.

Target akhirnya adalah sebuah portfolio yang ketika pertama dibuka membuat orang berpikir:

**“Ini bukan template. Ini adalah dunia yang dibangun khusus untuk satu perjalanan.”**

---

# 104. ONE-SENTENCE NORTH STAR

> **Build MAHAKARYA as a cinematic horizontal museum where the user scrolls through six monumental chapters of a career, connected by a single golden path of light, with precise editorial typography, restrained WebGL motion, bespoke architectural landmarks, and production-grade interaction quality.**

