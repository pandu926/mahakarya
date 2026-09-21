import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as portfolio from '../data/portfolio.js';
import { getActiveChapter as getStrongestActiveChapter } from '../lib/progress.js';

const RANGE_DEFAULTS = [
  [0, 0.155],
  [0.135, 0.32],
  [0.285, 0.49],
  [0.45, 0.665],
  [0.625, 0.835],
  [0.79, 1],
];

const CHAPTER_DEFAULTS = [
  {
    id: 'prelude',
    number: '01',
    label: 'Prelude',
    title: 'A Journey in Motion',
    subtitle: 'The work is the trace of the journey.',
    description:
      'Setiap langkah, sebuah makna. Setiap karya, jejak perubahan. Ini bukan sekadar portfolio. Ini adalah mahakarya perjalanan.',
    kicker: 'A CAREER JOURNEY PORTFOLIO',
    range: RANGE_DEFAULTS[0],
    motif: 'portal',
  },
  {
    id: 'origins',
    number: '02',
    label: 'Origins',
    title: 'Where It Began',
    subtitle: 'Curiosity becomes direction.',
    description:
      'Eksperimen awal, rasa ingin tahu, dan keputusan-keputusan kecil yang akhirnya membentuk cara saya berkarya.',
    range: RANGE_DEFAULTS[1],
    motif: 'island',
  },
  {
    id: 'craft',
    number: '03',
    label: 'Craft',
    title: 'Tools Into Possibilities',
    subtitle: 'A practice built for the in-between.',
    description:
      'Skill bukan daftar software. Skill adalah kemampuan mengubah batas menjadi kemungkinan.',
    range: RANGE_DEFAULTS[2],
    motif: 'structure',
  },
  {
    id: 'impact',
    number: '04',
    label: 'Impact',
    title: 'Ideas That Deliver',
    subtitle: 'Making the work matter beyond the screen.',
    description:
      'Karya yang baik meninggalkan sesuatu yang lebih berguna, lebih jelas, dan lebih manusiawi.',
    range: RANGE_DEFAULTS[3],
    motif: 'cliff',
  },
  {
    id: 'process',
    number: '05',
    label: 'Process',
    title: 'A System That Works',
    subtitle: 'From ambiguity to a decision you can build.',
    description:
      'Dari ketidakjelasan menuju hasil. Proses saya dirancang untuk mengubah kompleksitas menjadi keputusan yang dapat dijalankan.',
    range: RANGE_DEFAULTS[4],
    motif: 'orrery',
  },
  {
    id: 'future',
    number: '06',
    label: 'Future',
    title: "What's Next",
    subtitle: 'A horizon made with intention.',
    description: "Bigger challenges. Greater impact. Let's build what's next together.",
    range: RANGE_DEFAULTS[5],
    motif: 'horizon',
  },
];

const PROJECT_DEFAULTS = [
  {
    id: 'digital-experience-platform',
    number: '01',
    title: 'Digital Experience Platform',
    role: 'Design direction · Product systems',
    outcome: 'A clearer path through a complex digital service.',
    problem: 'A fragmented experience made it difficult for people to understand what to do next.',
    process: 'Research, service mapping, prototyping, and a flexible interface system brought the experience into focus.',
    contribution: 'Led the visual direction and translated the core interaction model into a durable product language.',
    result: 'A system that makes the important moments feel immediate and legible.',
  },
  {
    id: 'sustainable-tech-initiative',
    number: '02',
    title: 'Sustainable Tech Initiative',
    role: 'Creative technology · Narrative',
    outcome: 'Turning a difficult subject into an invitation to act.',
    problem: 'The story was important, but the existing language made it feel distant and abstract.',
    process: 'A visual narrative connected the data to tangible choices and a more hopeful future.',
    contribution: 'Shaped the concept, interaction language, and editorial rhythm across the experience.',
    result: 'A more human way to understand the impact of everyday decisions.',
  },
  {
    id: 'creative-automation-system',
    number: '03',
    title: 'Creative Automation System',
    role: 'Systems thinking · Prototyping',
    outcome: 'Less repetition. More room for the work that needs judgment.',
    problem: 'A growing team was spending its most valuable time repeating low-value production tasks.',
    process: 'Mapped the recurring work, designed small tools around real behavior, and tested the seams with the team.',
    contribution: 'Built the operating model and prototypes that made the new workflow feel natural.',
    result: 'A calmer system that compounds creative attention instead of consuming it.',
  },
];

