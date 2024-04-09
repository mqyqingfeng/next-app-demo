import React from 'react';

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
      <main>{children}</main>
      <Footer author={author} />
    </body>
  </html>
  );
}

export function IndexPage({ slugs, contents }) {
  return (
    <section>
      <h1>Blog List:</h1>
      <div>
        {slugs.map((slug, index) => (
          <section key={slug} className="mt-4">
            <a className="text-blue-600" href={"/" + slug}>{slug}</a>
            <article className="h-40 mt-5 flex-1 rounded-xl bg-indigo-500 text-white flex items-center justify-center">{contents[index]}</article>
          </section>
        ))}
      </div>
    </section>
  );
}

export function PostPage({ slug, content }) {
  return (
    <section>
      <a className="text-blue-600" href={"/" + slug}>{slug}</a>
      <article className="h-40 mt-5 flex-1 rounded-xl bg-indigo-500 text-white flex items-center justify-center">{content}</article>
    </section>
  );
}

export function Footer({ author }) {
  return (
    <footer className="h-20 mt-5 flex-1 rounded-xl bg-cyan-500 text-white flex items-center justify-center">
      (c) { author }, {new Date().getFullYear()}
    </footer>
  );
}