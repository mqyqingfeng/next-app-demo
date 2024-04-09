import express from "express";
import { htmlGenerator } from "./generator";
const app = express();

app.get("/:route(*)", async (req, res) => {
  const html = await htmlGenerator();
  res.setHeader("Content-Type", "text/html");
  res.end(html);
});

app.listen(3000, (err) => {
  if (err) return console.error(err);
  return console.log(`Server is listening on 3000`);
});
