import {
  CreateDutyInputs,
  DemoEditor,
  DemoOutput,
  UpdateDutyInputs,
} from '@/components/duty'
import { MainLayout } from '@/components/layouts/main'
import { ProjectLinksSubnavbar } from '@/components/project'
import fetcher from '@/lib/fetcher'
import { testFunction } from '@/lib/testFunction'
import { DutyI } from '@/models'
import { useDutyData } from '@/stores/useDutyData'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'

const DutyDetails = () => {
  const dutyData = useDutyData()
  const router = useRouter()
  const { data: duty } = useSWR<DutyI>(
    router.isReady && `/api/internal/duty?dutyId=${router.query.dutyId}`,
    fetcher
  )
  React.useEffect(() => {
    if (duty) {
      dutyData.setCode(duty.code)
    }
  }, [duty])

  return (
    <MainLayout LinksSubnavbar={ProjectLinksSubnavbar}>
      <div className='space-y-2 pb-4'>
        <h1 className='text-4xl font-bold'>Duty Details</h1>
      </div>
      <div className='space-y-5'>
        <UpdateDutyInputs
          name={duty?.name}
          description={duty?.description}
          slug={duty?.slug}
          testFunction={testFunction}
        />
        <div className='flex'>
          <div className='flex-1'>
            <DemoEditor
              code={dutyData.code}
              setCode={dutyData.setCode}
              testFunction={testFunction}
            />
          </div>
          <div className='w-2/5'>
            <DemoOutput
              output={dutyData.output}
              outputLoading={dutyData.outputLoading}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default DutyDetails
