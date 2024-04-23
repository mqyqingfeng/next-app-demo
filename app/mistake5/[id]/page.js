import { cookies, headers } from 'next/headers'
export default function Page({ params, searchParams }) {
  const cookieStore = cookies()
  const headersList = headers()
  return (
    <>
      <h1>My Page</h1>
      <h2>params</h2>
      <div>{JSON.stringify(params, null, 2)}</div>
      <h2>searchParams</h2>
      <div>{JSON.stringify(searchParams, null, 2)}</div>
      <h2>cookies</h2>
      <div>{JSON.stringify(cookieStore, null, 2)}</div>
      <h2>headers</h2>
      <div>{JSON.stringify(headersList, null, 2)}</div>
    </>
  )
}