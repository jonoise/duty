import React, { Fragment } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/dracula'
import clsx from 'clsx'
import { dutyFnContent } from '@/data/duty'
import Image from 'next/image'

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
const codeSnippet = `const { MongoClient } = mongodb

module.exports = async function insertDuty() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();

  const db = client.db('project');
  const collection = db.collection('duty');
  const result = await collection.insertOne({ name: 'Duty Added 🚀' });
  
  return result
}`

export const HomeHeader = () => {
  return (
    <div className='flex flex-col w-full py-20 lg:flex-row lg:items-center space-y-5 h-[70vh]'>
      <div className='lg:w-1/2 space-y-5'>
        <h1 className='text-6xl font-bold'>
          Serverless <br /> micro-backends.
        </h1>
        <div className='flex w-full items-center'>
          <div className='flex space-x-1.5 items-center'>
            <h1 className='text-xl font-bold'>
              Build for <span className='text-yellow-300'>Javascript </span>{' '}
            </h1>
            <Image
              alt='Javascript Logo'
              src={'/js-logo.svg'}
              width={25}
              height={25}
            />
            <h1 className='text-xl font-bold'>
              and <span className='text-green-600'>MongoDB</span>
            </h1>
            <Image
              alt='MongoDB Logo'
              src={'/mongo-logo.svg'}
              width={35}
              height={45}
              style={{ marginLeft: -3, marginRight: -4 }}
            />
            <h1 className='text-xl font-bold'>services.</h1>
          </div>
        </div>
        <p className='text-xl'>Create your own micro-backend in seconds.</p>

        <div className='flex space-x-4 mt-4'>
          <button className='bg-pink-600 text-white m-0 p-0 rounded flex items-center px-5 py-2 text-sm font-bold'>
            TRY DUTY
          </button>
          <button className='bg-pink-600 text-white m-0 p-0 rounded flex items-center px-5 py-2 text-sm font-bold'>
            CREATE ACCOUNT
          </button>
        </div>
      </div>
      <div className='lg:w-1/2 rounded-xl bg-gradient-to-t from-rose-600 to-pink-600 p-0.5 h-min'>
        <TrafficLightsIcon className='h-2.5 w-auto  fill-rose-700 mx-2 my-2' />
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
