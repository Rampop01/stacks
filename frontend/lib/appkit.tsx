import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum } from '@wagmi/core/chains'
import { defineChain } from 'viem'

// Define Stacks Mainnet if not already in Wagmi (usually it's not)
export const stacksMainnet = defineChain({
  id: 1,
  name: 'Stacks',
  nativeCurrency: { name: 'Stacks', symbol: 'STX', decimals: 6 },
  rpcUrls: {
    default: { http: ['https://api.mainnet.hiro.so'] },
  },
  blockExplorers: {
    default: { name: 'Stacks Explorer', url: 'https://explorer.hiro.so' },
  },
})

export const stacksTestnet = defineChain({
  id: 2147483648,
  name: 'Stacks Testnet',
  nativeCurrency: { name: 'Stacks', symbol: 'STX', decimals: 6 },
  rpcUrls: {
    default: { http: ['https://api.testnet.hiro.so'] },
  },
  blockExplorers: {
    default: { name: 'Stacks Explorer', url: 'https://explorer.hiro.so?chain=testnet' },
  },
})

// 1. Get projectId from https://cloud.reown.com
export const projectId = 'ac5d04aa2bab1a3d51a34a3f84a30b06'

// 2. Create a metadata object
export const metadata = {
  name: 'Stacks Quest',
  description: 'Master Bitcoin and Stacks through interactive quests and challenges',
  url: 'https://stacks-quest.vercel.app',
  icons: ['https://stacks-quest.vercel.app/icon.png']
}

// 3. Create Wagmi Adapter
export const chains = [mainnet, arbitrum, stacksMainnet, stacksTestnet] as const
export const wagmiAdapter = new WagmiAdapter({
  chains: chains as any,
  projectId,
  networks: chains as any
})

// 4. Create modal instance
createAppKit({
  adapters: [wagmiAdapter],
  networks: chains as any,
  metadata,
  projectId,
  features: {
    analytics: true
  }
})
