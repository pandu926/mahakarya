import { Component, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, ErrorInfo, ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { chapterConfigs } from '../chapters/config'
import { journeyRuntime, getAdaptiveQuality, getQualityProfile } from './runtime'
import type { ChapterConfig, QualityTier, WebGLStageProps } from './types'
import { World } from './World'

const FALLBACK_BACKGROUND = 'radial-gradient(circle at 70% 38%, rgba(47, 72, 77, 0.54), transparent 42%), #071018'

export function canUseWebGL(): boolean {
  if (typeof document === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const context = (
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: false })
      || canvas.getContext('webgl', { failIfMajorPerformanceCaveat: false })
      || canvas.getContext('experimental-webgl', { failIfMajorPerformanceCaveat: false })
    ) as WebGLRenderingContext | null
    const available = Boolean(context)
    context?.getExtension('WEBGL_lose_context')?.loseContext()
    return available
  } catch {
    return false
  }
}

interface WebGLErrorBoundaryProps {
  children: ReactNode
  fallback: ReactNode
  onError?: (error: Error, info: ErrorInfo) => void
}

interface WebGLErrorBoundaryState {
  hasError: boolean
}

export class WebGLErrorBoundary extends Component<WebGLErrorBoundaryProps, WebGLErrorBoundaryState> {
  state: WebGLErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): WebGLErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

export function StaticWorldFallback({ className = '', style = {}, reason = 'unavailable', chapter = 'prelude' }: { className?: string; style?: CSSProperties; reason?: string; chapter?: string }) {
  return (
    <div
      className={`webgl-stage webgl-stage--fallback ${className}`}
      data-webgl-status="fallback"
      data-webgl-fallback="true"
      data-webgl-reason={reason}
      aria-label="Static background for the career journey"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        isolation: 'isolate',
        background: `linear-gradient(90deg, rgba(7,16,24,.8), rgba(7,16,24,.1)), url('/assets/images/chapters/${chapter}.jpg') center / cover, ${FALLBACK_BACKGROUND}`,
        height: 'var(--mk-stage-height)',
        ...style,
      }}
    >
      <span aria-hidden="true" style={{ position: 'absolute', inset: '18% 8% 16%', border: '1px solid rgba(231, 184, 107, 0.16)', transform: 'perspective(700px) rotateX(58deg)', transformOrigin: 'center bottom' }} />
      <span aria-hidden="true" style={{ position: 'absolute', left: '18%', top: '16%', width: '1px', height: '68%', background: 'linear-gradient(transparent, rgba(231, 184, 107, .64), transparent)' }} />
    </div>
  )
}

function RuntimeBridge({ reducedMotion }: Pick<WebGLStageProps, 'reducedMotion'>) {
  journeyRuntime.reducedMotion = Boolean(reducedMotion)
  return null
}

function FirstFrame({ onReady }: { onReady?: () => void }) {
  const frames = useRef(0)
  useFrame(({ gl, scene }) => {
    if (++frames.current === 2) onReady?.()
    if (frames.current % 60 === 2 && (import.meta.env.DEV || window.location.search.includes('debug=1'))) {
      let valid = true
      scene.traverse(object => { if (!object.position.toArray().every(Number.isFinite)) valid = false })
      const names = ['PreludePortal', 'OriginsFloatingIsland', 'CraftArchitecture', 'ImpactCliffCity', 'ProcessOrrery', 'FutureGateCity']
      gl.domElement.dataset.worldValid = String(valid)
      gl.domElement.dataset.landmarkCount = String(names.filter(name => scene.getObjectByName(name)).length)
      gl.domElement.dataset.drawCalls = String(gl.info.render.calls)
      gl.domElement.dataset.triangles = String(gl.info.render.triangles)
    }
  })
  return null
}

