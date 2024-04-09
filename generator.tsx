import { readFile } from "fs/promises";
import React from 'react';
import { renderJSXToHTML } from './utils'
import { BlogPostPage } from './components'

export async function htmlGenerator() {
  const author = "YaYu";
  const postContent = await readFile("./posts/hello.txt", "utf8");
  return renderJSXToHTML(<BlogPostPage postContent={postContent} author={author}/>);
}