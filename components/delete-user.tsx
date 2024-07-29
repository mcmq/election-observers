'use client'

import React, { useState } from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { Button } from './ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import { MyToaster } from '@/lib/my-toaster'

type Props = {
  id: string
}

export default function DeleteUser({ id }: Props) {
  const [isDeleting, setDeleting] = useState(false)
  const [isOpen, setOpen] = useState<boolean>()

  async function deleteUser() {
    try {
      setDeleting(true)
      const res = await fetch('/api/delete-user', {
        method: 'POST',
        body: JSON.stringify({ id })
      })
      const { message, error } = await res.json()
      if (error) {
        MyToaster.error(error)
        return
      }

      MyToaster.success(message)
      setOpen(false)
    } catch (error) {

    } finally {
      setDeleting(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
        >
          <Trash2 className="size-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete user</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <Button
            variant="destructive"
            className="space-x-3"
            onClick={deleteUser}
            disabled={isDeleting}
          >
            {isDeleting && <Loader2 className="size-4 animate-spin" />}
            <span>Delete</span>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}