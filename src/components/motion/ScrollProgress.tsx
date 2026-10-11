import { memo } from 'react'

export const ScrollProgress = memo(function ScrollProgress() {
  return (
    <div
      className="scroll-progress-bar-container"
      role="progressbar"
      aria-label="Page reading progress"
      aria-hidden="true"
    >
      <div className="scroll-progress-fill" />
    </div>
  )
})
