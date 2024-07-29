'use client'

import { cn } from '@/lib/utils'
import { LayoutDashboard, Loader2, Power, UserPlus2, Users2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Button, buttonVariants } from './ui/button'
import { createClient } from '@/lib/supabase/client'

type Props = {}

const navItems = [
  {
    title: 'Admin Board',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    title: 'Add People',
    href: '/admin/add',
    icon: UserPlus2
  },
  {
    title: 'Observers',
    href: '/admin/observers',
    icon: Users2
  },
  {
    title: 'Admins',
    href: '/admin/users',
    icon: Users2
  },
]

export default function Sidebar({}: Props) {
  const supabase = createClient()
  const [isSigningOut, setSigningOut] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  async function signOut() {
    try {
      setSigningOut(true)
      await supabase.auth.signOut()
      router.replace(`/login?redirect=${pathname}`)
    } catch (error) {

    } finally {
      setSigningOut(false)
    }
  }

  return (
    <aside className="bg-background rounded-lg">
      <nav className="flex flex-col gap-1 p-3">
        <h2 className="font-bold px-2 mb-2">NAVIGATION</h2>
        {navItems.map(item => {
          const Icon = item.icon
          const isAdminBoard = item.href === '/admin'
          const isCurrent = item.href === pathname || (!isAdminBoard && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                  className: 'gap-3 justify-start',
                }),
                isCurrent && "bg-accent pointer-events-none"
              )}
            >
              <Icon className="size-4" />
              <span>{item.title}</span>
            </Link>
          )
        })}
        <Button
          variant="ghost"
          className="gap-3 justify-start"
          onClick={signOut}
        >
          {isSigningOut ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Power className="size-4 text-destructive" />
          )}
          <span>Sign Out</span>
        </Button>
      </nav>
    </aside >
  )
}