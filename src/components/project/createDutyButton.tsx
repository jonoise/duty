import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const CreateDutyButton = () => {
  const router = useRouter()

  return (
    <Link
      className='px-5 py-1 bg-pink-600 rounded flex items-center space-x-1'
      href={`/project/${router.query.projectId}/duty/new`}
    >
      <p>Create</p>
      <p>duty</p>
    </Link>
  )
}
