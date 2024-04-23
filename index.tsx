import express from "express";
import { AsyncLocalStorage } from 'node:async_hooks';
import { renderToPipeableStream } from 'react-dom/server';
import React from 'react';
import { User } from './user';

const cookiesStorage = new AsyncLocalStorage();

export function cookies() {
  return cookiesStorage.getStore();
}

function parseCookies(request) {
  const cookiesHeader = request.headers.cookie || '';
  if (!cookiesHeader) return {}
  return Object.fromEntries(
    cookiesHeader.split(';').map(cookie => {
      const [name, ...rest] = cookie.trim().split('=');
      return [name, rest.join('=')];
    })
  )
}

const app = express();

app.get("/:route(*)", async (req, res) => {
  const cookies = parseCookies(req);
  console.log(cookies)
  cookiesStorage.run(cookies, async () => {
    const { pipe } = renderToPipeableStream(<User />, {
      onShellReady() {
        res.setHeader('content-type', 'text/html');
        pipe(res);
      }
    });
  })
});

app.listen(3000, (err) => {
  if (err) return console.error(err);
  return console.log(`Server is listening on 3000`);
});