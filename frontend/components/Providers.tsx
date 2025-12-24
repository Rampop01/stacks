'use client'

import React, { ReactNode } from 'react'
import { wagmiAdapter, projectId, chains, metadata } from '@/lib/appkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { AppKitProvider } from '@reown/appkit/react'

// Setup queryClient
const queryClient = new QueryClient()

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppKitProvider
          projectId={projectId}
          networks={chains as any}
          metadata={metadata}
        >
          {children}
        </AppKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
