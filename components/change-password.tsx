'use client'

import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { MyToaster } from '@/lib/my-toaster'
import { createClient } from '@/lib/supabase/client'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { changePasswordSchema } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'

type Props = {}

export default function ChangePassword({}: Props) {
  const supabase = createClient()
  const [isOpen, setOpen] = useState<boolean>()
  const [isChanging, setChanging] = useState(false)

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      passowrd: '',
      confirm: ''
    }
  })

  async function changePassword(values: z.infer<typeof changePasswordSchema>) {
    try {
      setChanging(true)
      await supabase.auth.updateUser({ password: values.passowrd })
      setOpen(false)
      form.reset()
    } catch (error) {
      MyToaster.error((error as any)?.message)
    } finally {
      setChanging(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Change</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(changePassword)}>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>You will never has access to you account if you forget your password.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="passowrd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter confirm password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                className="space-x-3"
                disabled={isChanging}
              >
                {isChanging && <Loader2 className="size-4 animate-spin" />}
                <span>Change</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}