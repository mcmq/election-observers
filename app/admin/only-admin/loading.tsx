import { Loader2 } from 'lucide-react'
import React from 'react'

type Props = {}

export default function LoadingPage({}: Props) {
  return (
    <div className="flex-1 grid place-content-center">
      <Loader2 className="size-12 animate-spin" />
    </div>
  )
}