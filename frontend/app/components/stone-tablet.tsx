import type { ReactNode } from "react"

interface StoneTabletProps {
  title: string
  content: ReactNode
}

export function StoneTablet({ title, content }: StoneTabletProps) {
  return (
    <div className="animate-fade-in">
      <div className="relative bg-gradient-to-br from-card via-muted to-card border-4 border-border rounded-lg shadow-2xl p-8 md:p-12">
        {/* Stone texture overlay */}
        <div className="absolute inset-0 stone-texture opacity-50 rounded-lg" />

        {/* Bronze corner decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary/50 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary/50 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary/50 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary/50 rounded-br-lg" />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="w-3 h-3 rotate-45 border-2 border-primary" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-engraved text-primary">{title}</h2>

          <div className="prose prose-invert prose-lg max-w-none">{content}</div>
        </div>
      </div>
    </div>
  )
}
