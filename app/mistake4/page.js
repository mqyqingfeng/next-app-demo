import { Suspense } from "react";
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function Posts() {
  const data = await (await fetch('https://jsonplaceholder.typicode.com/posts')).json()
  await sleep(2000)
  return (
      <ul>{data?.map(({title}, index) => {
      return <li key={index}>{title}</li>
      })}</ul>
  )
}
export default async function Page() {
  return (
    <>
      <h1>Articles List</h1>
      <Suspense fallback={'loading'}>
        <Posts />
      </Suspense>
    </>
  )
}