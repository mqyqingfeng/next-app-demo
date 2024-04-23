"use server"
export async function fetchPosts(value) {
  const data = await (await fetch('https://jsonplaceholder.typicode.com/posts')).json()
  return data
}