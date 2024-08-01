import React from 'react'
import { buttonVariants } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { createClient } from '@/lib/supabase/server'
import NoResult from '@/components/no-result'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import DeleteUser from '@/components/delete-user'
import Search from './search'

type Props = {
  searchParams: {
    id: string
  }
}

export default async function ObserversPage({ searchParams: { id } }: Props) {
  const supabase = createClient()
  let query = supabase.from('users').select()

  if (id) {
    query = query.textSearch('id', `'${id}'`)
  } else {
    query = query.eq('role', 'observer')
  }

  const { data, error } = await query
  if (error) {
    console.log(error)
  }

  return (
    <>
      <section className="sticky top-0 p-4 flex justify-between items-center gap-3">
        <h2 className="font-semibold text-lg">Observers List</h2>
        <div className="flex items-center gap-3">
          <Search />
          <Link
            href="/admin/add"
            className={cn(
              buttonVariants()
            )}
          >
            Add Observer
          </Link>
        </div>
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
              {data.map(observer => (
                <TableRow key={observer.id}>
                  <TableCell>{observer.id}</TableCell>
                  <TableCell>{observer.name}</TableCell>
                  <TableCell>{observer.email}</TableCell>
                  <TableCell>{observer.phone}</TableCell>
                  <TableCell className="space-x-2 text-right">
                    <DeleteUser id={observer.user_id} />
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