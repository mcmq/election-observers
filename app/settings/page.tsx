import BackButton from '@/components/back-button'
import ChangePassword from '@/components/change-password'
import DarkModeToggle from '@/components/dark-mode-toggle'
import { Key } from 'lucide-react'
import React from 'react'

type Props = {}

export default function SettingPage({}: Props) {
  return (
    <div className="container p-4 md:p-6 max-w-screen-sm flex flex-col gap-3 bg-background">
      <div className="flex gap-4 items-center">
        <BackButton />
        <h1 className="font-bold text-xl">Settings</h1>
      </div>
      <section className="flex flex-col gap-4 p-3 rounded-lg">
        <h2 className="text-lg font-semibold">Account</h2>
        <div className="flex items-center gap-3 p-2 bg-background rounded-lg">
          <Key className="size-4" />
          <span className="flex-1 font-semibold">Password</span>
          <ChangePassword />
        </div>
      </section>
      <section className="flex flex-col gap-4 p-3 rounded-lg">
        <h2 className="text-lg font-semibold">Appearance</h2>
        <DarkModeToggle />
      </section>
    </div>
  )
}