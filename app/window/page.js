'use client'

import { useState, useEffect } from "react";

export default function Page() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])

  return (
    <div className="p-5">
      innerWidth: {width}
    </div>
  )
}