import express from "express";
import { jsxGenerator } from "../generator";

const app = express();

app.get("/:route(*)", async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const clientJSXString = await jsxGenerator(url);
  res.setHeader("Content-Type", "application/json");
  res.end(clientJSXString);
});

app.listen(3001, (err) => {
  if (err) return console.error(err);
  return console.log(`Server is listening on 3001`);
});
