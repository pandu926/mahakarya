interface CurrentChapterIndicatorProps {
  number: string
  label: string
  total: number
}

export default function CurrentChapterIndicator({ number, label, total }: CurrentChapterIndicatorProps) {
  return (
    <div className="mk-current-chapter" aria-live="polite">
      <span>{number}</span><span>/</span><span>{String(total).padStart(2, '0')}</span><b>{label}</b>
    </div>
  )
}
