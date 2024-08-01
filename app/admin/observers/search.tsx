'use client'

import { Input } from '@/components/ui/input'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

export default function Search({}: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('id', term)
    } else {
      params.delete('id')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Input
      placeholder="Search ID"
      defaultValue={searchParams.get('id')?.toString()}
      onChange={e => handleSearch(e.target.value)}
      className="w-max"
    />
  )
}