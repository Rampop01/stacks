# Stacks Quest Smart Contracts

This directory contains the Clarity smart contracts that power the Stacks Quest learning platform on the Stacks blockchain. These contracts handle user progress tracking, achievement NFTs, and learning path management.

## 📜 Contracts Overview

### 1. `stacks-quest-progress.clar`
The core contract that manages user learning progress and topic completion.

#### 🎯 Key Features
- **Progress Tracking**: Monitor completion status for all 15 learning topics
- **Quiz Management**: Record scores and attempts for each quiz
- **Sequential Unlocking**: Enforce topic dependencies (must complete previous topics)
- **Achievement Validation**: Ensure minimum passing score (70%) for progression
- **Leaderboard**: Maintain and update user rankings
- **Fortress Master**: Track completion of all topics

#### 🛠️ Main Functions
- `(start-quest)` - Initialize user's learning journey
- `(record-quiz-attempt topic-id score)` - Log quiz results and update completion status
- `(complete-word-hunt topic-id)` - Track engagement with interactive word hunts
- `(get-topic-progress user topic-id)` - Retrieve progress for a specific topic
- `(get-user-progress user)` - Get comprehensive progress overview
- `(is-topic-unlocked user topic-id)` - Verify topic accessibility
- `(is-fortress-master user)` - Check if user has completed all topics

#### 📊 Data Structures
```clarity
;; User progress for a specific topic
(define-map topic-progress {
    user: principal,
    topic-id: uint
  } {
    completed: bool,
    completion-time: uint,
    quiz-score: uint,
    attempts: uint
  })

;; Overall user progress
(define-map user-progress {
    user: principal
  } {
    topics-completed: uint,
    total-score: uint,
    quest-started: uint,
    last-active: uint,
    fortress-master: bool
  })
```

### 2. `stacks-quest-nft.clar`
NFT contract for awarding achievements and recognizing learning milestones.

#### 🏆 Key Features
- **Achievement NFTs**: Unique tokens for topic completion
- **Fortress Master NFT**: Special NFT for completing all topics
- **Metadata Support**: Rich metadata for each achievement
- **Ownership Tracking**: Secure NFT ownership management

#### 🎨 Main Functions
- `(mint-topic-nft topic-id)` - Mint NFT for completing a topic
- `(mint-fortress-master-nft)` - Award special NFT for completing all topics
- `(get-token-uri token-id)` - Retrieve metadata URI for an NFT
- `(get-owner token-id)` - Check NFT ownership
- `(transfer to token-id)` - Transfer NFT to another user

#### 🖼️ NFT Metadata
Each NFT includes:
- Unique name based on achievement
- Description of the accomplishment
- Image URL for visual representation
- Timestamp of achievement
- Rarity level

## 🚀 Deployment

### Prerequisites
- [Clarinet](https://docs.hiro.so/smart-contracts/clarinet) installed
- Stacks testnet account with STX
- [Hiro Wallet](https://www.hiro.so/wallet) for interaction

### Deployment Steps

1. **Setup Clarinet**
   ```bash
   clarinet new my-project
   cd my-project
   ```

2. **Add Contracts**
   ```bash
   mkdir -p contracts/stacks-quest
   cp stacks-quest-*.clar contracts/stacks-quest/
   ```

3. **Configure Deployment**
   Update `settings/Devnet.toml` with your deployment settings.

4. **Deploy to Testnet**
   ```bash
   clarinet deployments apply -p testnet
   ```

## 🛡️ Security Considerations

### Access Control
- Contract owner has administrative privileges
- Critical functions are protected with authorization checks
- User-specific operations require sender verification

### Error Handling
- Comprehensive error codes for all failure cases
- Input validation for all public functions
- Clear error messages for debugging

### Testing
1. **Unit Tests**
   ```bash
   clarinet test
   ```

2. **Integration Tests**
   - Test topic progression
   - Verify quiz score validation
   - Check NFT minting conditions
   - Test access control restrictions

## 📚 Contract Architecture

### Data Flow
1. User starts quest → `start-quest()`
2. Completes topic → `record-quiz-attempt()`
3. System validates score → Updates progress
4. On completion → Mints achievement NFT
5. Final topic completion → Mints Fortress Master NFT

### Storage Layout
- User progress maps (principal → progress)
- Topic completion records
- NFT ownership registry
- Achievement metadata

## 🤝 Integration

### Frontend Integration
```typescript
// Example: Checking topic progress
const progress = await callReadOnlyFunction({
  contractAddress: contractAddress,
  contractName: "stacks-quest-progress",
  functionName: "get-topic-progress",
  args: [principalCV(userAddress), uintCV(topicId)],
  network: network,
  senderAddress: userAddress
});
```

### Event Handling
- `topic-completed`: Emitted when a topic is completed
- `nft-minted`: Triggered on new achievement NFT
- `fortress-master-achieved`: When user completes all topics

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Stacks](https://www.stacks.co/) for the blockchain infrastructure
- [Clarity](https://clarity-lang.org/) for secure smart contract language
- [Hiro](https://www.hiro.so/) for development tools and documentation
