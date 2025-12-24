'use client';

import { useRouter } from 'next/navigation';
import { useProfile } from '@/contexts/ProfileContext';
import { isAuthenticated, userSession } from '@/app/user-session';
import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function UserMenu() {
  const { profile } = useProfile();
  const { address } = useAccount();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isAuthenticated() || !address) {
    return null;
  }

  const handleSignOut = () => {
    userSession.signUserOut('/');
    router.push('/');
  };

  const getInitials = () => {
    if (profile?.username) {
      return profile.username.charAt(0).toUpperCase();
    }
    return address.slice(2, 4).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.avatarUrl} alt={profile?.username || 'User'} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {profile?.username || 'Anonymous'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {`${address.slice(0, 6)}...${address.slice(-4)}`}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/profile')}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
