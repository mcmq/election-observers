import React from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import NoResult from '@/components/no-result'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import DeleteUser from '@/components/delete-user'

type Props = {}

export default async function AdminsPage({}: Props) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('role', 'admin')

  if (error) {
    console.log(error)
  }

  return (
    <>
      <section className="sticky top-0 p-4 flex justify-between items-center gap-3">
        <h2 className="font-semibold text-lg">Admins</h2>
        <Link
          href="/admin/add"
          className={cn(
            buttonVariants()
          )}
        >
          Add Admin
        </Link>
      </section>
      <section className="flex-1 p-4 flex flex-col">
        {(!data || !data.length) ? (
          <NoResult />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email Address</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(admin => (
                <TableRow key={admin.id}>
                  <TableCell>{admin.id}</TableCell>
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.phone}</TableCell>
                  <TableCell className="space-x-2 text-right">
                    <DeleteUser id={admin.user_id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>
    </>
  )
}