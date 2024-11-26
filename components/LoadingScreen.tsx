'use client'

import { useEffect, useState } from 'react'
import { Hourglass } from "lucide-react"
import { useTheme } from 'next-themes'
import { useLanguage } from '@/context/language-context'

export function LoadingScreen() {
  const [show, setShow] = useState(true)
  const { theme } = useTheme()
  const { language } = useLanguage()

  // Reset animation whenever theme or language changes
  useEffect(() => {
    setShow(true)
    
    const timer = setTimeout(() => {
      setShow(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [theme, language]) // Trigger on theme or language change

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="relative h-24 w-24">
        <div className="animate-spin rounded-full h-full w-full border-t-2 border-b-2 border-primary" />
        <div className="absolute ease-in-out inset-0 flex items-center justify-center">
          <Hourglass className="h-8 w-8 text-primary" />
        </div>
      </div>
    </div>
  )
}