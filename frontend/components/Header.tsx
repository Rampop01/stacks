'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-torch rounded border border-primary/50 flex items-center justify-center">
              <span className="text-lg font-bold text-background">S</span>
            </div>
            <span className="hidden sm:inline-block text-xl font-bold bg-gradient-to-r from-primary to-torch bg-clip-text text-transparent">
              Stacks Quest
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/roadmap" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Roadmap
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/marketplace" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Marketplace
          </Link>
          <Link href="/leaderboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Leaderboard
          </Link>
        </nav>

        {/* Wallet Button */}
        <div className="flex items-center">
          <appkit-button />
        </div>
      </div>
    </header>
  );
}
