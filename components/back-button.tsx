'use client'

import React from 'react'
import { Button } from './ui/button'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {}

export default function BackButton({}: Props) {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="gap-3"
      onClick={router.back}
    >
      <ChevronLeft className="size-4" />
    </Button>
  )
}