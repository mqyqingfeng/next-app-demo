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
      <CommentForm slug={slug} />
      <CommentList slug={slug} />
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

async function CommentForm({ slug }) {
  return (
    <form id="form" method="POST" action="/actions/comment" className="my-6 flex max-w-md gap-x-4 mx-auto">
      <input
        name="comment"
        required
        className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
        placeholder="Enter your Comment"
        />
      <input type="hidden" name="slug" value={slug} />
      <button
        type="submit"
        className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
        Submit
      </button>
    </form>
  )
}

async function CommentList({ slug }) {
  let comments
  try {
    const commentsData = await readFile("./comments/" + slug + ".json", "utf8")
    comments = JSON.parse(commentsData)
  } catch (err) {
    comments = []
  }

  return (
    <div>
      <h2>Comments:</h2>
      <div className='divide-y divide-gray-100'>
        {comments.map((comment, i) => {
      return (
        <div key={i} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <div className="text-sm font-medium leading-6 text-gray-900">Floor {i+1}</div>
          <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{comment.content}</div>
        </div>
      )
    })}
      </div>
    </div>
  )
}

export function Footer({ author }) {
  return (
    <footer className="h-20 mt-5 flex-1 rounded-xl bg-cyan-500 text-white flex items-center justify-center">
      (c) { author }, {new Date().getFullYear()}
    </footer>
  );
}