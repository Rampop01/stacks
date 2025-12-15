"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { StoneTablet } from "@/components/stone-tablet"
import { FortressButton } from "@/components/fortress-button"
import { TOPICS_DATA } from "@/lib/topics"
import { Suspense } from "react"

function LessonContent() {
  const searchParams = useSearchParams()
  const topicId = Number.parseInt(searchParams.get("topic") || "1")
  const topic = TOPICS_DATA.find((t) => t.id === topicId) || TOPICS_DATA[0]

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a]">
      <div className="absolute inset-0 stone-texture opacity-40" />

      {/* Torch glow */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
        <StoneTablet
          title={topic.title}
          content={
            <>
              <p className="text-lg leading-relaxed mb-6">{topic.content.introduction}</p>

              {topic.content.sections.map((section, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-xl font-bold mb-3 text-primary">{section.heading}</h3>
                  <p className="text-foreground/90 leading-relaxed">{section.content}</p>
                </div>
              ))}

              <div className="border-l-4 border-primary/50 pl-6 my-8 bg-card/30 p-6 rounded-r">
                <h3 className="text-xl font-bold mb-3 text-primary">{topic.content.analogy.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{topic.content.analogy.content}</p>
              </div>

              <div className="bg-card/50 p-6 rounded border border-border mt-8">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rotate-45 bg-primary" />
                  Key Takeaway
                </h3>
                <p className="text-foreground/90 italic">{topic.content.keyTakeaway}</p>
              </div>
            </>
          }
        />

        <div className="flex justify-center mt-12">
          <Link href={`/quest?topic=${topicId}`}>
            <FortressButton size="lg">Enter the Chamber</FortressButton>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function LessonPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LessonContent />
    </Suspense>
  )
}
