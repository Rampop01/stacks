// Topics data for Stacks Quest

export interface Topic {
  id: number
  title: string
  description: string
  content: {
    introduction: string
    sections: {
      heading: string
      content: string
    }[]
    analogy: {
      content: string
    }
  }
}

export const TOPICS_DATA: Topic[] = [
  {
    id: 1,
    title: "Bitcoin Fundamentals",
    description: "Understand the foundation of decentralized sound money",
    content: {
      introduction: "Bitcoin is a decentralized digital currency that enables peer-to-peer transactions without intermediaries. It introduces the concept of digital scarcity through proof of work mining.",
      sections: [
        {
          heading: "What is Bitcoin",
          content: "Bitcoin is decentralized digital money based on scarcity and cryptographic proof. Mining secures the network through computational work."
        },
        {
          heading: "Key Principles",
          content: "Bitcoin operates on proof of work consensus. Scarcity is enforced through a fixed 21 million supply cap."
        }
      ],
      analogy: {
        content: "Bitcoin is like digital gold - scarce, decentralized, and valuable due to proof of work mining that secures the network."
      }
    }
  },
  {
    id: 2,
    title: "Introduction to Stacks",
    description: "Learn how Stacks brings smart contracts to Bitcoin",
    content: {
      introduction: "Stacks is a layer for smart contracts on Bitcoin. It enables decentralized applications while inheriting Bitcoin's security and finality.",
      sections: [
        {
          heading: "Stacks Overview",
          content: "Stacks brings smart contracts to Bitcoin without modifying Bitcoin itself. It uses a unique consensus mechanism called Proof of Transfer."
        },
        {
          heading: "Bitcoin Finality",
          content: "Stacks transactions settle on Bitcoin, inheriting its security and finality guarantees."
        }
      ],
      analogy: {
        content: "Stacks is like building smart contract applications on Bitcoin's rock-solid foundation of security and finality."
      }
    }
  },
  {
    id: 3,
    title: "Clarity Smart Contracts",
    description: "Master the Clarity programming language for secure contracts",
    content: {
      introduction: "Clarity is a decidable smart contract language designed for security and predictability. It prevents common vulnerabilities like reentrancy attacks.",
      sections: [
        {
          heading: "Clarity Basics",
          content: "Clarity is decidable, meaning you can know what a program will do before execution. This security feature prevents reentrancy and other attacks."
        },
        {
          heading: "Readable Security",
          content: "Clarity code is readable and decidable, making security audits more effective than with opaque bytecode."
        }
      ],
      analogy: {
        content: "Clarity is like a blueprint where you can see exactly how the building will turn out - decidable, readable, and secure against reentrancy."
      }
    }
  },
  {
    id: 4,
    title: "Proof of Transfer",
    description: "Understand Stacks' unique consensus mechanism",
    content: {
      introduction: "Proof of Transfer is the consensus mechanism that connects Stacks to Bitcoin. Miners transfer Bitcoin to participate in the consensus process.",
      sections: [
        {
          heading: "PoX Consensus",
          content: "Proof of Transfer allows miners to mine Stacks by transferring Bitcoin. This creates a direct economic link to Bitcoin."
        },
        {
          heading: "Stacking Rewards",
          content: "STX holders can stack their tokens to earn Bitcoin rewards from miners participating in consensus."
        }
      ],
      analogy: {
        content: "Proof of Transfer is like miners paying rent in Bitcoin to participate in consensus, with stacking rewards flowing back to STX holders."
      }
    }
  },
  {
    id: 5,
    title: "Development Tools",
    description: "Learn the essential tools for building on Stacks",
    content: {
      introduction: "Clarinet is the primary development tool for building Stacks applications. Hiro provides a comprehensive suite of tools for developers.",
      sections: [
        {
          heading: "Clarinet Development",
          content: "Clarinet is a Clarity runtime packaged as a CLI tool for local development and testing of smart contracts."
        },
        {
          heading: "Hiro Tools",
          content: "Hiro provides essential tools for building Stacks applications, including wallets, explorers, and APIs."
        }
      ],
      analogy: {
        content: "Clarinet and Hiro tools are like a complete workshop for building and testing smart contracts before deployment."
      }
    }
  },
  {
    id: 6,
    title: "Nakamoto Upgrade",
    description: "Explore the latest Stacks upgrade for fast blocks",
    content: {
      introduction: "The Nakamoto upgrade brings fast blocks and secure Bitcoin reorgs. sBTC enables trustless Bitcoin on Stacks.",
      sections: [
        {
          heading: "Fast Finality",
          content: "Nakamoto introduces fast block times and 100% Bitcoin finality with no reorgs except Bitcoin reorgs."
        },
        {
          heading: "sBTC Launch",
          content: "sBTC is a trustless Bitcoin peg built on the Nakamoto upgrade's security guarantees."
        }
      ],
      analogy: {
        content: "Nakamoto is like upgrading from a dirt road to a highway - fast blocks with Bitcoin's security as the foundation."
      }
    }
  },
  {
    id: 7,
    title: "DeFi on Bitcoin",
    description: "Discover decentralized finance applications on Stacks",
    content: {
      introduction: "DeFi brings lending, trading, and yield opportunities to Bitcoin through Stacks. All protocols are trustless and decentralized.",
      sections: [
        {
          heading: "Lending Protocols",
          content: "DeFi enables trustless lending and borrowing of Bitcoin and STX through decentralized protocols."
        },
        {
          heading: "Trading and Yield",
          content: "Decentralized exchanges and yield farming bring trading opportunities to Bitcoin via Stacks."
        }
      ],
      analogy: {
        content: "DeFi is like a trustless financial system where lending, trading, and yield generation happen without intermediaries."
      }
    }
  },
  {
    id: 8,
    title: "Bitcoin Ordinals & NFTs",
    description: "Learn about Bitcoin-native digital artifacts",
    content: {
      introduction: "Ordinals are inscriptions directly on Bitcoin satoshis, creating permanent NFTs. Each satoshi can carry unique data.",
      sections: [
        {
          heading: "Ordinals Inscriptions",
          content: "Ordinals inscribe data directly onto individual satoshis, creating permanent Bitcoin-native NFTs."
        },
        {
          heading: "Permanent Storage",
          content: "Inscriptions are permanent and immutable, stored directly on Bitcoin rather than external systems."
        }
      ],
      analogy: {
        content: "Ordinals are like engraving art directly onto individual satoshis, making each one a permanent NFT on Bitcoin."
      }
    }
  },
  {
    id: 9,
    title: "Wallet Security",
    description: "Master best practices for securing your crypto assets",
    content: {
      introduction: "Wallet security involves proper key management and custody practices. Hardware wallets and multisig provide enhanced security.",
      sections: [
        {
          heading: "Private Keys",
          content: "Wallet security starts with proper key management. Never share your private keys or seed phrases."
        },
        {
          heading: "Hardware and Multisig",
          content: "Hardware wallets provide cold storage. Multisig requires multiple keys for enhanced custody security."
        }
      ],
      analogy: {
        content: "Wallet security is like a vault - hardware gives you a physical safe, multisig requires multiple keys to open."
      }
    }
  },
  {
    id: 10,
    title: "Bitcoin Mining",
    description: "Understand how mining secures the Bitcoin network",
    content: {
      introduction: "Mining secures Bitcoin through proof of work. The difficulty adjusts every 2016 blocks, and rewards halve every 210,000 blocks.",
      sections: [
        {
          heading: "Mining Process",
          content: "Mining involves finding valid proof of work hashes. The difficulty adjusts to maintain consistent block times."
        },
        {
          heading: "Halving and Rewards",
          content: "Bitcoin rewards halve approximately every four years, reducing new supply. The hashrate secures the network."
        }
      ],
      analogy: {
        content: "Mining is like a global lottery where hashrate is tickets - more tickets mean better odds, but the difficulty adjusts to keep the reward constant."
      }
    }
  },
  {
    id: 11,
    title: "Lightning Network",
    description: "Explore Bitcoin's layer 2 for instant payments",
    content: {
      introduction: "Lightning enables instant Bitcoin payments through payment channels. Routing allows payments across the network.",
      sections: [
        {
          heading: "Payment Channels",
          content: "Lightning uses bidirectional payment channels for instant off-chain transactions between parties."
        },
        {
          heading: "Routing Payments",
          content: "Payments can be routed through multiple channels, enabling instant transfers across the Lightning network."
        }
      ],
      analogy: {
        content: "Lightning is like having instant payment channels with everyone - routing finds the fastest path for your payment."
      }
    }
  },
  {
    id: 12,
    title: "Privacy & Bitcoin",
    description: "Learn about privacy techniques for Bitcoin transactions",
    content: {
      introduction: "Privacy techniques like CoinJoin and proper address management help protect user anonymity. Running nodes enhances privacy.",
      sections: [
        {
          heading: "CoinJoin Mixing",
          content: "CoinJoin combines multiple transactions to obscure the link between addresses, enhancing privacy."
        },
        {
          heading: "Address Management",
          content: "Using fresh addresses and running your own node helps maintain privacy and anonymity on Bitcoin."
        }
      ],
      analogy: {
        content: "Privacy is like mixing your coins in a crowd - CoinJoin pools transactions while nodes give you anonymous access."
      }
    }
  },
  {
    id: 13,
    title: "Decentralized Identity",
    description: "Understand user-owned identity and data on Stacks",
    content: {
      introduction: "Stacks enables decentralized identity through names and Gaia storage. Users have sovereign control over their data.",
      sections: [
        {
          heading: "BNS Names",
          content: "Bitcoin Name System provides human-readable identity anchored to Bitcoin, giving users sovereign names."
        },
        {
          heading: "Gaia Storage",
          content: "Gaia is decentralized storage where users control their data. Your identity, your storage, your sovereignty."
        }
      ],
      analogy: {
        content: "Decentralized identity is like owning your name and storage - sovereign control without relying on centralized servers."
      }
    }
  },
  {
    id: 14,
    title: "Governance & Consensus",
    description: "Explore how Bitcoin and Stacks govern themselves",
    content: {
      introduction: "Bitcoin governance happens through consensus among nodes and miners. BIPs propose changes that require community acceptance.",
      sections: [
        {
          heading: "Node Consensus",
          content: "Bitcoin's decentralized governance relies on node operators running the consensus rules they choose."
        },
        {
          heading: "BIPs Process",
          content: "Bitcoin Improvement Proposals (BIPs) provide a formal process for suggesting and implementing protocol changes."
        }
      ],
      analogy: {
        content: "Governance is like a decentralized democracy - nodes vote with their software, and BIPs propose the laws."
      }
    }
  },
  {
    id: 15,
    title: "The Future of Bitcoin",
    description: "Vision for Bitcoin's role in the global economy",
    content: {
      introduction: "Bitcoin's future involves global adoption as property and a settlement layer. Layer 2 solutions expand its capabilities.",
      sections: [
        {
          heading: "Global Adoption",
          content: "Bitcoin is becoming a global reserve asset and property right, recognized by institutions worldwide."
        },
        {
          heading: "Layer 2 Expansion",
          content: "Layer 2 solutions like Stacks and Lightning expand Bitcoin's capabilities while maintaining its security."
        }
      ],
      analogy: {
        content: "Bitcoin's future is like digital gold becoming global property - a settlement layer with expanding capabilities through additional layers."
      }
    }
  }
]
