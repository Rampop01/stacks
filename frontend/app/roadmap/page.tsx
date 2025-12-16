"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FortressButton } from "@/components/fortress-button"
import { Lock, CheckCircle2 } from "lucide-react"
import { TOPICS_DATA } from "@/lib/topics"

export default function RoadmapPage() {
  const [completedTopics, setCompletedTopics] = useState<number[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("stacksquest_completed")
    if (saved) {
      setCompletedTopics(JSON.parse(saved))
    }
  }, [])

  const isTopicUnlocked = (topicId: number) => {
    if (topicId === 1) return true
    return completedTopics.includes(topicId - 1)
  }

  const isTopicCompleted = (topicId: number) => {
    return completedTopics.includes(topicId)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a]">
      <div className="absolute inset-0 stone-texture opacity-40" />

      {/* Torch glows */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="w-3 h-3 rotate-45 border-2 border-primary" />
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-engraved">The Path of Knowledge</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Master each chamber to unlock the next. Complete all trials to earn your seal.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-card/30 border border-border rounded-lg p-6 mb-12 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">Your Progress</h2>
            <div className="text-4xl font-bold text-primary">
              {completedTopics.length}/{TOPICS_DATA.length}
            </div>
          </div>
          <div className="h-3 bg-stone rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-torch to-primary transition-all duration-1000"
              style={{ width: `${(completedTopics.length / TOPICS_DATA.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-6">
          {TOPICS_DATA.map((topic, index) => {
            const unlocked = isTopicUnlocked(topic.id)
            const completed = isTopicCompleted(topic.id)

            return (
              <div key={topic.id} className={`relative group ${unlocked ? "opacity-100" : "opacity-50"}`}>
                {/* Connection line */}
                {index < TOPICS_DATA.length - 1 && (
                  <div className="absolute left-1/2 top-full h-6 w-0.5 bg-border -translate-x-1/2 z-0" />
                )}

                <div
                  className={`relative bg-card/40 border-2 rounded-lg p-6 md:p-8 backdrop-blur-sm transition-all duration-300 ${
                    unlocked ? "border-border hover:border-primary/50 hover:bg-card/60" : "border-border/30"
                  }`}
                >
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full border-2 flex items-center justify-center text-3xl md:text-4xl transition-all ${
                        completed
                          ? "border-primary bg-primary/10"
                          : unlocked
                            ? "border-border bg-stone/20"
                            : "border-border/30 bg-background/50"
                      }`}
                    >
                      {completed ? (
                        <CheckCircle2 className="w-8 h-8 text-primary" />
                      ) : unlocked ? (
                        "⚡"
                      ) : (
                        <Lock className="w-8 h-8 text-muted-foreground/50" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
                            Chamber {topic.id}
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{topic.title}</h3>
                          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                            {topic.description}
                          </p>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="mt-6">
                        {completed ? (
                          <div className="flex items-center gap-2 text-primary">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="font-semibold">Completed</span>
                          </div>
                        ) : unlocked ? (
                          <Link href={`/lesson?topic=${topic.id}`}>
                            <FortressButton>Begin Journey</FortressButton>
                          </Link>
                        ) : (
                          <div className="flex items-center gap-2 text-muted-foreground/50">
                            <Lock className="w-5 h-5" />
                            <span className="font-semibold">Locked - Complete previous chamber</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Completion message */}
        {completedTopics.length === TOPICS_DATA.length && (
          <div className="mt-12 text-center">
            <div className="bg-primary/10 border-2 border-primary rounded-lg p-8">
              <h2 className="text-3xl font-bold text-primary mb-4">All Chambers Conquered!</h2>
              <p className="text-lg text-foreground/90 mb-6">You have mastered the knowledge of Bitcoin and Stacks.</p>
              <Link href="/complete">
                <FortressButton size="lg">View Your Achievements</FortressButton>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
