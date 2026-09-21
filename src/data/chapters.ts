import type { ChapterConfig } from '../types'

const manifesto =
  'Setiap langkah, sebuah makna. Setiap karya, jejak perubahan. Ini bukan sekadar portfolio. Ini adalah mahakarya perjalanan.'

export const chapters = [
  {
    id: 'prelude',
    index: 0,
    number: '01',
    label: 'Prelude',
    title: 'A Journey in Motion',
    eyebrow: 'A CAREER JOURNEY PORTFOLIO',
    heading: 'MAHAKARYA',
    range: [0.000, 0.155],
    worldX: 0,
    story: manifesto,
    description: manifesto,
    copy: {
      subtitle: 'A CAREER JOURNEY PORTFOLIO',
      manifesto,
      cta: 'SCROLL TO BEGIN',
    },
    landmark: 'portal',
    motif: 'portal',
  },
  {
    id: 'origins',
    index: 1,
    number: '02',
    label: 'Origins',
    title: 'Where It Began',
    eyebrow: 'Curiosity becomes direction.',
    heading: 'WHERE IT BEGAN',
    range: [0.135, 0.320],
    worldX: 22,
    story:
      'Eksperimen awal, rasa ingin tahu, dan keputusan-keputusan kecil yang akhirnya membentuk cara saya berkarya.',
    description:
      'Eksperimen awal, rasa ingin tahu, dan keputusan-keputusan kecil yang akhirnya membentuk cara saya berkarya.',
    copy: {
      subheading: 'Curiosity becomes direction.',
      supporting:
        'Eksperimen awal, rasa ingin tahu, dan keputusan-keputusan kecil yang akhirnya membentuk cara saya berkarya.',
      milestones: [
        '201X — FIRST EXPERIMENT',
        '201X — FIRST REAL PROJECT',
        '202X — FIRST SYSTEM I WAS PROUD OF',
      ],
    },
    landmark: 'floating-island',
    motif: 'island',
  },
  {
    id: 'craft',
    index: 2,
    number: '03',
    label: 'Craft',
    title: 'Tools Into Possibilities',
    eyebrow: 'Tools into possibilities.',
    heading: 'TOOLS INTO POSSIBILITIES',
    range: [0.285, 0.490],
    worldX: 44,
    story: 'Skill bukan daftar software. Skill adalah kemampuan mengubah batas menjadi kemungkinan.',
    description: 'Skill bukan daftar software. Skill adalah kemampuan mengubah batas menjadi kemungkinan.',
    copy: {
      body: 'Skill bukan daftar software. Skill adalah kemampuan mengubah batas menjadi kemungkinan.',
      modules: ['SYSTEM', 'INTERFACE', 'MOTION', 'SPACE'],
    },
    landmark: 'modular-architecture',
    motif: 'structure',
  },
  {
    id: 'impact',
    index: 3,
    number: '04',
    label: 'Impact',
    title: 'Ideas That Deliver',
    eyebrow: 'Ideas that deliver.',
    heading: 'IDEAS THAT DELIVER',
    range: [0.450, 0.665],
    worldX: 68,
    story: 'Ini merepresentasikan hasil nyata dan konsekuensi karya.',
    description: 'Ini merepresentasikan hasil nyata dan konsekuensi karya.',
    copy: {
      projects: 'Three project anchors',
      cta: 'VIEW PROJECT',
    },
    landmark: 'fragmented-cliff-city',
    motif: 'cliff',
  },
  {
    id: 'process',
    index: 4,
    number: '05',
    label: 'Process',
    title: 'A System That Works',
    eyebrow: 'A system that works.',
    heading: 'A SYSTEM THAT WORKS',
    range: [0.625, 0.835],
    worldX: 92,
    story:
      'Dari ketidakjelasan menuju hasil. Proses saya dirancang untuk mengubah kompleksitas menjadi keputusan yang dapat dijalankan.',
    description:
      'Dari ketidakjelasan menuju hasil. Proses saya dirancang untuk mengubah kompleksitas menjadi keputusan yang dapat dijalankan.',
    copy: {
      body:
        'Dari ketidakjelasan menuju hasil. Proses saya dirancang untuk mengubah kompleksitas menjadi keputusan yang dapat dijalankan.',
      stages: ['Discover', 'Define', 'Design', 'Develop', 'Deliver'],
    },
    landmark: 'kinetic-orrery',
    motif: 'orrery',
  },
  {
    id: 'future',
    index: 5,
    number: '06',
    label: 'Future',
    title: "What's Next",
    eyebrow: "What's next.",
    heading: 'WHAT’S NEXT',
    range: [0.790, 1.000],
    worldX: 118,
    story: 'Bigger challenges. Greater impact. Let’s build what’s next together.',
    description: 'Bigger challenges. Greater impact. Let’s build what’s next together.',
    copy: {
      body: 'Bigger challenges. Greater impact. Let’s build what’s next together.',
      primaryCta: 'GET IN TOUCH',
      secondaryCta: 'VIEW RESUME',
    },
    landmark: 'future-gate',
    motif: 'horizon',
  },
] as const satisfies readonly ChapterConfig[]

export type Chapters = typeof chapters

export const CHAPTERS = chapters
