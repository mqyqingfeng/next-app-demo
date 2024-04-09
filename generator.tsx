import { readFile, readdir } from "fs/promises";
import React from 'react';
import { renderJSXToHTML } from './utils'
import { Layout, IndexPage, PostPage } from './components'

export async function htmlGenerator(url) {
  const content = await readFile("./posts/hello.txt", "utf8");
  const page = await matchRoute(url);
  return renderJSXToHTML(<Layout>{page}</Layout>);
}

async function matchRoute(url) {
  if (url.pathname === "/") {
    const files = await readdir("./posts");
    const slugs = files.map((file) => file.slice(0, file.lastIndexOf(".")));
    const contents = await Promise.all(
      slugs.map((slug) =>
        readFile("./posts/" + slug + ".txt", "utf8")
      )
    );
    return <IndexPage slugs={slugs} contents={contents} />;
  } else {
    const slug = url.pathname.slice(1);
    const content = await readFile("./posts/" + slug + ".txt", "utf8");
    return <PostPage slug={slug} content={content} />;
  }
}