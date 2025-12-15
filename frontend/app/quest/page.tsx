"use client"

import { useState, Suspense, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { FortressButton } from "@/components/fortress-button"
import { TOPICS_DATA } from "@/lib/topics"
import { Search, Eye } from "lucide-react"
import { useSound } from "@/lib/use-sound"

function QuestContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const topicId = Number.parseInt(searchParams.get("topic") || "1")
  const topic = TOPICS_DATA.find((t) => t.id === topicId) || TOPICS_DATA[0]
  const sounds = useSound()

  const [foundWords, setFoundWords] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState("")
  const [feedback, setFeedback] = useState("")
  const [completed, setCompleted] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [activeWall, setActiveWall] = useState(0)

  const extractKeyTerms = () => {
    // Manually curated core terms based on topic content
    const coreTermsByTopic: Record<number, string[]> = {
      1: ["BITCOIN", "SCARCITY", "DECENTRALIZED", "PROOF", "MINING"],
      2: ["STACKS", "SMART", "CONTRACTS", "BITCOIN", "FINALITY"],
      3: ["CLARITY", "DECIDABLE", "SECURITY", "REENTRANCY", "READABLE"],
      4: ["TRANSFER", "CONSENSUS", "STACKING", "MINERS", "REWARDS"],
      5: ["CLARINET", "DEVELOPMENT", "TOOLS", "HIRO", "BUILDING"],
      6: ["NAKAMOTO", "SBTC", "FAST", "FINALITY", "BITCOIN"],
      7: ["DEFI", "LENDING", "TRADING", "YIELD", "TRUSTLESS"],
      8: ["ORDINALS", "INSCRIPTIONS", "SATOSHI", "PERMANENT", "NFTS"],
      9: ["WALLET", "KEYS", "CUSTODY", "HARDWARE", "MULTISIG"],
      10: ["MINING", "HALVING", "DIFFICULTY", "REWARD", "HASHRATE"],
      11: ["LIGHTNING", "CHANNELS", "INSTANT", "ROUTING", "PAYMENTS"],
      12: ["PRIVACY", "COINJOIN", "ADDRESSES", "ANONYMOUS", "NODES"],
      13: ["IDENTITY", "NAMES", "GAIA", "STORAGE", "SOVEREIGN"],
      14: ["GOVERNANCE", "CONSENSUS", "NODES", "BIPS", "DECENTRALIZED"],
      15: ["FUTURE", "ADOPTION", "LAYER", "PROPERTY", "GLOBAL"],
    }

    return coreTermsByTopic[topicId] || ["BITCOIN", "STACKS", "SMART", "CONTRACTS", "LAYER"]
  }

  const targetWords = extractKeyTerms()

  const createWallInscriptions = () => {
    const lessonText = [
      topic.content.introduction,
      ...topic.content.sections.map((s) => s.heading + " " + s.content),
      topic.content.analogy.content,
    ].join(" ")

    const sentences = lessonText.split(/[.!?]+/).filter((s) => s.trim().length > 20)

    // Distribute sentences across 4 walls
    const wallCount = 4
    const walls = Array.from({ length: wallCount }, () => [] as string[])

    sentences.forEach((sentence, idx) => {
      walls[idx % wallCount].push(sentence.trim())
    })

    return walls
  }

  const wallInscriptions = createWallInscriptions()
  const wallNames = ["North Wall", "East Wall", "South Wall", "West Wall"]

  const checkWord = () => {
    const guess = currentGuess.toUpperCase().trim()

    if (!guess) {
      sounds.error()
      setFeedback("Enter a word you found inscribed on the walls!")
      return
    }

    if (foundWords.includes(guess)) {
      sounds.error()
      setFeedback("You already discovered that word!")
      return
    }

    if (targetWords.includes(guess)) {
      sounds.success()
      const newFound = [...foundWords, guess]
      setFoundWords(newFound)
      setFeedback(`Inscribed! "${guess}" revealed! (${newFound.length}/${targetWords.length})`)
      setCurrentGuess("")

      if (newFound.length === targetWords.length) {
        setTimeout(() => {
          sounds.complete()
          setCompleted(true)
        }, 1000)
      }
    } else {
      sounds.error()
      setFeedback(`"${guess}" is not one of the sacred key terms. Search the walls more carefully!`)
    }
  }

  const showHint = () => {
    const remainingWords = targetWords.filter((w) => !foundWords.includes(w))
    if (remainingWords.length > 0 && hintsUsed < 3) {
      sounds.hint()
      const hintWord = remainingWords[0]
      const firstLetters = hintWord.substring(0, Math.ceil(hintWord.length / 2))
      setFeedback(`Hint ${hintsUsed + 1}/3: Look for "${firstLetters}..." (${hintWord.length} letters total)`)
      setHintsUsed(hintsUsed + 1)
    }
  }

  // Check quest completion status
  useEffect(() => {
    const questCompleted = localStorage.getItem(`quest_completed_${topicId}`)
    if (questCompleted === "true") {
      setCompleted(true)
      setFoundWords(targetWords)
    }
  }, [topicId])

  // Save quest completion
  useEffect(() => {
    if (completed && foundWords.length === targetWords.length) {
      localStorage.setItem(`quest_completed_${topicId}`, "true")
      sounds.unlock()
    }
  }, [completed, foundWords.length, targetWords.length, topicId])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a]">
      <div className="absolute inset-0 stone-texture opacity-40" />

      <div className="absolute top-1/4 left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/4 right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-card/50 border border-border rounded p-6 mb-8 backdrop-blur-sm">
              <div className="mb-4">
                <Link href={`/lesson?topic=${topicId}`} className="text-sm text-primary hover:underline">
                  ← Return to Lesson
                </Link>
              </div>

              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-stone/30 border-2 border-border rounded-full mb-4">
                  <Search className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-3">The Chamber of Inscriptions</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Explore the four walls of this ancient chamber. Five sacred key terms from your lesson are inscribed
                  in the stone. Find all {targetWords.length} words to unlock the trial gate.
                </p>
              </div>

              {/* Progress indicator */}
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Words Discovered</span>
                  <span className="text-primary font-bold text-lg">
                    {foundWords.length} / {targetWords.length}
                  </span>
                </div>
                <div className="w-full bg-border rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-primary via-torch to-primary h-4 rounded-full transition-all duration-500"
                    style={{ width: `${(foundWords.length / targetWords.length) * 100}%` }}
                  />
                </div>
              </div>

              {!completed && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Eye className="w-5 h-5 text-primary" />
                      Examine the Walls
                    </h3>
                  </div>

                  {/* Wall selector */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                    {wallNames.map((wallName, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          sounds.click()
                          setActiveWall(idx)
                        }}
                        className={`px-4 py-3 rounded border-2 font-semibold transition-all ${
                          activeWall === idx
                            ? "bg-primary/20 border-primary text-primary"
                            : "bg-card border-border text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {wallName}
                      </button>
                    ))}
                  </div>

                  <div className="bg-stone/20 border-2 border-border rounded-lg p-6 max-h-96 overflow-y-auto">
                    <div className="text-sm uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                      <div className="h-px flex-1 bg-border" />
                      <span>{wallNames[activeWall]}</span>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    <div className="space-y-4">
                      {wallInscriptions[activeWall].map((inscription, idx) => (
                        <div
                          key={idx}
                          className="text-foreground/90 leading-relaxed text-base p-4 bg-background/30 rounded border border-border/50"
                        >
                          {inscription}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Found words display */}
              <div className="mb-8">
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Discovered Words</h3>
                <div className="flex flex-wrap gap-2">
                  {foundWords.map((word) => (
                    <div
                      key={word}
                      className="px-4 py-2 bg-primary/20 border-2 border-primary rounded text-primary font-bold"
                    >
                      {word}
                    </div>
                  ))}
                  {Array.from({ length: targetWords.length - foundWords.length }).map((_, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 border-2 border-dashed border-border rounded text-muted-foreground/30"
                    >
                      ???
                    </div>
                  ))}
                </div>
              </div>

              {!completed && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentGuess}
                      onChange={(e) => setCurrentGuess(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && checkWord()}
                      placeholder="Type a sacred word from the walls..."
                      className="flex-1 px-4 py-3 bg-background border-2 border-border rounded focus:border-primary outline-none text-lg uppercase"
                      disabled={completed}
                    />
                    <FortressButton onClick={checkWord} disabled={completed}>
                      Submit
                    </FortressButton>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={showHint}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={hintsUsed >= 3 || completed}
                    >
                      Request Guidance ({hintsUsed}/3 hints used)
                    </button>

                    {feedback && (
                      <div
                        className={`text-sm font-medium ${
                          feedback.includes("Inscribed") || feedback.includes("revealed")
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {feedback}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Completion message */}
              {completed && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/20 border-4 border-primary rounded-full mb-6 animate-pulse">
                    <div className="w-12 h-12 bg-primary rounded-full" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-3">Chamber Unsealed!</h3>
                  <p className="text-muted-foreground text-lg mb-8">
                    You have discovered all the sacred inscriptions. The trial gate now opens before you.
                  </p>
                  <Link href={`/trial?topic=${topicId}`}>
                    <FortressButton size="lg">Enter the Trial Chamber →</FortressButton>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function QuestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuestContent />
    </Suspense>
  )
}
