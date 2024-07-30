import Sidebar from '@/components/sidebar'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex-1 container p-4 max-w-screen-xl flex flex-col lg:grid lg:grid-cols-[250px_1fr] lg:items-start gap-4">
      <Sidebar />
      <main className="self-stretch flex flex-col bg-background rounded-lg">{children}</main>
    </div>
  )
}