import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const CreateDutyButton = () => {
  const router = useRouter()

  return (
    <Link href={`/project/${router.query.projectId}/duty/new`}>
      <button className='px-5 py-1 bg-sky-600 rounded'>Create duty</button>
    </Link>
  )
}
