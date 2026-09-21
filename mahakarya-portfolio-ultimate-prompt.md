# MAHAKARYA — ULTIMATE PRODUCTION PROMPT
## Career Journey Portfolio / Cinematic Horizontal WebGL Museum

> **Tujuan dokumen ini:** menjadi prompt produksi yang dapat langsung diberikan ke AI coding agent / creative developer untuk membangun website portfolio yang terasa seperti karya digital kelas festival, bukan template portfolio biasa. Dokumen ini sengaja sangat spesifik mengenai desain, komposisi, interaksi, motion, WebGL, asset, performa, responsivitas, accessibility, dan acceptance criteria.

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
- Three.js / WebGL Artist,
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

# 3. FINAL DELIVERABLE

Buat hasil utama sebagai:

- `index.html`
- HTML, CSS, dan JavaScript dalam satu file utama.
- `<script type="module">`.
- Tanpa React, Vue, Svelte, JSX, TypeScript, bundler, atau build step.
- External library hanya jika diperlukan:
  - `three.js`
  - `GSAP`
  - `ScrollTrigger`
  - `Lenis` untuk smooth scroll
- Tidak menggunakan UI framework.
- Tidak menggunakan component library.
- Tidak menggunakan Bootstrap/Tailwind untuk layout final.

### Asset rule

Versi final harus tetap dapat dibuka langsung dari browser dan memiliki fallback visual walaupun asset eksternal gagal dimuat.

Jika asset binary seperti `.glb`, `.ktx2`, `.webp`, atau `.avif` digunakan pada versi production, sediakan:

- fallback procedural dari Three.js,
- placeholder gradient / mesh sederhana,
- dan dokumentasi jelas di komentar kode mengenai path asset.

Jika target benar-benar **single-file self-contained**, embed asset kecil sebagai data URL dan buat seluruh landmark utama dengan procedural Three.js.

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

# 9. GLOBAL UI SHELL

UI harus berada di lapisan DOM/CSS di atas WebGL untuk menjaga ketajaman teks dan accessibility.

Struktur visual utama:

```text
BODY
└── #app
    ├── #webgl-stage
    │   └── canvas.webgl
    ├── .atmosphere-overlays
    ├── header.topbar
    ├── nav.chapter-rail-left
    ├── main.story-overlay
    ├── section.chapter-card-rail
    ├── footer.site-footer
    ├── aside.menu-overlay
    └── .cursor / .focus / .loader
```

WebGL tidak boleh menggambar typography utama.

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

# 13. MASTER SCROLL ENGINE

Gunakan vertical scroll sebagai canonical input.

## 13.1 Scroll shell

Desktop/tablet:

- viewport dipin.
- body memiliki artificial scroll length.
- target total scroll distance: `6.2 * viewportHeight`.

Master progress:

```js
P = clamp(scrollY / maxScroll, 0, 1)
```

Semua sistem membaca `P` yang sama.

Jangan membuat listener scroll terpisah yang saling bertentangan.

## 13.2 Smooth scroll

Gunakan Lenis dengan nilai awal:

```js
new Lenis({
  duration: 1.08,
  smoothWheel: true,
  wheelMultiplier: 0.92,
  touchMultiplier: 1.0,
  syncTouch: false
})
```

Jika `prefers-reduced-motion: reduce`, jangan gunakan Lenis.

## 13.3 Section ranges

Gunakan global progress ranges berikut:

```text
Prelude : 0.000 – 0.155
Origins : 0.135 – 0.320
Craft   : 0.285 – 0.490
Impact  : 0.450 – 0.665
Process : 0.625 – 0.835
Future  : 0.790 – 1.000
```

Ranges overlap sengaja agar transisi terasa kontinu.

Local progress:

```js
local = clamp((P - start) / (end - start), 0, 1)
```

## 13.4 Camera movement

Jangan hanya menggeser seluruh DOM ke kiri.

Gabungkan:

- camera translation sepanjang X,
- sedikit camera dolly pada Z,
- subtle vertical rail pada Y,
- camera target interpolation,
- DOM overlay parallax.

