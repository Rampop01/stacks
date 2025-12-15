"use client"

interface EngravedLetterProps {
  letter: string
  collected: boolean
  onCollect: () => void
}

export function EngravedLetter({ letter, collected, onCollect }: EngravedLetterProps) {
  return (
    <button
      onClick={onCollect}
      disabled={collected}
      className={`relative w-20 h-20 text-4xl font-bold transition-all duration-500 ${
        collected
          ? "text-primary scale-90 opacity-50 cursor-not-allowed"
          : "text-foreground hover:text-primary hover:scale-110 cursor-pointer"
      }`}
    >
      <span className="relative z-10 text-engraved">{letter}</span>

      {!collected && <div className="absolute inset-0 bg-primary/20 rounded animate-pulse" />}

      {collected && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-px bg-primary rotate-45" />
        </div>
      )}
    </button>
  )
}
