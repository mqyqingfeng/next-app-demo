export default async function Page() {
  const data = await (await fetch('https://jsonplaceholder.typicode.com/posts')).json()
  console.log(data)
  return (
    <ul>{data?.map(({title}, index) => {
      return <li key={index}>{title}</li>
    })}</ul>
  )
}