Target motion harus memberi rasa “melintasi pameran”, bukan “slide deck”.

---

# 14. WEBGL WORLD ARCHITECTURE

Gunakan **satu shared Three.js scene** untuk seluruh dunia agar transisi benar-benar menyatu.

Recommended setup:

```js
const renderer = new THREE.WebGLRenderer({
  antialias: !isMobile,
  alpha: true,
  powerPreference: 'high-performance'
});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.95;
renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1 : 1.5));
```

Camera:

```text
PerspectiveCamera
FOV: 38deg
near: 0.1
far: 260
```

Scene fog:

```text
FogExp2 color #071018
Density: 0.010–0.018 depending on device
```

## 14.1 World coordinate plan

Tempatkan landmarks sepanjang X axis:

```text
Prelude landmark : x = 0
Origins landmark : x = 22
Craft landmark   : x = 44
Impact landmark  : x = 68
Process landmark : x = 92
Future landmark  : x = 118
```

Kamera kira-kira bergerak dari `x=-8` ke `x=112`.

Masing-masing landmark memiliki ruang 16–24 world units.

Jangan menumpuk semua chapter terlalu berdekatan.

## 14.2 Camera spline

Buat `CatmullRomCurve3` dengan control points kira-kira:

```text
(-8, 3.4, 12)
( 4, 3.1, 10)
(22, 4.2, 11)
(43, 3.6, 10)
(67, 4.5, 12)
(92, 3.2, 11)
(116,4.8, 13)
```

Target curve terpisah:

```text
( 0, 2.4, 0)
(22, 2.8, 0)
(44, 2.4, 0)
(68, 2.6, 0)
(92, 2.2, 0)
(120,3.0, 0)
```

Mouse/pointer hanya menambahkan additive offset kecil, bukan mengubah jalur utama.

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

# 39. LOADING EXPERIENCE

Loader harus singkat dan elegan.

Visual:

```text
MAHAKARYA
LOADING THE JOURNEY  68%
──────────────
```

Background `#071018`.

Progress berdasarkan asset load nyata jika ada.

Jika load < 400ms, jangan tahan user secara artificial lebih dari 550ms.

Jika asset gagal:

- continue with fallback.
- jangan stuck di 99%.

Transition loader → site:

- wordmark remains,
- world fades in di belakang,
- loader line transforms menjadi horizon line opsional.

---

# 40. DEEP LINKING

Gunakan URL hash:

```text
#prelude
#origins
#craft
#impact
#process
#future
```

Saat user click chapter nav:

- scroll progress ke segment center chapter.
- update hash via history API tanpa reload.

Saat load dengan hash:

- page langsung mengarah ke chapter sesuai hash setelah initialization.

Project overlay dapat menggunakan:

```text
#impact/project-slug
```

Jika implementasi hash nested terlalu kompleks, gunakan query state tetapi browser back tetap harus bekerja.

---

# 41. ASSET CREATION PIPELINE — OVERVIEW

Assets dapat dibuat dengan kombinasi:

1. Procedural Three.js geometry.
2. Blender untuk sculpt/low-poly hard surface.
3. Image generation untuk concept/backplate/texture source.
4. Photoshop/Affinity/Krita untuk cleanup.
5. Substance Painter / Blender baking untuk material map.
6. glTF/GLB optimization.

Target utama: dunia terlihat high-end tanpa asset package yang terlalu berat.

---

# 42. ASSET DIRECTORY PLAN

Jika menggunakan external production assets:

```text
/assets
  /models
    prelude-portal.glb
    origins-island.glb
    origins-tree.glb
    craft-structure.glb
    impact-cliffs.glb
    process-orrery.glb
    future-gate.glb
  /textures
    rock_albedo_1k.webp
    rock_normal_1k.webp
    rock_roughness_1k.webp
    brushed_metal_1k.webp
    fog_noise_512.webp
    waterfall_mask_1k.webp
  /images
    project-01.avif
    project-02.avif
    project-03.avif
    chapter-prelude.avif
    chapter-origins.avif
    chapter-craft.avif
    chapter-impact.avif
    chapter-process.avif
    chapter-future.avif
  /icons
    linkedin.svg
    mail.svg
    download.svg
```

