import React, { Suspense } from 'react';
import { readFile, readdir } from "fs/promises";

const sleep = ms => new Promise(r => setTimeout(r, ms));

const importMap = `{
  "imports": {
    "react": "https://esm.sh/react@18.3.0-canary-c3048aab4-20240326?dev",
        "react-dom/client": "https://esm.sh/react-dom@18.3.0-canary-c3048aab4-20240326/client?dev",
        "react-server-dom-webpack": "https://esm.sh/react-server-dom-webpack@18.3.0-canary-c3048aab4-20240326/client?dev"
  }
}`

export function Layout({ children }) {
  const author = "YaYu";
  return (
    <html>
    <head>
      <title>My blog</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <script dangerouslySetInnerHTML={{ __html: `window.__webpack_require__ = async (id) => {
          return import(id)
        }` }}>
      </script>
      <script
          type="importmap"
          dangerouslySetInnerHTML={{ __html: importMap }}
      ></script>
      <script type="module" src="/client.js"></script>
    </head>
    <body className="p-5">
      <nav className="flex items-center justify-center gap-10 text-blue-600">
        <a href="/">Home</a>
      </nav>
      <input required className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      <main>{children}</main>
      <Footer author={author} />
    </body>
  </html>
  );
}

export async function IndexPage() {
  const files = await readdir("./posts");
  const slugs = files.map((file) =>
    file.slice(0, file.lastIndexOf("."))
  );

  return (
    <section>
      <h1>Blog List:</h1>
      <div>
        {slugs.map((slug, index) => (
          <Suspense key={index} fallback={<p>Loading Post...</p>}>
            <Post slug={slug} />
          </Suspense>
        ))}
      </div>
    </section>
  );
}

export function PostPage({ slug }) {
  return (
    <Suspense fallback={<p>Loading Post...</p>}>
      <Post slug={slug} />
    </Suspense>
  );
}

async function Post({ slug }) {
  let content = await readFile("./posts/" + slug + ".txt", "utf8");
  await sleep(2000)
  return (
    <section>
      <a className="text-blue-600" href={"/" + slug}>{slug}</a>
      <article className="h-40 mt-5 flex-1 rounded-xl bg-indigo-500 text-white flex items-center justify-center">{content}</article>
    </section>
  )
}

export function Footer({ author }) {
  return (
    <footer className="h-20 mt-5 flex-1 rounded-xl bg-cyan-500 text-white flex items-center justify-center">
      (c) { author }, {new Date().getFullYear()}
    </footer>
  );
}