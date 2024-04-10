import { readFile, readdir } from "fs/promises";
import React from 'react';
import { renderJSXToHTML } from './utils'
import { Layout, IndexPage, PostPage } from './components'

export async function htmlGenerator(url) {
  let html = await renderJSXToHTML(<Router url={url} />);
  // 直接拼虽然有些错误，但浏览器会纠正，并正确解析
  html += `<script type="module" src="/client.js"></script>`;
  return html;
}

function Router({ url }) {
  let page;
  if (url.pathname === "/") {
    page = <IndexPage />;
  } else {
    const slug = url.pathname.slice(1);
    page = <PostPage slug={slug} />;
  }
  return <Layout>{page}</Layout>;
}