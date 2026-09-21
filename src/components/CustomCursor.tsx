import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor || !window.matchMedia('(pointer: fine)').matches) return undefined

    const onPointerMove = (event: PointerEvent) => {
      cursor.style.setProperty('--cursor-x', `${event.clientX}px`)
      cursor.style.setProperty('--cursor-y', `${event.clientY}px`)
      const target = event.target instanceof Element ? event.target.closest('a, button, [data-cursor="interactive"]') : null
      cursor.toggleAttribute('data-hover', Boolean(target))
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  return <div ref={cursorRef} className="mk-cursor" aria-hidden="true"><span className="mk-cursor__dot" /><span className="mk-cursor__ring" /></div>
}
