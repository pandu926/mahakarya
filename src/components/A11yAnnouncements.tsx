interface A11yAnnouncementsProps {
  activeChapter: string
  projectOpen?: boolean
}

export default function A11yAnnouncements({ activeChapter, projectOpen = false }: A11yAnnouncementsProps) {
  return <div className="mk-sr-only" role="status" aria-live="polite" aria-atomic="true">{projectOpen ? 'Project detail opened.' : `Current chapter: ${activeChapter}.`}</div>
}