Tetapi seluruh path harus memiliki fallback procedural.

---

# 43. ASSET RECIPE — PRELUDE PORTAL

### Blender method

1. Start dari cube.
2. Scale menjadi slab tinggi, depth tipis.
3. Bevel edges sangat kecil `0.02–0.05m`.
4. Gunakan 2–3 boolean cuts untuk chipped architectural edges.
5. Jangan membuat retakan terlalu banyak.
6. Duplicate mirror untuk slab kedua, tetapi beri asymmetry 5–8%.
7. UV unwrap sederhana.
8. Bake normal/roughness dari high poly jika ada.
9. Export GLB dengan mesh compression.

### Material

- dark basalt.
- roughness 0.82.
- metalness 0.05.
- normal strength 0.35.

### Procedural fallback

Gunakan `BoxGeometry` + custom vertex displacement kecil dengan seeded noise pada side surfaces.

### Energy seam

Tidak perlu model.
Gunakan plane di tengah portal dengan additive shader.

---

# 44. ASSET RECIPE — FLOATING ROCKS

Jangan download asteroid pack generik.

Procedural approach:

1. Mulai dari `IcosahedronGeometry(radius, 2)`.
2. Iterate vertex position.
3. Apply seeded fractal noise pada radius ±12–22%.
4. Scale non-uniform.
5. Recompute normals.
6. Random rotate dari seed yang fixed.
7. Use `InstancedMesh` untuk fragments kecil.

Variasi:

- 3 base geometries saja cukup.
- scale `0.18–1.2`.
- y offset ±3.

Jangan update geometry per frame.

---

# 45. ASSET RECIPE — ORIGINS TREE

Pilihan A — Blender low-poly sculpt:

- trunk silhouette sculptural,
- canopy tidak terlalu leafy realistic,
- total 15k–35k triangles.

Pilihan B — procedural stylized:

- trunk menggunakan merged tapered cylinders.
- canopy menggunakan 6–12 irregular clusters.

Material:

- trunk nearly black brown.
- leaves desaturated grey-green.
- one subtle warm rim light.

Tree harus terlihat seperti simbol ide, bukan aset game stock.

---

# 46. ASSET RECIPE — CRAFT STRUCTURE

Buat entirely procedural jika memungkinkan.

Gunakan:

- `BoxGeometry`
- `PlaneGeometry`
- thin beams
- grid line shader / LineSegments
- one curved ribbon via `TubeGeometry`

Gunakan group names:

```text
craft.system
craft.interface
craft.motion
craft.space
```

Sehingga masing-masing dapat dianimasikan independen.

---

# 47. ASSET RECIPE — IMPACT CLIFF CITY

Blender:

- base cliffs dibuat dari 3–5 sculpted rock masses.
- city modules dari box architecture modular.
- waterfall plane terpisah.

Target triangle count:

- cliffs: 120k–180k desktop LOD0.
- LOD1: 60k.
- LOD2: 20k.
- architecture: 30k–80k total.

Jika single-file procedural:

- gunakan 8–12 noise-displaced rock meshes.
- city memakai instanced boxes.
- waterfall shader plane.

---

# 48. ASSET RECIPE — PROCESS ORRERY

Buat procedural Three.js.

Tidak perlu Blender.

Components:

- 5 TorusGeometry rings.
- 5 spheres / small nodes.
- 1 vertical thin cylinder.
- 5 connector lines.
- 1 point/light pulse mesh.

Total triangles dapat < 40k.

Material:

- steel dark grey.
- line semi-transparent ivory.
- active stage emissive gold.

---

# 49. ASSET RECIPE — FUTURE CITY

Gunakan kombinasi procedural instancing + optional backplate.

Foreground:

- portal frame actual 3D.
- lone figure silhouette actual low-poly mesh or billboard.

Background city:

