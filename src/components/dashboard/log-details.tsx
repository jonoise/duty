import { LogData } from '@/types/logs'
import Highlight, { defaultProps } from 'prism-react-renderer'
import React, { FC } from 'react'
import theme from 'prism-react-renderer/themes/dracula'
import clsx from 'clsx'

export const LogDetails: FC<{ log: LogData }> = ({ log }) => {
  return (
    <div className='p-10 flex flex-col border-b border-zinc-600 text-sm space-y-4'>
      <h1 className='text-zinc-300'>
        <span className='font-bold'>Function ID:</span> {log.duty}
      </h1>

      <span className='font-bold text-zinc-300'>Request:</span>
      <div className='px-2 py-4 border border-zinc-800 rounded'>
        <Highlight
          {...defaultProps}
          code={JSON.stringify(log.req, null, 3)}
          language={'json'}
          theme={theme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={clsx(
                className,
                'flex overflow-x-auto py-2 bg-zinc-900 scrollbar-code-editor'
              )}
            >
              <code className='px-4'>
                {tokens.map((line, lineIndex) => (
                  <div key={lineIndex} {...getLineProps({ line })}>
                    {line.map((token, tokenIndex) => (
                      <span key={tokenIndex} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      </div>

      <span className='font-bold text-zinc-300'>Output:</span>
      <div className='px-2 py-4 border border-zinc-800 rounded'>
        <Highlight
          {...defaultProps}
          code={JSON.stringify(log.result)}
          language={'json'}
          theme={theme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={clsx(
                className,
                'flex overflow-x-auto py-2 bg-zinc-900 scrollbar-code-editor'
              )}
            >
              <code className='px-4'>
                {tokens.map((line, lineIndex) => (
                  <div key={lineIndex} {...getLineProps({ line })}>
                    {line.map((token, tokenIndex) => (
                      <span key={tokenIndex} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}
