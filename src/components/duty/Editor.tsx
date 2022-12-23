import ReactCodeMirror from '@uiw/react-codemirror'
import React, { FC, useEffect } from 'react'
import { xcodeDark } from '@uiw/codemirror-theme-xcode'
import { javascript } from '@codemirror/lang-javascript'
import { format } from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'
import { DutyData, useDutyData } from '@/stores/useDutyData'

interface Props {
  code: string
  setCode: (code: string) => void
  testFunction: (dutyData: DutyData) => Promise<void>
}

export const DemoEditor: FC<Props> = (props) => {
  const { code, setCode, testFunction } = props
  const dutyData = useDutyData()

  useEffect(() => {
    function clickedSave(e: KeyboardEvent) {
      let charCode = String.fromCharCode(e.which).toLowerCase()
      if ((e.ctrlKey || e.metaKey) && charCode === 's') {
        e.preventDefault()
        try {
          const f = format(code, {
            parser: 'babel',
            plugins: [parserBabel],
          })
          setCode(f)
        } catch (error) {
          console.log(error)
        }
      }
    }

    async function clickedTest(e: KeyboardEvent) {
      let charCode = String.fromCharCode(e.which).toLowerCase()
      if ((e.ctrlKey || e.metaKey) && charCode === 'd') {
        e.preventDefault()
        await testFunction(dutyData)
      }
    }

    window.addEventListener('keydown', clickedSave)
    window.addEventListener('keydown', clickedTest)

    return () => {
      window.removeEventListener('keydown', clickedSave)
      window.removeEventListener('keydown', clickedTest)
    }
  }, [code])

  return (
    <ReactCodeMirror
      value={code}
      theme={xcodeDark}
      height='460px'
      style={{ fontSize: '14px', width: '100%' }}
      extensions={[javascript()]}
      onChange={(value, viewUpdate) => setCode(value)}
    />
  )
}
