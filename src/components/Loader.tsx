interface LoaderProps {
  visible?: boolean
  progress?: number
  label?: string
}

export default function Loader({ visible = false, progress = 100, label = 'Loading the journey' }: LoaderProps) {
  const value = Math.min(100, Math.max(0, Math.round(progress)))
  if (!visible) return null

  return (
    <div className="mk-loader" role="status" aria-live="polite" aria-label={`${label} ${value}%`}>
      <div className="mk-loader__wordmark">MAHAKARYA</div>
      <div className="mk-loader__label"><span>{label}</span><span>{value}%</span></div>
      <div className="mk-loader__track" aria-hidden="true"><span style={{ transform: `scaleX(${value / 100})` }} /></div>
    </div>
  )
}
