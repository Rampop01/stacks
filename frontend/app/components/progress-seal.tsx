export function ProgressSeal() {
  return (
    <div className="inline-block animate-fade-in">
      <div className="relative w-48 h-48 mx-auto">
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full border-4 border-primary animate-pulse"
          style={{ animationDuration: "3s" }}
        />

        {/* Middle ring */}
        <div className="absolute inset-4 rounded-full border-2 border-primary/60" />

        {/* Inner circle */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/30 via-primary/20 to-transparent flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-2 relative">
              {/* Bitcoin-inspired symbol */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
                <path
                  d="M 30 30 L 30 70 M 30 50 L 60 50 M 40 30 L 40 70 M 40 30 L 65 30 Q 75 30 75 40 Q 75 50 65 50 L 40 50 M 40 50 L 68 50 Q 78 50 78 60 Q 78 70 68 70 L 40 70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-xs uppercase tracking-widest text-primary font-bold">Sealed</div>
          </div>
        </div>

        {/* Decorative corners */}
        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary" />
        <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-primary" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-primary" />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-primary" />
      </div>
    </div>
  )
}