- InstancedMesh towers.
- 25–80 towers.
- seeded widths/heights.
- depth fog menyamarkan detail.

Sun:

- emissive plane/sphere behind city.
- bloom optional very subtle.

Gunakan warm gradient sky dari dark blue ke warm ivory near horizon.

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

# 51. TEXTURE CREATION

Gunakan sedikit texture unik, jangan banyak.

Recommended set:

```text
rock_albedo
rock_normal
rock_roughness
metal_roughness
fog_noise
waterfall_mask
```

Target resolution:

- environment rocks: 1024.
- hero portal: 2048 desktop, 1024 mobile.
- utility noise: 256–512.

Kompres:

- WebP/AVIF untuk image.
- KTX2/Basis jika pipeline memungkinkan.

Hindari 4K texture kecuali benar-benar terlihat pada closeup.

---

# 52. GLTF EXPORT SETTINGS

Dari Blender:

- Apply transforms.
- Forward `-Z`, Up `Y` default glTF.
- Export selected objects only.
- Remove unused material slots.
- Merge static meshes jika membantu draw call.
- Preserve separate animated/interactive groups.
- Use Draco/Meshopt jika tersedia.

Naming:

```text
PRELUDE_Portal_L
PRELUDE_Portal_R
ORIGINS_Island
CRAFT_System
IMPACT_Cliff_A
PROCESS_Ring_01
FUTURE_Gate
```

Jangan gunakan nama `Cube.001` pada production asset.

---

# 53. LOD SYSTEM

Untuk heavy meshes gunakan 3 levels:

```text
LOD0 — active chapter / near camera
LOD1 — neighbor chapter
LOD2 — distant chapter
```

Switch berdasarkan distance dengan hysteresis agar tidak flicker.

Contoh:

- < 22 units → LOD0.
- 22–45 → LOD1.
- > 45 → LOD2.

Untuk procedural structures, simply hide tiny details pada distance.

---

# 54. SCENE ACTIVATION

Walaupun satu world, jangan render/update semuanya dengan full cost.

Setiap chapter mempunyai state:

```text
sleeping
nearby
active
leaving
```

Sleeping:

- animation paused.
- dynamic lights off.
- shader uniforms minimal update.

Nearby:

- low-frequency motion.

Active:

- full local choreography.

Leaving:

- settle/downscale motion.

---

# 55. RENDER LOOP

Gunakan satu shared ticker.

Pseudo-code:

```js
function tick(time) {
  const dt = Math.min(clock.getDelta(), 0.033);
  updateScrollProgress();
  updateCamera(masterProgress, dt);
  updateActiveChapter(masterProgress, dt);
  updateTrail(masterProgress, dt);
  updateParticles(dt);
  updateDOM(masterProgress);
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
```

Jangan membuat requestAnimationFrame terpisah untuk setiap effect.

Pause/minimize update ketika tab hidden via `document.visibilityState`.

---

# 56. DOM / WEBGL SYNCHRONIZATION

Gunakan one source of truth `masterProgress`.

DOM overlays, nav state, chapter cards, light intensity, camera, dan shader progress harus membaca state yang sama.

Jangan menyinkronkan dengan `setTimeout` berdasarkan perkiraan.

Buat helper:

```js
getLocalProgress(section)
getSectionWeight(section)
getActiveSection()
mapRange()
smoothstep()
```

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

# 63. SEO / META

Tambahkan:

```html
<title>MAHAKARYA — Career Journey Portfolio</title>
<meta name="description" content="A cinematic interactive portfolio exploring a career as one continuous journey through craft, impact, process, and future.">
<meta name="theme-color" content="#071018">
```

Tambahkan Open Graph placeholders.

Jika user menyediakan nama pribadi, masukkan ke title/description tanpa mengubah brand MAHAKARYA.

---

# 64. CONTENT DATA MODEL

Walaupun single file, simpan chapter data terstruktur:

```js
const chapters = [
  {
    id: 'prelude',
    number: '01',
    label: 'Prelude',
    title: 'A Journey in Motion',
    description: '...',
    range: [0.0, 0.155]
  },
  ...
]
```

