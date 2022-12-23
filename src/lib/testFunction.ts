import { DutyData } from '@/stores/useDutyData'
import { posibleError } from '@/data/demo'

export const testFunction = async (dutyData: DutyData) => {
  dutyData.setOutputLoading(true)
  const res = await fetch(`/api/test`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ code: dutyData.code }),
  })
  if (res.ok) {
    const json = await res.json()
    if (!json.result) {
      dutyData.setOutput(JSON.stringify(posibleError, null, 2))
    } else {
      dutyData.setOutput(JSON.stringify(json.result, null, 2))
    }
  } else {
    dutyData.setOutput(JSON.stringify(await res.json(), null, 2))
  }
  dutyData.setOutputLoading(false)
}
