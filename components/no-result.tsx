import Image from 'next/image'
import React from 'react'

type Props = {}

export default function NoResult({}: Props) {
  return (
    <div className="flex-1 flex flex-col gap-1 justify-center items-center">
      <Image
        className="size-20 object-cover mb-3"
        src="/images/plant.png"
        alt="No data"
        width="200"
        height="300"
        quality="50"
      />
      <h3 className="font-semibold text-primary text-lg">No Data</h3>
      <p className="text-muted-foreground text-sm font-medium">There is no result to show you</p>
    </div>
  )
}