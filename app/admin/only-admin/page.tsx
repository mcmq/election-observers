import Image from 'next/image'
import React from 'react'

type Props = {}

export default function OnlyAdminPage({}: Props) {
  return (
    <>
      <section className="flex-1 flex flex-col gap-1 justify-center items-center p-4">
        <Image
          className="size-20 object-cover mb-3"
          src="/images/private.png"
          alt="No data"
          width="200"
          height="300"
          quality="50"
        />
        <p className="text-sm font-medium">Only admins can access this page.</p>
      </section>
    </>
  )
}