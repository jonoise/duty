export interface LogData {
  duty: string
  result: any
  req: {
    method: string
    url: string
    headers: any
    body: any
  }
}
