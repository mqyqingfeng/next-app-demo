import Link from 'next/link'
import {photos} from './data';

export default function Home() {

  return (
    <main className="container">
      {photos.map(({ id, src }) => (
        <Link key={id} href={`/photo/${id}`}>
          <img width="200" src={src} />
        </Link>
      ))}
    </main>
  )
}