Project data juga array terpisah.

Jangan hardcode text yang sama di 4 tempat berbeda.

---

# 65. CSS SYSTEM

Gunakan CSS custom properties hanya untuk design constants yang benar-benar global.

Kelompokkan:

```text
colors
spacing
typography
z-index
transitions
```

Z-index plan:

```text
canvas            0
atmosphere        2
world-vignette    4
story-ui         10
topbar           20
chapter-rail     22
cards            24
menu/project     50
loader           80
focus/cursor     90
```

Jangan gunakan `z-index: 999999` tanpa alasan.

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

# 73. RESIZE HANDLING

Pada resize:

- debounce heavy rebuild `150ms`.
- update renderer size immediately enough to avoid stretch.
- camera aspect update.
- recompute layout breakpoints.
- ScrollTrigger refresh.
- preserve current chapter/progress.

Jangan reset user ke top.

---

# 74. ORIENTATION CHANGE

Mobile orientation change:

- preserve nearest chapter.
- rebuild simplified scene if required.
- no duplicated canvas.
- no runaway listeners.

---

# 75. MEMORY MANAGEMENT

Saat loading GLTF/textures:

- cache shared materials/textures.
- reuse geometries.
- dispose unused resources if chapter asset replaced.
- avoid creating new Vector3/Color each frame in hot loops.

Gunakan temporary reusable vectors.

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

# 77. DEVELOPMENT BUILD ORDER

Implement dalam urutan ini:

## Phase 1 — Structural prototype

- semantic HTML.
- topbar.
- chapter rail.
- story rail.
- footer.
- scroll progress.
- no WebGL yet.

## Phase 2 — Shared 3D world

- renderer.
- camera spline.
- six placeholder landmark boxes.
- trail.
- fog.

## Phase 3 — Replace landmarks

- Prelude portal.
- Origins island.
- Craft structure.
- Impact cliffs.
- Process orrery.
- Future gate.

## Phase 4 — Sync motion

- local progress.
- light weights.
- DOM reveal.
- nav state.

## Phase 5 — Interaction

- chapter click.
- project overlay.
- menu overlay.
- pointer.
- keyboard.

## Phase 6 — Optimization

- quality tiers.
- LOD.
- lazy load.
- asset compression.

## Phase 7 — Accessibility and polish

- reduced motion.
- no-WebGL fallback.
- focus management.
- contrast check.
- final QA.

Jangan memulai dari shader kompleks sebelum layout dan camera path benar.

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

# 91. CODE QUALITY

Kode harus:

- modular walaupun single file.
- functions kecil dan jelas.
- constants grouped.
- no duplicated listeners.
- no implicit globals.
- cleanup handlers.
- comments pada mathematical mapping / shader, bukan komentar obvious.

Recommended modules-as-sections dalam satu script:

```text
CONFIG
STATE
DOM REFERENCES
UTILS
SCROLL ENGINE
WEBGL INIT
WORLD BUILDERS
CAMERA SYSTEM
CHAPTER SYSTEM
UI INTERACTIONS
ACCESSIBILITY
RESIZE
TICK
BOOT
```

---

# 92. PRODUCTION PSEUDOCODE

```js
boot();

async function boot() {
  detectCapabilities();
  initDOM();
  initAccessibility();
  initScroll();

  if (supportsWebGL) {
    initRenderer();
    buildBaseWorld();
    await loadCriticalPreludeAssets();
    revealExperience();
    loadRemainingAssetsInBackground();
    requestAnimationFrame(tick);
  } else {
    initStaticFallback();
    revealExperience();
  }
}

function tick(t) {
  const P = scrollEngine.progress;
  const active = getActiveSection(P);

  updateCamera(P, t);
  updateChapterWorld(active, P, t);
  updateJourneyTrail(P, t);
  updateAtmosphere(P, t);
  updateDOMUI(P, active);

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
```

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

# 100. ACCEPTANCE CRITERIA — PERFORMANCE

Lolos jika:

