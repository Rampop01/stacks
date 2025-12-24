'use client';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppKitProvider } from '@reown/appkit';
import { AppKitWagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { config } from '../wagmi.config';
import { theme } from '../theme';
import { ProfileProvider } from '../contexts/ProfileContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AppKitProvider 
          adapter={AppKitWagmiAdapter}
          theme={theme}
          appName="Stacks Quest"
          appDescription="Learn Bitcoin. Build on Stacks. Anchored to Truth."
          appIconUrl="/icon.png"
        >
          <ProfileProvider>
            {children}
          </ProfileProvider>
        </AppKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
