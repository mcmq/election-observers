'use client'

import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { buttonVariants } from './ui/button'
import { Moon, Sun } from 'lucide-react'
import { Switch } from './ui/switch'
import { useTheme } from 'next-themes'

type Props = {}

export default function DarkModeToggle({}: Props) {
  const [checked, setChecked] = useState<boolean>()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setChecked(theme === 'dark')
  }, [theme])

  return (
    <div className="flex items-center gap-3 p-2 bg-background rounded-lg">
      <Moon className="block size-4 dark:hidden" />
      <Sun className="hidden size-4 dark:block" />
      <span className="flex-1 font-semibold">Dark Mode</span>
      <Switch
        checked={checked}
        onCheckedChange={checked => setTheme(checked ? 'dark' : 'light')}
      />
    </div>
  )
}