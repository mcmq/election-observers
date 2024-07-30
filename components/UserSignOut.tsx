'use client'

import React, { useState } from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { Button } from './ui/button'
import { ChevronRight, Loader2, Power } from 'lucide-react'
import { MyToaster } from '@/lib/my-toaster'
import { createClient } from '@/lib/supabase/client'

type Props = {}

export default function UserSignOut({}: Props) {
  const supabase = createClient()
  const [isOpen, setOpen] = useState<boolean>()
  const [isSigningOut, setSigningOut] = useState(false)

  async function signOut() {
    try {
      setSigningOut(true)
      await supabase.auth.signOut()
      setOpen(false)
    } catch (error) {
      MyToaster.error((error as any)?.message)
    } finally {
      setSigningOut(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="justify-between"
        >
          <div className="flex gap-3 items-center">
            <Power className="size-4 text-destructive" />
            <span>Sign Out</span>
          </div>
          <ChevronRight className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign Out</AlertDialogTitle>
          <AlertDialogDescription>Are you sure?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={signOut}
            disabled={isSigningOut}
          >
            {isSigningOut && <Loader2 className="size-4 animate-spin" />}
            <span>Yes, Sign Out</span>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}