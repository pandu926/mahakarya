import type { Profile, ProjectItem } from '../types'

export const profile = {
  name: 'YOUR NAME',
  role: 'Creative Developer / Designer',
  email: 'hello@example.com',
  linkedin: '#',
  resume: '#',
} as const satisfies Profile

export const projects = [
  {
    id: 'digital-experience-platform',
    slug: 'digital-experience-platform',
    number: '01',
    title: 'Digital Experience Platform',
    label: 'DIGITAL EXPERIENCE PLATFORM',
    role: 'Creative Developer / Designer',
    summary: 'Outcome to be defined.',
    outcome: 'Outcome to be defined.',
    metric: '+XX%',
    thumbnail: 'project-01',
    tags: [],
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
    summary: 'Outcome to be defined.',
    outcome: 'Outcome to be defined.',
    metric: '+XX%',
    thumbnail: 'project-02',
    tags: [],
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
    summary: 'Outcome to be defined.',
    outcome: 'Outcome to be defined.',
    metric: '+XX%',
    thumbnail: 'project-03',
    tags: [],
    details: {
      problem: 'Problem to be defined.',
      process: 'Process to be defined.',
      contribution: 'Contribution to be defined.',
      result: 'Result to be defined.',
      gallery: [],
      externalLink: '#',
    },
  },
] as const satisfies readonly ProjectItem[]

export type Projects = typeof projects

export const PROFILE = profile
export const PROJECTS = projects
