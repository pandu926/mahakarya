import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';
import WebGLWorld from './components/WebGLWorld.jsx';
import Shell from './components/Shell.jsx';
import { chapters, projects } from './data/portfolio.js';
import { clamp, getActiveChapter } from './lib/progress.js';

const CHAPTER_IDS = chapters.map((chapter) => chapter.id);

function getInitialChapter() {
  const hash = window.location.hash.replace('#', '').split('/')[0];
  return CHAPTER_IDS.includes(hash) ? hash : chapters[0].id;
}

export default function App() {
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [worldAvailable, setWorldAvailable] = useState(true);
  const [initialChapter] = useState(getInitialChapter);
  const lenisRef = useRef(null);
  const frameRef = useRef(null);
  const targetProgressRef = useRef(0);
  const reducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  const activeChapter = getActiveChapter(progress, chapters);

  useEffect(() => {
    const totalScroll = () => Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const readProgress = () => {
      targetProgressRef.current = clamp(window.scrollY / totalScroll(), 0, 1);
    };
    readProgress();
    window.addEventListener('scroll', readProgress, { passive: true });

    if (!reducedMotion) {
      const lenis = new Lenis({ duration: 1.08, smoothWheel: true, wheelMultiplier: 0.92, touchMultiplier: 1, syncTouch: false });
      lenisRef.current = lenis;
      const raf = (time) => {
        lenis.raf(time);
        frameRef.current = requestAnimationFrame(raf);
      };
      frameRef.current = requestAnimationFrame(raf);
    }

    let animationFrame;
    const smoothState = () => {
      setProgress((current) => {
        const next = reducedMotion ? targetProgressRef.current : current + (targetProgressRef.current - current) * 0.12;
        return Math.abs(next - current) < 0.0002 ? targetProgressRef.current : next;
      });
      animationFrame = requestAnimationFrame(smoothState);
    };
    animationFrame = requestAnimationFrame(smoothState);

    return () => {
      window.removeEventListener('scroll', readProgress);
      cancelAnimationFrame(animationFrame);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      lenisRef.current?.destroy();
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (initialChapter === chapters[0].id) return;
    const chapter = chapters.find((item) => item.id === initialChapter);
    if (!chapter) return;
    const target = Math.min(0.99, (chapter.range[0] + chapter.range[1]) / 2);
    requestAnimationFrame(() => window.scrollTo({ top: target * (document.documentElement.scrollHeight - window.innerHeight), behavior: 'instant' }));
  }, [initialChapter]);

  const jumpToChapter = useCallback((id) => {
    const chapter = chapters.find((item) => item.id === id);
    if (!chapter) return;
    const target = Math.min(0.99, (chapter.range[0] + chapter.range[1]) / 2);
    const top = target * Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    window.history.pushState({}, '', `#${id}`);
    if (lenisRef.current) lenisRef.current.scrollTo(top);
    else window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [reducedMotion]);

  const openProject = useCallback((project) => {
    setSelectedProject(project);
    lenisRef.current?.stop();
    window.history.pushState({}, '', `#impact/${project.slug}`);
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
    lenisRef.current?.start();
    window.history.pushState({}, '', '#impact');
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.key === 'Escape') {
        if (selectedProject) closeProject();
        else if (menuOpen) setMenuOpen(false);
      }
      if (/^[1-6]$/.test(event.key)) jumpToChapter(chapters[Number(event.key) - 1].id);
      if (event.key === 'Home') jumpToChapter('prelude');
      if (event.key === 'End') jumpToChapter('future');
    };
    const onPopState = () => {
      const hash = window.location.hash.replace('#', '').split('/');
      if (hash[0] === 'impact' && hash[1]) {
        const project = projects.find((item) => item.slug === hash[1]);
        if (project) setSelectedProject(project);
      } else {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('popstate', onPopState);
    };
  }, [closeProject, jumpToChapter, menuOpen, selectedProject]);

  return (
    <div className="app-shell" data-active-chapter={activeChapter.id}>
      <WebGLWorld progress={progress} reducedMotion={reducedMotion} onAvailabilityChange={setWorldAvailable} />
      {!worldAvailable && <div className="webgl-fallback" aria-hidden="true" />}
      <Shell
        chapters={chapters}
        projects={projects}
        progress={progress}
        activeChapter={activeChapter}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        selectedProject={selectedProject}
        onJump={jumpToChapter}
        onOpenProject={openProject}
        onCloseProject={closeProject}
      />
      <div className="scroll-spacer" aria-hidden="true" />
    </div>
  );
}
