import React from 'react';

export function BlogPostPage({ postContent, author }) {
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
      <article className="h-40 mt-5 flex-1 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
        { postContent }
      </article>
      <Footer author={author} />
    </body>
  </html>
  );
}

export function Footer({ author }) {
  return (
    <footer className="h-20 mt-5 flex-1 rounded-xl bg-cyan-500 text-white flex items-center justify-center">
      (c) { author }, {new Date().getFullYear()}
    </footer>
  );
}