import ReactCodeMirror from '@uiw/react-codemirror'
import React, { FC, useEffect } from 'react'
import { xcodeDark } from '@uiw/codemirror-theme-xcode'
import { javascript } from '@codemirror/lang-javascript'
import { format } from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'

interface Props {
  code: string
  setCode: (code: string) => void
  onSubmit: () => Promise<void>
}

export const DemoEditor: FC<Props> = (props) => {
  const { code, setCode, onSubmit } = props
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
    async function clickedSubmit(e: KeyboardEvent) {
      let charCode = String.fromCharCode(e.which).toLowerCase()
      if ((e.ctrlKey || e.metaKey) && charCode === 'd') {
        e.preventDefault()
        await onSubmit()
      }
    }

    window.addEventListener('keydown', clickedSave)
    window.addEventListener('keydown', clickedSubmit)

    return () => {
      window.removeEventListener('keydown', clickedSave)
      window.removeEventListener('keydown', clickedSubmit)
    }
  }, [code])

  return (
    <ReactCodeMirror
      value={code}
      theme={xcodeDark}
      height='460px'
      style={{ fontSize: '14px', width: '100%' }}
      extensions={[javascript()]}
    />
  )
}
