'use client'

import { useState } from 'react';
import { fetchPosts } from './actions';
export default function Page() {

  const [list, setList] = useState([]);

  return (
    <>
      <ul>
        {list.map(({ title, id }) => {
          return <li key={id}>{title}</li>
        })}
      </ul>
      <button onClick={async () => {
        const data = await fetchPosts()
        setList(data)
      }}>添加数据</button>
    </>
  )
}