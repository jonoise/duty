import create from 'zustand'
import { DemoCode } from '@/data/demo'

type DemoData = {
  code: string
  setCode: (code: string) => void

  output: string
  setOutput: (output: string) => void

  error: string
  setError: (error: string) => void

  outputLoading: boolean
  setOutputLoading: (loading: boolean) => void
}

export const useDemoData = create<DemoData>((set) => ({
  code: DemoCode,
  setCode: (code) => set(() => ({ code })),
  output: '',
  setOutput: (output) => set({ output }),
  error: '',
  setError: (error) => set({ error }),
  outputLoading: false,
  setOutputLoading: (loading) => set({ outputLoading: loading }),
}))
