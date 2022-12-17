export const DemoCode = `module.exports = async function duty(){
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const data = await res.json()
  return data
}`

export const posibleError = {
  message: 'Review your return statement',
}

export const responseError = {
  message: 'Review your return statement',
}