const PROFILE_DEFAULT = {
  name: 'YOUR NAME',
  role: 'Creative Developer / Designer',
  email: 'hello@example.com',
  linkedin: '#',
  github: '#',
  resume: '#',
};

const asArray = (value) => (Array.isArray(value) ? value : []);

function sourceData() {
  return portfolio || {};
}

function normalizeChapter(chapter, index) {
  const fallback = CHAPTER_DEFAULTS[index] || CHAPTER_DEFAULTS[0];
  const motifAlias = {
    'floating-island': 'island',
    'modular-architecture': 'structure',
    'fragmented-cliff-city': 'cliff',
    'kinetic-orrery': 'orrery',
    'future-gate': 'horizon',
  };
  const range = Array.isArray(chapter?.range)
    ? chapter.range
    : Array.isArray(chapter?.progress)
      ? chapter.progress
      : RANGE_DEFAULTS[index] || fallback.range;

  return {
    ...fallback,
    ...(chapter || {}),
    id: chapter?.id || chapter?.slug || fallback.id,
    number: String(chapter?.number || fallback.number).padStart(2, '0'),
    label: chapter?.label || chapter?.name || fallback.label,
    title: chapter?.title || fallback.title,
    subtitle: chapter?.subtitle || chapter?.copy?.subtitle || chapter?.copy?.subheading || fallback.subtitle,
    kicker: chapter?.kicker || chapter?.copy?.subtitle || fallback.kicker,
    description: chapter?.description || chapter?.body || fallback.description,
    range,
    motif: chapter?.motif || motifAlias[chapter?.landmark] || fallback.motif,
    image: chapter?.image || chapter?.thumbnail || chapter?.background,
  };
}

function normalizeProject(project, index) {
  const details = project?.details || {};
  return {
    ...(PROJECT_DEFAULTS[index] || PROJECT_DEFAULTS[0]),
    ...(project || {}),
    id: project?.id || project?.slug || PROJECT_DEFAULTS[index]?.id || `project-${index + 1}`,
    number: String(project?.number || PROJECT_DEFAULTS[index]?.number || index + 1).padStart(2, '0'),
    problem: project?.problem || details.problem || PROJECT_DEFAULTS[index]?.problem,
    process: project?.process || details.process || PROJECT_DEFAULTS[index]?.process,
    contribution: project?.contribution || details.contribution || PROJECT_DEFAULTS[index]?.contribution,
    result: project?.result || details.result || PROJECT_DEFAULTS[index]?.result,
    link: project?.link || details.externalLink,
  };
}

