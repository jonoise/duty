import ReactCodeMirror from '@uiw/react-codemirror'
import React, { FC, useEffect, useState } from 'react'
import { format } from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'
import { xcodeDark } from '@uiw/codemirror-theme-xcode'
import { json } from '@codemirror/lang-json'
import EditorNavContainer from './EditorNavContainer'

const Output: FC<{ output: string }> = (props) => {
  const [prettifiedOutput, setPrettifiedOutput] = useState(`{
    "data": "Hello World"
  }`)

  useEffect(() => {
    try {
      const f = format(JSON.stringify(props.output, null, 2), {
        parser: 'json',
        plugins: [parserBabel],
      })
      setPrettifiedOutput(f)
    } catch (error) {
      console.log(error)
    }
  }, [props.output])

  return (
    <div>
      <EditorNavContainer>
        <p>Response</p>
      </EditorNavContainer>

      <ReactCodeMirror
        theme={xcodeDark}
        lang={'json'}
        readOnly={true}
        height='540px'
        value={prettifiedOutput}
      />
    </div>
  )
}

export default Output
