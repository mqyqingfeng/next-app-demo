import express from "express";
import { readFile } from "fs/promises";
import { renderToString } from "react-dom/server";
import { parseJSX } from "../utils";

const app = express();
app.use(express.static('public'))

app.get("/:route(*)", async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // client.js
  if (url.pathname === "/client.js") {
    const content = await readFile("./client.js", "utf8");
    res.setHeader("Content-Type", "text/javascript");
    res.end(content);
    return;
  }

  if (url.pathname === '/favicon.ico') {
    return
  }

  // 获取客户端 JSX 对象
  const response = await fetch("http://127.0.0.1:3001" + url.pathname);

  if (!response.ok) {
    res.statusCode = response.status;
    res.end();
    return;
  }

  const clientJSXString = await response.text();

  // 获取客户端 JSX 对象
  if (url.searchParams.has("jsx")) {
    res.setHeader("Content-Type", "application/json");
    res.end(clientJSXString);
  }
  // 获取 HTML
  else {
    const clientJSX = JSON.parse(clientJSXString, parseJSX);
    let html = renderToString(clientJSX);

    html += `<script>window.__INITIAL_CLIENT_JSX_STRING__ = `;
    html += JSON.stringify(clientJSXString).replace(/</g, "\\u003c");
    html += `</script>`;
    html += `
      <script type="importmap">
        {
          "imports": {
            "react": "https://esm.sh/react@18.2.0?dev",
            "react-dom/client": "https://esm.sh/react-dom@18.2.0/client?dev"
          }
        }
      </script>
      <script type="module" src="/client.js"></script>
    `;

    res.setHeader("Content-Type", "text/html");
    res.end(html);
  }
});

app.listen(3000, (err) => {
  if (err) return console.error(err);
  return console.log(`Server is listening on 3000`);
});
