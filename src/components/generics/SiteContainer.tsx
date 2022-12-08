import { PropsWithChildren } from 'react'

export const SiteContainer = (props: PropsWithChildren) => {
  return <div className='px-4 md:px-10 xl:px-40'>{props.children}</div>
}
