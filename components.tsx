import React from 'react';
import { readFile, readdir } from "fs/promises";

export function Layout({ children }) {
  const author = "YaYu";
  return (
    <html>
    <head>
      <title>My blog</title>
      <script src="https://cdn.tailwindcss.com"></script>
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
        {slugs.map((slug, index) => <Post key={index} slug={slug} />)}
      </div>
    </section>
  );
}

export function PostPage({ slug }) {
  return <Post slug={slug} />;
}

async function Post({ slug }) {
  let content = await readFile("./posts/" + slug + ".txt", "utf8");
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