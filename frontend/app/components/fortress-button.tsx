"use client"

import type React from "react"

import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"
import { useSound } from "@/lib/use-sound"

interface FortressButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
  size?: "default" | "lg"
}

export const FortressButton = forwardRef<HTMLButtonElement, FortressButtonProps>(
  ({ className, variant = "default", size = "default", children, onClick, ...props }, ref) => {
    const sounds = useSound()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!props.disabled) {
        sounds.click()
        onClick?.(e)
      }
    }

    return (
      <button
        ref={ref}
        className={cn(
          "relative overflow-hidden font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
          "before:absolute before:inset-0 before:stone-texture before:opacity-30",
          "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent",
          "hover:scale-105 hover:shadow-xl active:scale-95",
          variant === "default" && [
            "bg-gradient-to-b from-primary via-primary to-primary/80 text-primary-foreground",
            "border-2 border-primary/50",
            "shadow-lg shadow-primary/20",
            "hover:shadow-primary/40",
          ],
          variant === "outline" && ["bg-transparent text-primary", "border-2 border-primary", "hover:bg-primary/10"],
          size === "default" && "px-8 py-3 text-sm",
          size === "lg" && "px-12 py-4 text-base",
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    )
  },
)

FortressButton.displayName = "FortressButton"
