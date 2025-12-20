# Stacks Quest Smart Contracts

This directory contains the Clarity smart contracts that power the Stacks Quest learning platform on the Stacks blockchain.

## Contracts Overview

### 1. `stacks-quest-progress.clar`
The main progress tracking contract that manages user learning journey.

**Key Features:**
- Track completion status for all 15 topics
- Record quiz scores and attempts
- Enforce sequential topic unlocking (must complete previous topic)
- Validate passing score (70% minimum)
- Maintain leaderboard data
- Check "Fortress Master" status (all topics completed)

**Main Functions:**
- `start-quest()` - Initialize user progress when entering fortress
- `record-quiz-attempt(topic-id, score)` - Record quiz results and update completion
- `complete-word-hunt(topic-id)` - Track word hunt engagement
- `get-topic-progress(user, topic-id)` - View progress for specific topic
- `get-user-progress(user)` - View overall user progress
- `is-topic-unlocked(user, topic-id)` - Check if topic is accessible
- `is-fortress-master(user)` - Check if user completed all topics

**Data Structures:**
```clarity
user-topic-completion {
  completed: bool,
  completion-time: uint,
  quiz-score: uint,
  attempts: uint
}

user-progress {
  topics-completed: uint,
  total-score: uint,
  quest-started: uint,
  last-active: uint,
  fortress-master: bool
}
