'use client'

import { CalendarIcon, Loader2, User2 } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newUserFormSchema } from '@/lib/validations/auth'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MyToaster } from '@/lib/my-toaster'
import { createClient } from '@/lib/supabase/client'

type Props = {}

export default function AddPeoplePage({}: Props) {
  const supabase = createClient()
  const [error, setError] = useState('')
  const [preview, setPreview] = useState('')
  const [isRegistering, setRegistering] = useState(false)

  const form = useForm<z.infer<typeof newUserFormSchema>>({
    resolver: zodResolver(newUserFormSchema),
    defaultValues: {
      id: '',
      name: '',
      pob: '',
      image: undefined,
      email: '',
      phone: '',
      role: '',
      password: ''
    }
  })

  async function registerObserver(values: z.infer<typeof newUserFormSchema>) {
    const { id, name, image, pob, dob, email, phone, role, password } = values
    try {
      setRegistering(true)
      setError('')
      console.log(image)
      const res = await fetch('/api/register-user', {
        method: 'POSt',
        body: JSON.stringify({ phone, email, password, name, role })
      })
      const { user_id, error } = await res.json()

      if (error) {
        setError(error)
        MyToaster.error(error)
        return
      }

      if (image) {
        const filename = `${user_id}.${image.name.split('.').at(-1)}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filename, image, { contentType: image.type })
        if (uploadError) {
          MyToaster.error(uploadError.message)
          return
        }

        const { error: insertError } = await supabase.from('users').insert({
          id,
          user_id,
          name,
          phone,
          role,
          pob,
          dob,
          email,
          image: uploadData.path
        })
        if (insertError) {
          MyToaster.error(insertError.message)
          return
        }
      }

      MyToaster.success('Registered successfully.')
      setPreview('')
      form.reset()
    } catch (error) {
      setError((error as any).message)
    } finally {
      setRegistering(false)
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    form.clearErrors('image')
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    const fileType = selectedFile.type
    if (!fileType.startsWith('image/')) {
      form.setError('image', {
        message: 'Only image files are allowed!'
      })
      return
    }


    form.setValue('image', selectedFile)
    const reader = new FileReader()
    reader.onloadend = () => {
      if (reader.result) {
        setPreview(reader.result.toString())
      }
    }
    reader.readAsDataURL(selectedFile)
  }

  return (
    <>
      <section className="p-4 flex justify-between items-center gap-3">
        <h2 className="font-semibold text-lg">Add People</h2>
      </section>
      <section className="flex-1 p-4 mx-auto">
        <Form {...form}>
          <form className="grid grid-cols-2 gap-3" onSubmit={form.handleSubmit(registerObserver)}>
            <div className="col-span-full flex flex-col items-center gap-3">
              <Avatar className="size-24">
                <AvatarImage src={preview} />
                <AvatarFallback>
                  <User2 className="size-6 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <div className="relative flex flex-col items-center">
                <Button type="button" variant="outline">Upload Image</Button>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Upload Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          className="absolute z-50 left-0 top-0 w-full h-full opacity-0"
                          onChange={handleImageChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {error && <p className="col-span-full text-sm font-medium text-destructive">{error}</p>}
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input placeholder="ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place of Birth</FormLabel>
                  <FormControl>
                    <Input placeholder="Place of Birth" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end">
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+252 63 -------" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="observer">Observer</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="col-span-full space-x-3 ml-auto mt-4"
              disabled={isRegistering}
            >
              {isRegistering && <Loader2 className="size-4 animate-spin" />}
              <span>Register</span>
            </Button>
          </form>
        </Form>
      </section>
    </>
  )
}