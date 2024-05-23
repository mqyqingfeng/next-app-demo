import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children, team, analytics }) {
  return (
    <html>
      <body className="p-6">
        <div className="p-10 mb-6 bg-sky-600 text-white rounded-xl">
          Parallel Routes Examples
        </div>
        <nav className="flex items-center justify-center gap-10 text-blue-600 mb-6">
          <Link href="/">Home</Link>
          <Link href="/page-views">Page Views</Link>
          <Link href="/visitors">Visitors</Link>
        </nav>
        <div className="flex gap-6">
          {team}
          {analytics}
        </div>
        {children}
      </body>
    </html>
  );
}