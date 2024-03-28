'use client'

import dynamic from 'next/dynamic'
 
const Width = dynamic(() =>
  import('./width'), { ssr: false }
)

export default function Page() {
  return <Width />;
};