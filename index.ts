import express from "express";
import { htmlGenerator } from "./generator";
const app = express();

app.get("/:route(*)", async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const html = await htmlGenerator(url);
  res.setHeader("Content-Type", "text/html");
  res.end(html);
});

app.listen(3000, (err) => {
  if (err) return console.error(err);
  return console.log(`Server is listening on 3000`);
});