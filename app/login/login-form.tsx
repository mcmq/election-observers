'use client'

import { loginFormSchema } from '@/lib/validations/auth'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'
import { useRedirectAfterLogin } from '@/lib/use-redirect-after-login'

type Props = {}

export default function AdminLoginForm({}: Props) {
  const supabase = createClient()
  const [isLoggingIn, setLoggingIn] = React.useState(false)
  const [error, setError] = React.useState('')
  const redirectAfterLogin = useRedirectAfterLogin()
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      id: '',
      password: ''
    }
  })

  async function formSubmit(values: z.infer<typeof loginFormSchema>) {
    setError('')
    setLoggingIn(true)

    const { data, error: dataError } = await supabase
      .from('users')
      .select()
      .eq('id', values.id)
      .single()

    if (dataError) {
      setLoggingIn(false)
      setError('Invalid login credentials')
      return
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: values.password
    })

    if (signInError) {
      setLoggingIn(false)
      setError(signInError.message)
      return
    }

    redirectAfterLogin()
    setLoggingIn(false)
  }

  return (
    <Form {...form}>
      <form
        className="w-full max-w-sm"
        onSubmit={form.handleSubmit(formSubmit)}
      >
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            {error && <p className="text-sm text-destructive font-medium">{error}</p>}
          </CardHeader>
          <CardContent className="space-y-3">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID No.</FormLabel>
                  <FormControl>
                    <Input placeholder="ID No." {...field} />
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
          </CardContent>
          <CardFooter>
            <Button
              size="lg"
              className="w-full space-x-3"
              disabled={isLoggingIn}
            >
              {isLoggingIn && <Loader2 className="size-4 animate-spin" />}
              <span>Login</span>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}