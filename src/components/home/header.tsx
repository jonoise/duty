import React, { Fragment } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/dracula'
import clsx from 'clsx'
import { dutyFnContent } from '@/data/duty'

function TrafficLightsIcon(props: any) {
  return (
    <svg aria-hidden='true' viewBox='0 0 42 10' fill='none' {...props}>
      <circle cx='5' cy='5' r='4.5' />
      <circle cx='21' cy='5' r='4.5' />
      <circle cx='37' cy='5' r='4.5' />
    </svg>
  )
}

const codeLang = 'javascript'
const codeSnippet = dutyFnContent

export const HomeHeader = () => {
  return (
    <div className='flex flex-col w-full py-20 lg:flex-row lg:items-center space-y-5'>
      <div className='lg:w-1/2 space-y-5'>
        <h1 className='text-9xl font-bold'>Duty</h1>
        <p className='inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-2xl md:text-5xl  tracking-tight text-transparent'>
          Automate everything from your computer to run in the cloud.{' '}
        </p>
        <p className='text-xl'>
          Get your duties done, everyday, 365 days a year. NON STOP!
        </p>

        <div className='flex space-x-2 mt-4'>
          <button className='bg-gradient-to-r from-blue-500 to-pink-600 text-white m-0 p-0 rounded-full flex items-center px-5 py-2 text-sm font-bold'>
            KNOW MORE
          </button>
        </div>
      </div>
      <div className='lg:w-1/2 rounded-xl bg-gradient-to-r from-pink-800 to-indigo-900 p-0.5 h-min'>
        <TrafficLightsIcon className='h-2.5 w-auto stroke-yellow-500/60 mx-2 my-2' />
        <div className='p-4  overflow-scroll rounded-b-xl bg-zinc-900 '>
          <div className='bg-zinc-800 w-min px-4 py-1 rounded-full mb-2 text-xs'>
            <p>duty.js</p>
          </div>

          <div className='flex items-start px-1 text-sm rounded-lg'>
            <div
              aria-hidden='true'
              className='select-none border-r border-slate-300/5 pr-4 font-mono text-slate-600 py-2'
            >
              {Array.from({
                length: codeSnippet.split('\n').length,
              }).map((_, index) => (
                <Fragment key={index}>
                  {(index + 1).toString().padStart(2, '0')}
                  <br />
                </Fragment>
              ))}
            </div>
            <Highlight
              {...defaultProps}
              code={codeSnippet}
              language={codeLang}
              theme={theme}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={clsx(
                    className,
                    'flex overflow-x-auto py-2 bg-zinc-900'
                  )}
                >
                  <code className='px-4'>
                    {tokens.map((line, lineIndex) => (
                      <div key={lineIndex} {...getLineProps({ line })}>
                        {line.map((token, tokenIndex) => (
                          <span
                            key={tokenIndex}
                            {...getTokenProps({ token })}
                          />
                        ))}
                      </div>
                    ))}
                  </code>
                </pre>
              )}
            </Highlight>
          </div>
        </div>
      </div>
    </div>
  )
}
