'use client'

import { useMounted } from './useMounted'

export default function Page() {
  const mounted = useMounted()
  if (!mounted) return null
      
  return (
    <div className="p-5">
      innerWidth: {window.innerWidth}
    </div>
  )
}