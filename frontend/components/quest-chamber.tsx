import type { ReactNode } from "react"

interface QuestChamberProps {
  children: ReactNode
}

export function QuestChamber({ children }: QuestChamberProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-gradient-to-b from-card/50 via-muted/30 to-card/50 border-4 border-border rounded-lg shadow-2xl overflow-hidden min-h-[600px]">
          {/* Stone texture */}
          <div className="absolute inset-0 stone-texture opacity-40" />

          {/* Side torch effects */}
          <div className="absolute top-10 left-0 w-1 h-32 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
          <div className="absolute top-10 right-0 w-1 h-32 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          {/* Pillar decorations */}
          <div className="absolute top-0 left-8 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
          <div className="absolute top-0 right-8 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />

          {/* Content */}
          <div className="relative z-10">{children}</div>
        </div>
      </div>
    </div>
  )
}
