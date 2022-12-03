import React, { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { okaidia } from '@uiw/codemirror-theme-okaidia'

const fnContent = `function add(a, b) {
  return a + b;
}
const r = add(1, 2);
console.log(r);
`

const file2 = {
  id: 2,
  content: fnContent,
  name: 'index.tsx',
}

const HomePage = () => {
  const [fn, setFn] = useState(file2)
  const [selectedFile, setSelectedFile] = useState(file2)

  const handleFileSelect = (file: any) => {
    setSelectedFile(file)
  }

  const onChange = React.useCallback(
    async (value: string, viewUpdate: any, fileId: number) => {
      const newFile = {
        ...selectedFile,
        content: value,
      }
      setFn(newFile)
    },
    []
  )

  return (
    <div className='flex bg-[#272822]'>
      <div className='flex-1 flex flex-col'>
        <div className='flex h-10 items-end'>
          <div
            className='h-full border border-b-0 border-zinc-500 text-white text-xs flex justify-center items-center px-4 cursor-pointer'
            onClick={() => handleFileSelect(fn)}
          >
            <p>{fn.name}</p>
            <button
              onClick={async () => {
                await fetch(`/api/test`, {
                  method: 'POST',
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify({ content: fn.content }),
                })
              }}
            >
              Enviar
            </button>
          </div>
        </div>
        <div className='flex-1'>
          <CodeMirror
            value={selectedFile.content}
            height='100vh'
            style={{ fontSize: '18px' }}
            theme={okaidia}
            extensions={[javascript({ jsx: true })]}
            onChange={(a, b) => onChange(a, b, selectedFile.id)}
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
