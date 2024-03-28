'use client'

export default function Page() {

  if (typeof window !== 'undefined') {
    window.addEventListener("resize", () => {
      console.log(window.innerWidth)
    })
  }

  return (
    <div className="p-5">
      addEventListener resize
    </div>
  )
}