function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function getHashState() {
  if (typeof window === 'undefined') return { chapterId: null, projectId: null };
  const [chapterId, projectId] = window.location.hash.replace(/^#/, '').split('/');
  return { chapterId: chapterId || null, projectId: projectId || null };
}

function isTypingTarget(target) {
  return target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
}

function useFocusTrap(active, containerRef, onEscape) {
  useEffect(() => {
    if (!active || !containerRef.current) return undefined;

    const container = containerRef.current;
    const previous = document.activeElement;
    const focusable = () => Array.from(container.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
    const frame = window.requestAnimationFrame(() => (focusable()[0] || container).focus());

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onEscape();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('keydown', handleKeyDown);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [active, containerRef, onEscape]);
}

function ArrowIcon() {
  return <span className="icon-arrow" aria-hidden="true">↗</span>;
}

export default function Shell({
  chapters: chapterProp,
  projects: projectProp,
  profile: profileProp,
  progress: controlledProgress,
  menuOpen: controlledMenuOpen,
  setMenuOpen: setControlledMenuOpen,
  selectedProject: controlledProject,
  onJump,
  onOpenProject,
  onCloseProject,
}) {
  const source = useMemo(sourceData, []);
  const chapters = useMemo(
    () => (asArray(chapterProp).length ? chapterProp : (asArray(source.chapters).length ? source.chapters : CHAPTER_DEFAULTS)).map(normalizeChapter),
    [chapterProp, source.chapters],
  );
  const projects = useMemo(
    () => (asArray(projectProp).length ? projectProp : (asArray(source.projects).length ? source.projects : PROJECT_DEFAULTS)).map(normalizeProject),
    [projectProp, source.projects],
  );
  const profile = useMemo(() => ({ ...PROFILE_DEFAULT, ...(profileProp || source.profile || {}) }), [profileProp, source.profile]);

  const [internalProgress, setInternalProgress] = useState(0);
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const [internalProject, setInternalProject] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const menuRef = useRef(null);
  const modalRef = useRef(null);
  const menuButtonRef = useRef(null);
  const projectButtonRef = useRef(null);
  const rafRef = useRef(0);

  const isMenuControlled = typeof controlledMenuOpen === 'boolean';
  const menuOpen = isMenuControlled ? controlledMenuOpen : internalMenuOpen;
  const setMenuOpen = setControlledMenuOpen || setInternalMenuOpen;
  const isProjectControlled = controlledProject !== undefined || Boolean(onOpenProject) || Boolean(onCloseProject);
  const selectedProject = isProjectControlled
    ? (controlledProject ? normalizeProject(controlledProject, Math.max(projects.findIndex((project) => project.id === controlledProject.id), 0)) : null)
    : internalProject;
  const progress = typeof controlledProgress === 'number' ? clamp(controlledProgress) : internalProgress;
  const activeChapter = getStrongestActiveChapter(progress, chapters) || chapters[0];
  const activeIndex = Math.max(0, chapters.indexOf(activeChapter));
  const activeId = activeChapter?.id || 'prelude';
  const localProgress = activeChapter
    ? clamp((progress - activeChapter.range[0]) / Math.max(activeChapter.range[1] - activeChapter.range[0], 0.001))
    : 0;

  const updateProgress = useCallback(() => {
    rafRef.current = 0;
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    setInternalProgress(clamp(window.scrollY / maxScroll));
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onPreferenceChange = () => setReducedMotion(mediaQuery.matches);
    onPreferenceChange();
    mediaQuery.addEventListener?.('change', onPreferenceChange);
    return () => mediaQuery.removeEventListener?.('change', onPreferenceChange);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!rafRef.current) rafRef.current = window.requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateProgress);
      window.cancelAnimationFrame(rafRef.current);
    };
  }, [updateProgress]);

  const closeMenu = useCallback(() => setMenuOpen(false), [setMenuOpen]);
  const closeProject = useCallback(() => {
    if (onCloseProject) onCloseProject();
    else setInternalProject(null);
    projectButtonRef.current = null;
    if (!onCloseProject && window.location.hash.includes('/')) window.history.replaceState({}, '', `#${activeId}`);
  }, [activeId, onCloseProject]);

  useFocusTrap(menuOpen, menuRef, closeMenu);
  useFocusTrap(Boolean(selectedProject), modalRef, closeProject);

  useEffect(() => {
    document.body.classList.toggle('overlay-is-open', menuOpen || Boolean(selectedProject));
    return () => document.body.classList.remove('overlay-is-open');
  }, [menuOpen, selectedProject]);

  useEffect(() => {
    const applyHash = () => {
      const { chapterId, projectId } = getHashState();
      if (chapterId && chapters.some((chapter) => chapter.id === chapterId)) {
        const chapter = chapters.find((item) => item.id === chapterId);
        if (chapter) {
          const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
          const target = ((chapter.range[0] + chapter.range[1]) / 2) * maxScroll;
          window.scrollTo({ top: target, behavior: reducedMotion ? 'auto' : 'smooth' });
        }
      }
      if (projectId) {
        const project = projects.find((item) => item.id === projectId);
        if (project && !isProjectControlled) setInternalProject(project);
      } else {
        if (!isProjectControlled) setInternalProject(null);
      }
    };
    window.addEventListener('popstate', applyHash);
    window.addEventListener('hashchange', applyHash);
    applyHash();
    return () => {
      window.removeEventListener('popstate', applyHash);
      window.removeEventListener('hashchange', applyHash);
    };
  }, [chapters, isProjectControlled, projects, reducedMotion]);

  const scrollToChapter = useCallback((chapter) => {
    if (onJump) {
      onJump(chapter.id);
      setMenuOpen(false);
      return;
    }
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const target = ((chapter.range[0] + chapter.range[1]) / 2) * maxScroll;
    window.history.replaceState({}, '', `#${chapter.id}`);
    window.scrollTo({ top: target, behavior: reducedMotion ? 'auto' : 'smooth' });
    setMenuOpen(false);
  }, [onJump, reducedMotion, setMenuOpen]);

  const openProject = useCallback((project) => {
    projectButtonRef.current = document.activeElement;
    if (onOpenProject) onOpenProject(project);
    else {
      setInternalProject(project);
      window.history.pushState({}, '', `#impact/${project.id}`);
    }
  }, [onOpenProject]);

  const handleGlobalKey = useCallback((event) => {
    if (menuOpen || selectedProject || isTypingTarget(event.target)) return;
    const chapter = (offset) => chapters[clamp(activeIndex + offset, 0, chapters.length - 1)];
    if (event.key === 'Home') {
      event.preventDefault();
      scrollToChapter(chapters[0]);
    } else if (event.key === 'End') {
      event.preventDefault();
      scrollToChapter(chapters[chapters.length - 1]);
    } else if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      event.preventDefault();
      scrollToChapter(chapter(1));
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault();
      scrollToChapter(chapter(-1));
    } else if (/^[1-6]$/.test(event.key)) {
      event.preventDefault();
      scrollToChapter(chapters[Number(event.key) - 1]);
    }
  }, [activeIndex, chapters, menuOpen, scrollToChapter, selectedProject]);

  useEffect(() => {
    document.addEventListener('keydown', handleGlobalKey);
    return () => document.removeEventListener('keydown', handleGlobalKey);
  }, [handleGlobalKey]);

  const topbarScrolled = progress > 0.03;
  const progressStyle = { '--global-progress': progress, '--local-progress': localProgress };

  return (
    <div className="portfolio-shell" data-active-chapter={activeId} data-reduced-motion={reducedMotion} style={progressStyle}>
      <a className="skip-link" href="#portfolio-content">Skip to portfolio content</a>

      <header className={`topbar${topbarScrolled ? ' is-scrolled' : ''}`}>
        <a className="brand-lockup" href="#prelude" onClick={(event) => { event.preventDefault(); scrollToChapter(chapters[0]); }}>
          <span className="brand-name">Mahakarya</span>
          <span className="brand-role">Career Journey Portfolio</span>
        </a>
        <p className="topbar-tagline">A journey of ideas. A lifetime of impact.</p>
        <button
          ref={menuButtonRef}
          className={`menu-trigger${menuOpen ? ' is-open' : ''}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="menu-overlay"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span>Menu</span>
          <span className="menu-glyph" aria-hidden="true"><i /><i /><i /><i /></span>
        </button>
      </header>

      <nav className="chapter-rail" aria-label="Chapters">
        <ol>
          {chapters.map((chapter, index) => {
            const isActive = chapter.id === activeId;
            const segmentProgress = clamp((progress - chapter.range[0]) / Math.max(chapter.range[1] - chapter.range[0], 0.001));
            return (
              <li key={chapter.id} className={isActive ? 'is-active' : ''}>
                {index > 0 && <span className="chapter-connector" aria-hidden="true"><span style={{ transform: `scaleY(${clamp((progress - chapters[index - 1].range[0]) / 0.2)})` }} /></span>}
                <button type="button" onClick={() => scrollToChapter(chapter)} aria-current={isActive ? 'step' : undefined}>
                  <span className="chapter-dot" aria-hidden="true" />
                  <span className="chapter-rail-copy"><b>{chapter.number}</b><span>{chapter.label}</span></span>
                  <span className="chapter-progress" aria-hidden="true" style={{ transform: `scaleX(${segmentProgress})` }} />
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="mobile-chapter-indicator" aria-live="polite">
        <span>{activeChapter.number}</span><span>/</span><span>{String(chapters.length).padStart(2, '0')}</span><b>{activeChapter.label}</b>
      </div>

      <main id="portfolio-content" className="portfolio-content">
        <section className="story-stage" aria-labelledby="story-stage-title">
          <div className="story-stage__wash" aria-hidden="true" />
          <div className="story-stage__grain" aria-hidden="true" />
          <div className="story-stage__content" key={activeChapter.id}>
            <span className="eyebrow"><span>{activeChapter.number}</span> {activeChapter.label}</span>
            <h1 id="story-stage-title">{activeChapter.id === 'prelude' ? 'Mahakarya' : activeChapter.title}</h1>
            <p className="story-stage__kicker">{activeChapter.id === 'prelude' ? activeChapter.kicker : activeChapter.subtitle}</p>
            <p className="story-stage__description">{activeChapter.description}</p>

            {activeChapter.id === 'prelude' && (
              <p className="manifesto-copy">Setiap langkah, sebuah makna.<br />Setiap karya, jejak perubahan.</p>
            )}

            {activeChapter.id === 'origins' && activeChapter.copy?.milestones && (
              <ul className="chapter-detail-list chapter-detail-list--milestones" aria-label="Origins milestones">
                {activeChapter.copy.milestones.map((milestone) => <li key={milestone}>{milestone}</li>)}
              </ul>
            )}

            {activeChapter.id === 'craft' && activeChapter.copy?.modules && (
              <ul className="chapter-detail-list chapter-detail-list--modules" aria-label="Craft modules">
                {activeChapter.copy.modules.map((module) => <li key={module}>{module}</li>)}
              </ul>
            )}

            {activeChapter.id === 'process' && activeChapter.copy?.stages && (
              <ol className="process-stages" aria-label="Process stages">
                {activeChapter.copy.stages.map((stage, index) => <li key={stage} className={index <= Math.round(localProgress * (activeChapter.copy.stages.length - 1)) ? 'is-active' : ''}><span>{String(index + 1).padStart(2, '0')}</span>{stage}</li>)}
              </ol>
            )}

            {activeChapter.id === 'impact' && (
              <div className="project-index" aria-label="Selected projects">
                {projects.slice(0, 3).map((project) => (
                  <button key={project.id} type="button" onClick={() => openProject(project)}>
                    <span>{project.number}</span><strong>{project.title}</strong><ArrowIcon />
                  </button>
                ))}
              </div>
            )}

            {activeChapter.id === 'future' && (
              <div className="story-actions">
                <a className="button button--primary" href={`mailto:${profile.email}`}>Get in touch <ArrowIcon /></a>
                <a className="button button--quiet" href={profile.resume || '#'}>View resume <ArrowIcon /></a>
              </div>
            )}

            {activeChapter.id === 'prelude' && (
              <button className="scroll-cue" type="button" onClick={() => scrollToChapter(chapters[1] || chapters[0])}>
                <span className="scroll-cue__line" aria-hidden="true" /><span>Scroll to begin</span><ArrowIcon />
              </button>
            )}
          </div>
          <div className="story-stage__meta" aria-hidden="true"><span>Scroll to explore</span><i /></div>
        </section>

        <div id="portfolio-scroll-track" className="portfolio-scroll-track" aria-hidden="true" />

        <section className="chapter-card-rail" aria-labelledby="chapter-index-title">
          <div className="rail-heading"><span className="eyebrow" id="chapter-index-title">The journey</span><span className="rail-heading__progress">{String(Math.round(progress * 100)).padStart(2, '0')} / 100</span></div>
          <div className="chapter-card-scroller">
            {chapters.map((chapter) => (
              <button
                className={`chapter-card${chapter.id === activeId ? ' is-active' : ''}`}
                key={chapter.id}
                type="button"
                onClick={() => scrollToChapter(chapter)}
                style={chapter.image ? { '--chapter-image': `url(${JSON.stringify(chapter.image)})` } : undefined}
                aria-current={chapter.id === activeId ? 'step' : undefined}
              >
                <span className="chapter-card__art" aria-hidden="true"><span className={`chapter-motif chapter-motif--${chapter.motif}`} /></span>
                <span className="chapter-card__shade" aria-hidden="true" />
                <span className="chapter-card__content"><small>{chapter.number} &nbsp; {chapter.label}</small><strong>{chapter.title}</strong><em>{chapter.description}</em></span>
                <span className="chapter-card__arrow" aria-hidden="true"><ArrowIcon /></span>
              </button>
            ))}
          </div>
        </section>

        <footer className="site-footer">
          <div className="footer-brand"><span>MAHAKARYA</span><small>Career Journey Portfolio</small></div>
          <div className="footer-note"><q>Ideas travel further when they are real.</q><span>My journey continues <i aria-hidden="true" /></span></div>
          <nav className="footer-links" aria-label="Contact links">
            <a href={profile.linkedin || '#'}>LinkedIn</a>
            <a href={`mailto:${profile.email}`}>Email</a>
            <a href={profile.resume || '#'}>Download CV</a>
          </nav>
        </footer>
      </main>

      <aside
        id="menu-overlay"
        ref={menuRef}
        className={`menu-overlay${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen ? '' : undefined}
        onMouseDown={(event) => { if (event.target === event.currentTarget) closeMenu(); }}
      >
        <div className="menu-panel" role="dialog" aria-modal="true" aria-labelledby="menu-title" tabIndex="-1">
          <div className="menu-panel__header"><span className="eyebrow">Navigation / 00</span><button type="button" className="overlay-close" onClick={closeMenu} aria-label="Close menu"><span /><span /></button></div>
          <div className="menu-panel__body">
            <div className="menu-chapters"><h2 id="menu-title">The chapters</h2><ol>{chapters.map((chapter) => <li key={chapter.id}><button type="button" onClick={() => scrollToChapter(chapter)}><span>{chapter.number}</span>{chapter.label}<ArrowIcon /></button></li>)}</ol></div>
            <div className="menu-aside"><span className="eyebrow">Current chapter</span><strong>{activeChapter.number} / {activeChapter.label}</strong><p>{activeChapter.subtitle}</p><span className="menu-aside__rule" /><span className="eyebrow">Say hello</span><a href={`mailto:${profile.email}`}>{profile.email}</a><small>{profile.role}</small></div>
          </div>
        </div>
      </aside>

      {selectedProject && (
        <aside className="project-modal" ref={modalRef} aria-hidden={!selectedProject} onMouseDown={(event) => { if (event.target === event.currentTarget) closeProject(); }}>
          <div className="project-modal__panel" role="dialog" aria-modal="true" aria-labelledby="project-title" tabIndex="-1">
            <div className="project-modal__top"><span className="eyebrow">{selectedProject.number} / Impact</span><button type="button" className="overlay-close" onClick={closeProject} aria-label="Close project detail"><span /><span /></button></div>
            <div className="project-modal__body"><div className="project-modal__visual" aria-hidden="true"><span className={`chapter-motif chapter-motif--${chapters.find((chapter) => chapter.id === 'impact')?.motif || 'cliff'}`} /></div><div className="project-modal__copy"><h2 id="project-title">{selectedProject.title}</h2><p className="project-modal__role">{selectedProject.role}</p><p className="project-modal__outcome">{selectedProject.outcome}</p><dl><div><dt>Problem</dt><dd>{selectedProject.problem}</dd></div><div><dt>Process</dt><dd>{selectedProject.process}</dd></div><div><dt>Contribution</dt><dd>{selectedProject.contribution}</dd></div><div><dt>Result</dt><dd>{selectedProject.result}</dd></div></dl>{selectedProject.link && <a className="button button--primary" href={selectedProject.link}>View project <ArrowIcon /></a>}</div></div>
          </div>
        </aside>
      )}
    </div>
  );
}
