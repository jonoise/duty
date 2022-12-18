import { useEffect, useState } from 'react'
import React from 'react'
import Output from './Output'
import CodeMirror, { useCodeMirror } from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { xcodeDark } from '@uiw/codemirror-theme-xcode'
import cn from 'clsx'
import { useResizable } from 'react-resizable-layout'
import { format } from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'
import { initialFile } from '../../data/duty'
import EditorNavContainer from './EditorNavContainer'
import { SiteContainer } from '../generics'

const DutyEditor = () => {
  const [fn, setFn] = useState(initialFile)
  const [output, setOutput] = useState('')

  const onChange = React.useCallback(async (value: string, viewUpdate: any) => {
    const newFile = {
      ...fn,
      content: value,
    }
    setFn(newFile)
  }, [])

  useEffect(() => {
    function clickedSave(e: KeyboardEvent) {
      let charCode = String.fromCharCode(e.which).toLowerCase()
      if ((e.ctrlKey || e.metaKey) && charCode === 's') {
        e.preventDefault()
        try {
          const f = format(fn.content, {
            parser: 'babel',
            plugins: [parserBabel],
          })
          onChange(f, null)
        } catch (error) {
          console.log(error)
        }
      }
    }

    window.addEventListener('keydown', clickedSave)

    return () => window.removeEventListener('keydown', clickedSave)
  }, [fn.content])

  const {
    isDragging: isPluginDragging,
    position: pluginW,
    separatorProps: pluginDragBarProps,
  } = useResizable({
    axis: 'x',
    initial: 400,
    min: 50,
    reverse: true,
  })

  return (
    <div>
      <SiteContainer>
        <div className='flex flex-col h-[500px] rounded-lg font-mono color-white overflow-hidden'>
          <div className={'flex'}>
            {/* <Filetree /> */}
            <div className={'flex flex-grow'}>
              <div className='flex flex-col w-full '>
                <EditorNavContainer>
                  <button
                    onClick={async () => {
                      const res = await fetch(`/api/test`, {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ code: fn.content }),
                      })
                      const data = await res.json()
                      setOutput(data)
                    }}
                  >
                    Enviar
                  </button>
                </EditorNavContainer>
                <CodeMirror
                  value={fn.content}
                  height='460px'
                  style={{ fontSize: '14px', width: '100%' }}
                  theme={xcodeDark}
                  extensions={[javascript({ jsx: true })]}
                  onChange={(a, b) => onChange(a, b)}
                />
              </div>

              <SampleSplitter
                isDragging={isPluginDragging}
                {...pluginDragBarProps}
              />
              <div
                className={cn(
                  'flex-shrink-0 w-2/6',
                  isPluginDragging && 'dragging'
                )}
                style={{ width: pluginW }}
              >
                <Output output={output} />
              </div>
            </div>
          </div>
        </div>
      </SiteContainer>
    </div>
  )
}

export default DutyEditor

const SampleSplitter = ({
  id = 'drag-bar',
  dir,
  isDragging,
  ...props
}: any) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div
      id={id}
      data-testid={id}
      tabIndex={0}
      className={cn(
        'sample-drag-bar',
        dir === 'horizontal' && 'sample-drag-bar--horizontal',
        (isDragging || isFocused) && 'sample-drag-bar--dragging'
      )}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  )
}
