import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import UserSignOut from '@/components/user-sign-out'
import { createClient } from '@/lib/supabase/server'
import { cn } from '@/lib/utils'
import { ChevronRight, Settings, User2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default async function UserProfile({}: Props) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: userData } = await supabase
    .from('users')
    .select()
    .limit(1)
    .eq('user_id', user?.id)
    .single()

  const { data: { publicUrl } } = supabase
    .storage
    .from('avatars')
    .getPublicUrl(userData?.image || '')

  return (
    <div className="container p-4 max-w-screen-xl flex flex-col lg:grid lg:grid-cols-[250px_1fr] gap-3">
      <aside className="flex flex-col gap-2 p-4 bg-background lg:border-r lg:dark:border-r-2">
        <Link
          href="/settings"
          className={cn(
            buttonVariants({
              variant: 'outline',
              className: 'gap-3 justify-start'
            })
          )}
        >
          <Settings className="size-4" />
          <span>Settings</span>
        </Link>
        <UserSignOut />
      </aside>
      <section className="container grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-lg bg-background">
        <div className="col-span-full place-self-center text-center flex flex-col gap-1">
          <Avatar className="size-24">
            <AvatarImage src={publicUrl || ''} />
            <AvatarFallback>
              <User2 className="size-10 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold">{userData?.name}</h3>
          <p className="text-sm text-muted-foreground font-medium">{userData?.title}</p>
        </div>
        <div className="flex flex-col gap-1 border p-4 rounded-lg">
          <p className="text-lg md:text-base font-semibold">{userData?.email}</p>
          <h4 className="font-medium text-sm text-muted-foreground">Email Address</h4>
        </div>
        <div className="flex flex-col gap-1 border p-4 rounded-lg">
          <p className="text-lg md:text-base font-semibold">{userData?.phone}</p>
          <h4 className="font-medium text-sm text-muted-foreground">Phone Number</h4>
        </div>
        <div className="flex flex-col gap-1 border p-4 rounded-lg">
          <p className="text-lg md:text-base font-semibold">{userData?.district}</p>
          <h4 className="font-medium text-sm text-muted-foreground">District</h4>
        </div>
        <div className="flex flex-col gap-1 border p-4 rounded-lg">
          <p className="text-lg md:text-base font-semibold">{userData?.region}</p>
          <h4 className="font-medium text-sm text-muted-foreground">Region</h4>
        </div>
        <div className="flex flex-col gap-1 border p-4 rounded-lg">
          <p className="text-lg md:text-base font-semibold">{userData?.dor}</p>
          <h4 className="font-medium text-sm text-muted-foreground">Date of Register</h4>
        </div>
      </section>
    </div>
  )
}