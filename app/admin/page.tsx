import { createClient } from '@/lib/supabase/server'
import React from 'react'

type Props = {}

export default async function AdminHomePage({}: Props) {
  const supabase = createClient()

  const { error: observersError, count: observersCount } = await supabase
    .from('users')
    .select('*', { count: 'exact' })
    .eq('role', 'observer')

  const { error: adminsError, count: adminsCount } = await supabase
    .from('users')
    .select('*', { count: 'exact' })
    .eq('role', 'admin')

  return (
    <>
      <section className="p-4">
        <h2 className="font-semibold text-lg">Admin Board</h2>
      </section>
      <section className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 auto-rows-min items-start gap-3">
        <div className="p-4 rounded-lg border">
          <h3 className="text-lg text-primary font-bold">{observersCount}</h3>
          <p className="text-sm font-medium text-muted-foreground">No. Observers</p>
        </div>
        <div className="p-4 rounded-lg border">
          <h3 className="text-lg text-primary font-bold">{adminsCount}</h3>
          <p className="text-sm font-medium text-muted-foreground">No. Admins</p>
        </div>
      </section>
    </>
  )
}