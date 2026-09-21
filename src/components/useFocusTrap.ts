import { useEffect, type RefObject } from 'react'

interface FocusTrapOptions {
  active: boolean
  containerRef: RefObject<HTMLElement | null>
  onEscape: () => void
  restoreFocusRef?: RefObject<HTMLElement | null>
}

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export function useFocusTrap({
  active,
  containerRef,
  onEscape,
  restoreFocusRef,
}: FocusTrapOptions) {
  useEffect(() => {
    if (!active || !containerRef.current) return undefined

    const container = containerRef.current
    const previous = restoreFocusRef?.current ?? document.activeElement
    const getFocusable = () => Array.from(container.querySelectorAll<HTMLElement>(focusableSelector))
    const frame = window.requestAnimationFrame(() => {
      const first = getFocusable()[0]
      ;(first || container).focus()
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onEscape()
        return
      }
      if (event.key !== 'Tab') return

      const items = getFocusable()
      if (!items.length) {
        event.preventDefault()
        container.focus()
        return
      }

      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', handleKeyDown)
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [active, containerRef, onEscape, restoreFocusRef])
}