function PointerRuntime({ reducedMotion }: { reducedMotion: boolean }) {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const touchDevice = 'ontouchstart' in window || (navigator.maxTouchPoints || 0) > 0
    const onMove = (event: PointerEvent) => {
      if (reducedMotion || touchDevice) return
      journeyRuntime.pointerX = (event.clientX / Math.max(window.innerWidth, 1) - 0.5) * 2
      journeyRuntime.pointerY = (event.clientY / Math.max(window.innerHeight, 1) - 0.5) * 2
    }
    const reset = () => {
      journeyRuntime.pointerX = 0
      journeyRuntime.pointerY = 0
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', reset, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', reset)
    }
  }, [reducedMotion])
  return null
}

export function WebGLStage({
  activeChapter = 'prelude',
  reducedMotion = false,
  qualityTier = 'auto',
  chapters = chapterConfigs,
  className = '',
  style = {},
  onAvailabilityChange,
  onReady,
  fallback: customFallback,
}: WebGLStageProps) {
  const availability = useRef(onAvailabilityChange)
  availability.current = onAvailabilityChange
  const [status, setStatus] = useState<'checking' | 'ready' | 'fallback'>('checking')
  const [resolvedQuality, setResolvedQuality] = useState<QualityTier>(() => {
    if (qualityTier !== 'auto') return qualityTier
    return getAdaptiveQuality(typeof window === 'undefined' ? 1280 : window.innerWidth, typeof navigator === 'undefined' ? {} : navigator)
  })
  const safeChapters = useMemo<readonly ChapterConfig[]>(() => chapters.length >= 6 ? chapters : chapterConfigs, [chapters])

  useEffect(() => {
    if (qualityTier !== 'auto') { setResolvedQuality(qualityTier); return }
    const update = () => setResolvedQuality(getAdaptiveQuality(window.innerWidth, navigator))
    const mobile = window.matchMedia('(max-width: 767px)')
    const tablet = window.matchMedia('(max-width: 1099px)')
    mobile.addEventListener('change', update)
    tablet.addEventListener('change', update)
    return () => { mobile.removeEventListener('change', update); tablet.removeEventListener('change', update) }
  }, [qualityTier])

  useEffect(() => {
    if (!canUseWebGL()) {
      setStatus('fallback')
      availability.current?.(false)
      onReady?.()
      return undefined
    }
    setStatus('ready')
    availability.current?.(true)
    return undefined
  }, [onReady])

  const fallback = customFallback ?? <StaticWorldFallback chapter={activeChapter} className={className} style={style} reason="webgl-error" />
  if (status !== 'ready') {
    return customFallback ?? <StaticWorldFallback chapter={activeChapter} className={className} style={style} reason={status === 'checking' ? 'checking' : 'webgl-unavailable'} />
  }

  const profile = getQualityProfile(resolvedQuality)
  return (
    <div
      className={`webgl-stage ${className}`}
      data-webgl-status="ready"
      data-webgl-fallback="false"
      data-world-landmarks="portal,island,craft,cliff,orrery,gate"
      style={{ position: 'fixed', inset: '0 0 auto', height: 'var(--mk-stage-height)', zIndex: 0, overflow: 'hidden', pointerEvents: 'none', ...style }}
      aria-hidden="true"
    >
      <WebGLErrorBoundary
        fallback={fallback}
        onError={() => {
          setStatus('fallback')
          availability.current?.(false)
          onReady?.()
        }}
      >
        <RuntimeBridge reducedMotion={reducedMotion} />
        <PointerRuntime reducedMotion={reducedMotion} />
        <Canvas
          aria-hidden="true"
          dpr={[1, profile.maxDpr]}
          gl={{ antialias: profile.antialias, alpha: true, powerPreference: 'high-performance' }}
          camera={{ fov: 38, near: 0.1, far: 260, position: [-8, 3.4, 12] }}
          onCreated={({ gl }) => {
            gl.outputColorSpace = THREE.SRGBColorSpace
            gl.toneMapping = THREE.ACESFilmicToneMapping
            gl.toneMappingExposure = 0.95
            gl.shadowMap.enabled = profile.shadows
            gl.shadowMap.type = THREE.PCFSoftShadowMap
          }}
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <World chapters={safeChapters} qualityTier={resolvedQuality} reducedMotion={reducedMotion} />
          <FirstFrame onReady={onReady} />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  )
}

export default WebGLStage
