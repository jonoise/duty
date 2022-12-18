import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const datef = (date: Date | string, format?: string) =>
  dayjs(date).format(format || 'MMM DD, YYYY')

export const fromNow = (date: Date | string) => dayjs(date).fromNow()
