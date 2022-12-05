export const dutyFnContent = `module.exports = async function duty(env) {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await res.json();
  return data;
};`

export const initialFile = {
  name: 'index.tsx',
  content: dutyFnContent,
}
