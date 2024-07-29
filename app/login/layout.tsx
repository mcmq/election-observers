import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-dvh flex flex-col">
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  )
}