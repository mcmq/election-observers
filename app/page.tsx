import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import UserSignOut from '@/components/UserSignOut'
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
    <div className="p-4">
      <section className="container flex flex-col items-center p-4 max-w-screen-lg rounded-lg bg-background">
        <Avatar className="size-24">
          <AvatarImage src={publicUrl || ''} />
          <AvatarFallback>
            <User2 className="size-10 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-semibold">{user?.user_metadata.name}</h3>
        <p className="text-sm text-muted-foreground font-medium">{user?.email}</p>
      </section>
      <section className="container grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-screen-lg rounded-lg bg-background">
        <div className="flex flex-col gap-1 border p-4 rounded-lg">
          <p className="text-lg font-semibold">{userData?.phone}</p>
          <h4 className="font-medium text-sm text-muted-foreground">Phone Number</h4>
        </div>
        <div className="flex flex-col gap-1 border p-4 rounded-lg">
          <p className="text-lg font-semibold">{userData?.pob}</p>
          <h4 className="font-medium text-sm text-muted-foreground">Place of Birth</h4>
        </div>
        <div className="flex flex-col gap-1 border p-4 rounded-lg">
          <p className="text-lg font-semibold">{userData?.dob}</p>
          <h4 className="font-medium text-sm text-muted-foreground">Date of Birth</h4>
        </div>
      </section>
      <section className="container my-2 flex flex-col gap-2 md:grid md:grid-cols-2 items-center p-4 max-w-screen-lg rounded-lg bg-background">
        <Link
          href="/settings"
          className={cn(
            buttonVariants({
              variant: 'outline',
              size: 'lg',
              className: 'justify-between'
            })
          )}
        >
          <div className="flex gap-3 items-center">
            <Settings className="size-4" />
            <span>Settings</span>
          </div>
          <ChevronRight className="size-4" />
        </Link>
        <UserSignOut />
      </section>
    </div>
  )
}