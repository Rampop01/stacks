"use client"

interface QuizPanelProps {
  question: string
  options: string[]
  selectedAnswer: number | null
  onSelectAnswer: (index: number) => void
}

export function QuizPanel({ question, options, selectedAnswer, onSelectAnswer }: QuizPanelProps) {
  return (
    <div className="bg-gradient-to-br from-card via-muted to-card border-4 border-border rounded-lg shadow-2xl p-8 relative overflow-hidden">
      {/* Stone texture */}
      <div className="absolute inset-0 stone-texture opacity-50" />

      {/* Bronze accents */}
      <div className="absolute top-4 left-4 w-12 h-px bg-gradient-to-r from-primary to-transparent" />
      <div className="absolute top-4 right-4 w-12 h-px bg-gradient-to-l from-primary to-transparent" />

      <div className="relative z-10">
        {/* Question */}
        <div className="mb-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-engraved leading-relaxed">{question}</h3>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelectAnswer(index)}
              className={`w-full p-6 text-left rounded-lg border-2 transition-all duration-300 relative overflow-hidden group ${
                selectedAnswer === index
                  ? "border-primary bg-primary/20 scale-105"
                  : "border-border bg-card/50 hover:border-primary/50 hover:bg-card"
              }`}
            >
              <div className="absolute inset-0 stone-texture opacity-30" />
              <div className="relative z-10 flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    selectedAnswer === index
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30 group-hover:border-primary/50"
                  }`}
                >
                  {selectedAnswer === index && <div className="w-4 h-4 rounded-full bg-primary-foreground" />}
                </div>
                <span className="text-lg font-medium">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
