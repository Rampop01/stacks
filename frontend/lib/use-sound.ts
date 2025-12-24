'use client'

import { useCallback } from 'react'

export function useSound() {
  const playTone = useCallback((frequency: number, duration: number = 0.1, volume: number = 0.1) => {
    if (typeof window !== 'undefined' && window.AudioContext) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.value = frequency
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration)
      } catch (error) {
        console.debug('Audio context not available')
      }
    }
  }, [])

  const click = useCallback(() => {
    playTone(800, 0.1, 0.1)
  }, [playTone])

  const error = useCallback(() => {
    playTone(200, 0.2, 0.1)
  }, [playTone])

  const success = useCallback(() => {
    playTone(1000, 0.15, 0.1)
    setTimeout(() => playTone(1200, 0.15, 0.1), 100)
  }, [playTone])

  const complete = useCallback(() => {
    playTone(800, 0.1, 0.1)
    setTimeout(() => playTone(1000, 0.1, 0.1), 100)
    setTimeout(() => playTone(1200, 0.2, 0.1), 200)
  }, [playTone])

  const hint = useCallback(() => {
    playTone(600, 0.15, 0.08)
  }, [playTone])

  const unlock = useCallback(() => {
    playTone(600, 0.1, 0.1)
    setTimeout(() => playTone(800, 0.1, 0.1), 80)
    setTimeout(() => playTone(1000, 0.15, 0.1), 160)
  }, [playTone])

  return {
    click,
    error,
    success,
    complete,
    hint,
    unlock,
  }
}
