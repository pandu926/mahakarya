/**
 * Content for the MAHAKARYA career journey. Keep the copy here so the
 * narrative can be changed without touching the presentation layer.
 */

const freeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) {
    return value
  }

  Object.values(value).forEach(freeze)
  return Object.freeze(value)
}

export const profile = freeze({
  name: 'YOUR NAME',
  role: 'Creative Developer / Designer',
  email: 'hello@example.com',
  linkedin: '#',
  resume: '#',
})

export const chapters = freeze([
  {
    id: 'prelude',
    number: '01',
    label: 'Prelude',
    title: 'A Journey in Motion',
    heading: 'MAHAKARYA',
    description:
      'Setiap langkah, sebuah makna. Setiap karya, jejak perubahan. Ini bukan sekadar portfolio. Ini adalah mahakarya perjalanan.',
    range: [0.000, 0.155],
    copy: {
      subtitle: 'A CAREER JOURNEY PORTFOLIO',
      manifesto:
        'Setiap langkah, sebuah makna. Setiap karya, jejak perubahan. Ini bukan sekadar portfolio. Ini adalah mahakarya perjalanan.',
      cta: 'SCROLL TO BEGIN',
    },
    landmark: 'portal',
  },
  {
    id: 'origins',
    number: '02',
    label: 'Origins',
    title: 'Where It Began',
    heading: 'WHERE IT BEGAN',
    description:
      'Eksperimen awal, rasa ingin tahu, dan keputusan-keputusan kecil yang akhirnya membentuk cara saya berkarya.',
    range: [0.135, 0.320],
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
  },
  {
    id: 'craft',
    number: '03',
    label: 'Craft',
    title: 'Tools Into Possibilities',
    heading: 'TOOLS INTO POSSIBILITIES',
    description:
      'Skill bukan daftar software. Skill adalah kemampuan mengubah batas menjadi kemungkinan.',
    range: [0.285, 0.490],
    copy: {
      body: 'Skill bukan daftar software. Skill adalah kemampuan mengubah batas menjadi kemungkinan.',
      modules: ['SYSTEM', 'INTERFACE', 'MOTION', 'SPACE'],
    },
    landmark: 'modular-architecture',
  },
  {
    id: 'impact',
    number: '04',
    label: 'Impact',
    title: 'Ideas That Deliver',
    heading: 'IDEAS THAT DELIVER',
    description: 'Ini merepresentasikan hasil nyata dan konsekuensi karya.',
    range: [0.450, 0.665],
    copy: {
      projects: 'Three project anchors',
      cta: 'VIEW PROJECT',
    },
    landmark: 'fragmented-cliff-city',
  },
  {
    id: 'process',
    number: '05',
    label: 'Process',
    title: 'A System That Works',
    heading: 'A SYSTEM THAT WORKS',
    description:
      'Dari ketidakjelasan menuju hasil. Proses saya dirancang untuk mengubah kompleksitas menjadi keputusan yang dapat dijalankan.',
    range: [0.625, 0.835],
    copy: {
      body:
        'Dari ketidakjelasan menuju hasil. Proses saya dirancang untuk mengubah kompleksitas menjadi keputusan yang dapat dijalankan.',
      stages: ['Discover', 'Define', 'Design', 'Develop', 'Deliver'],
    },
    landmark: 'kinetic-orrery',
  },
  {
    id: 'future',
    number: '06',
    label: 'Future',
    title: "What's Next",
    heading: "WHAT’S NEXT",
    description:
      'Bigger challenges. Greater impact. Let’s build what’s next together.',
    range: [0.790, 1.000],
    copy: {
      body: 'Bigger challenges. Greater impact. Let’s build what’s next together.',
      primaryCta: 'GET IN TOUCH',
      secondaryCta: 'VIEW RESUME',
    },
    landmark: 'future-gate',
  },
])

export const projects = freeze([
  {
    id: 'digital-experience-platform',
    slug: 'digital-experience-platform',
    number: '01',
    title: 'Digital Experience Platform',
    label: 'DIGITAL EXPERIENCE PLATFORM',
    role: 'Creative Developer / Designer',
    outcome: 'Outcome to be defined.',
    metric: '+XX%',
    thumbnail: 'project-01',
    details: {
      problem: 'Problem to be defined.',
      process: 'Process to be defined.',
      contribution: 'Contribution to be defined.',
      result: 'Result to be defined.',
      gallery: [],
      externalLink: '#',
    },
  },
  {
    id: 'sustainable-tech-initiative',
    slug: 'sustainable-tech-initiative',
    number: '02',
    title: 'Sustainable Tech Initiative',
    label: 'SUSTAINABLE TECH INITIATIVE',
    role: 'Creative Developer / Designer',
    outcome: 'Outcome to be defined.',
    metric: '+XX%',
    thumbnail: 'project-02',
    details: {
      problem: 'Problem to be defined.',
      process: 'Process to be defined.',
      contribution: 'Contribution to be defined.',
      result: 'Result to be defined.',
      gallery: [],
      externalLink: '#',
    },
  },
  {
    id: 'creative-automation-system',
    slug: 'creative-automation-system',
    number: '03',
    title: 'Creative Automation System',
    label: 'CREATIVE AUTOMATION SYSTEM',
    role: 'Creative Developer / Designer',
    outcome: 'Outcome to be defined.',
    metric: '+XX%',
    thumbnail: 'project-03',
    details: {
      problem: 'Problem to be defined.',
      process: 'Process to be defined.',
      contribution: 'Contribution to be defined.',
      result: 'Result to be defined.',
      gallery: [],
      externalLink: '#',
    },
  },
])

export const PROFILE = profile
export const CHAPTERS = chapters
export const PROJECTS = projects