- tidak ada noticeable freeze saat chapter switch.
- mobile tidak render DPR > 1.
- asset lazy-loading tidak membuat content shift parah.
- offscreen heavy animations paused.
- no console errors.
- no repeated WebGL warnings.
- resize tidak leak canvas/listeners.

---

# 101. QA CHECKLIST

Sebelum selesai, verifikasi semua item berikut:

- [ ] Canvas mengisi cinematic stage dengan benar.
- [ ] Loader tidak stuck jika asset fail.
- [ ] Prelude readable pada first paint.
- [ ] Hero title tidak overlap nav.
- [ ] Left rail active state sinkron dengan scroll.
- [ ] Click rail mengarah ke chapter benar.
- [ ] Story cards aktif sesuai chapter.
- [ ] Story card click bekerja.
- [ ] Journey trail reveal sinkron.
- [ ] Camera tidak jitter.
- [ ] Pointer parallax tidak berlebihan.
- [ ] Fog tidak menutup text.
- [ ] Portal glow tidak blown out.
- [ ] Floating rocks tidak terlihat random chaos.
- [ ] Craft modules align di center progress.
- [ ] Impact project focus states distinct.
- [ ] Project overlay dapat ditutup dengan ESC.
- [ ] Focus trap overlay bekerja.
- [ ] Process stages menyala urut.
- [ ] Future exposure transition halus.
- [ ] End state stabil.
- [ ] Footer accessible.
- [ ] LinkedIn/email/resume links clickable.
- [ ] All icons have accessible labels.
- [ ] Canvas aria-hidden.
- [ ] Semantic headings correct.
- [ ] No body horizontal overflow mobile.
- [ ] Safe area iPhone handled.
- [ ] Reduced motion tested.
- [ ] No WebGL fallback tested.
- [ ] Resize from desktop to tablet stable.
- [ ] Orientation change stable.
- [ ] Safari text rendering acceptable.
- [ ] Safari 100vh issues avoided using `svh/dvh` where needed.
- [ ] Android Chrome scroll remains natural.
- [ ] No passive listener warnings.
- [ ] No memory growth after repeated menu/project open-close.
- [ ] Tab hidden pauses heavy update.
- [ ] DPR cap applied.
- [ ] Quality downgrade works.
- [ ] Project data not duplicated.
- [ ] All chapter content editable from data object.
- [ ] No placeholder Lorem Ipsum.
- [ ] No generic skill bars.
- [ ] No generic testimonial carousel.
- [ ] No glassmorphism panels.
- [ ] No oversaturated cyberpunk neon.
- [ ] No random spinning logo.
- [ ] No sound autoplay.
- [ ] No hard scroll snap between chapters.
- [ ] Visual composition remains coherent at 1366×768.
- [ ] Visual composition remains coherent at 1920×1080.
- [ ] Mobile card rail swipe works.
- [ ] Minimum tap target 44px.
- [ ] Text contrast AA where required.
- [ ] Focus state visible.
- [ ] Hash deep links open correct chapter.
- [ ] Back button behavior correct.
- [ ] Failed asset fallback visually acceptable.
- [ ] Console clean in production mode.

---

# 102. OUTPUT CONTRACT FOR THE CODING AGENT

Ketika mengerjakan prompt ini, keluarkan:

1. **Final `index.html` lengkap**, bukan potongan pseudo-code.
2. Semua CSS dan JS yang diperlukan.
3. Tidak boleh meninggalkan `TODO` untuk fitur inti.
4. Sertakan fallback procedural asset jika external asset tidak ada.
5. Sertakan komentar bagian yang menunjukkan tempat user mengganti:
   - nama,
   - role,
   - project,
   - link,
   - asset URL.
6. Sertakan brief comment di awal file mengenai cara menjalankan.
7. Pastikan file dapat dijalankan dengan static server sederhana.
8. Jangan berhenti pada hero; implement seluruh enam chapter.
9. Jangan mengurangi scope menjadi gallery biasa.
10. Jangan mengubah konsep menjadi vertical landing page desktop.

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

