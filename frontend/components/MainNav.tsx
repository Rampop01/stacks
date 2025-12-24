'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ConnectButton } from './ConnectButton';
import { UserMenu } from './UserMenu';
import { isAuthenticated } from '@/app/user-session';

export function MainNav() {
  const pathname = usePathname();
  const isAuth = isAuthenticated();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Quest', href: '/quest' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Marketplace', href: '/marketplace' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4 md:space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold inline-block">Stacks Quest</span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === item.href ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {isAuth ? <UserMenu /> : <ConnectButton />}
        </div>
      </div>
    </header>
  );
}
