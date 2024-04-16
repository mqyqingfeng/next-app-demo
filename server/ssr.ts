import express from "express";
import { readFile } from "fs/promises";
import fetch from 'node-fetch';
import { renderToPipeableStream } from "react-dom/server"
import { createFromNodeStream } from "react-server-dom-webpack/client"

const app = express();

app.get("/:route(*)", async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // client.js
  if (url.pathname === "/client.js") {
    const content = await readFile("./client.js", "utf8");
    res.setHeader("Content-Type", "text/javascript");
    res.end(content);
    return;
  }

  const response = await fetch("http://127.0.0.1:3001" + url.pathname);

  if (!response.ok) {
    res.statusCode = response.status;
    res.end();
    return;
  }
  const stream = response.body;

  // 获取客户端 JSX 对象
  if (url.searchParams.has("jsx")) {
    res.set("Content-type", "text/x-component")
    stream.on("data", (data) => {
      res.write(data)
    })
    stream.on("end", (data) => {
      res.end()
    })
  }
  // 获取 HTML
  else {
    const root = await createFromNodeStream(stream, {})
    res.set("Content-type", "text/html")
    const { pipe } = renderToPipeableStream(root)
    pipe(res)
  }
});

app.listen(3000, (err) => {
  if (err) return console.error(err);
  return console.log(`Server is listening on 3000`);
});
