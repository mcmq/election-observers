import Sidebar from '@/components/sidebar'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="container p-4 max-w-screen-xl min-h-dvh flex flex-col lg:grid lg:grid-cols-[200px_1fr] lg:items-start gap-4">
      <Sidebar />
      <main className="flex-1 flex flex-col bg-background rounded-lg">{children}</main>
    </div>
  )
}