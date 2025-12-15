import Link from "next/link"
import { FortressButton } from "@/components/fortress-button"

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a]">
      {/* Stone texture overlay */}
      <div className="absolute inset-0 stone-texture opacity-40" />

      {/* Torch glow effects */}
      <div
        className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "4s" }}
      />
      <div
        className="absolute top-40 right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "5s", animationDelay: "1s" }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Fortress gate decoration */}
        <div className="mb-12 space-y-6 text-center">
          <div className="inline-block">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="w-3 h-3 rotate-45 border-2 border-primary" />
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
          </div>

          {/* Main title - engraved style */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-engraved tracking-wider uppercase bg-gradient-to-b from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            Stacks
            <br />
            Quest
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-serif max-w-2xl mx-auto leading-relaxed">
            Learn Bitcoin. Build on Stacks. Anchored to Truth.
          </p>

          <div className="inline-block mt-4">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="w-3 h-3 rotate-45 border-2 border-primary" />
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
          </div>
        </div>

        {/* Call to action */}
        <Link href="/roadmap">
          <FortressButton size="lg" className="mt-8">
            Enter the Fortress
          </FortressButton>
        </Link>

        {/* Bottom decorative elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-muted-foreground/50 uppercase tracking-widest">
          <div className="w-8 h-px bg-muted-foreground/30" />
          <span>Knowledge Awaits</span>
          <div className="w-8 h-px bg-muted-foreground/30" />
        </div>
      </div>

      {/* Floating dust particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
