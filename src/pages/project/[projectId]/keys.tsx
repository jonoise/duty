import { MainLayout } from '@/components/layouts/main'
import ProjectLinksSubnavbar from '@/components/project/LinksSubnavbar'
import fetcher from '@/lib/fetcher'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'react-hot-toast'
import useSWR from 'swr'

const ProjectApiKeys = () => {
  const router = useRouter()
  const [showSecret, setShowSecret] = React.useState(false)
  const { data: keys } = useSWR<{ private: string; _id: string }>(
    router.isReady && `/api/internal/keys?projectId=${router.query.projectId}`,
    fetcher
  )
  console.log(keys)
  return (
    <MainLayout LinksSubnavbar={ProjectLinksSubnavbar}>
      <div className='space-y-5'>
        <h1 className='text-xl'>API Key</h1>
        <p>
          • The API key should come as a header{' '}
          <span className='px-2 py-1 bg-zinc-800 font-mono rounded text-emerald-300'>
            `Duty-Token`
          </span>
          if you make the request yourself.
        </p>
        <p>
          • For convenience, to make API requests use the{' '}
          <Link href={'https://github.com'} target='_blank'>
            <span className='px-2 py-1 bg-zinc-800 font-mono rounded text-sky-300'>
              `duty-sdk`
            </span>
          </Link>
          .
        </p>
        <div className='mt-4'>
          <div className='mt-2'>
            <div className='flex items-center'>
              <button
                onClick={() => setShowSecret(!showSecret)}
                className='px-4 py-1 bg-zinc-800 font-mono rounded-l hover:bg-zinc-700 border-l border-zinc-500 border-r '
              >
                👁️
              </button>
              <span className='px-10 py-1 bg-zinc-800 font-mono text-gray-300'>
                {showSecret ? keys?.private : '••••••••••••••••••••••••••••••'}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(keys?.private || '')
                  toast.success('Copied to clipboard')
                }}
                className='px-4 py-1 bg-zinc-800 font-mono rounded-r hover:bg-zinc-700 border-l border-zinc-500'
              >
                {'Copy'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default ProjectApiKeys
