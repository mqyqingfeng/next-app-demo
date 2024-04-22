import express from 'express'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { existsSync, readdirSync, mkdirSync, writeFileSync, stat } from 'node:fs';
import { join } from "path";

const app = express()
app.use(express.static('public'));

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const pagesDir = join(process.cwd(), "/pages")
const pages = readdirSync(pagesDir).map(page => page.split(".")[0]);

const expiresTime = 1000 * 10;

async function build() {
  if (!existsSync('output')) {
    mkdirSync('output');
  }

  await asyncForEach(pages, async (page) => {
    const file = await import(`./pages/${page}.js`);
    const Component = file.default;

    let propsObj = {};
    if (file.getServerSideProps) {
      const { props } = await file.getServerSideProps();
      propsObj = props
    }

    const content = renderToString(createElement(Component, propsObj))
    writeFileSync(
      `output/${page}.html`,
      `    <html>
      <head>
          <title>Tiny React SSR</title>
      </head>
      <body>
       <div id='root'>${content}</div>
       <script>
         window.__DATA__ = ${JSON.stringify({
        props: propsObj,
        page: page
      })}
       </script>
       <script src="/client.bundle.js"></script>
      </body>
   </html>`
    );
  })
}

app.get(/.*$/, async (req, res) => {

  const path = req.path.split('/')[1]
  const page = path ? path : 'index'

  if (pages.includes(page)) {

    const htmlPath = join('./output', page + '.html')

    stat(htmlPath, async function (err, stats) {
      if (err) {
          await build()
          return res.sendFile(join(process.cwd(), "output", page + '.html'));
      }
      if (Date.now() - stats.mtime > expiresTime) {
        await build()
        return res.sendFile(join(process.cwd(), "output", page + '.html'));
      } else {
        return res.sendFile(join(process.cwd(), "output", page + '.html'));
      }
    });
  } else {
    return res.status(200).json({ message: `${page} not found in ${pages}` });
  }
})

app.listen(3000, () => console.log('listening on port 3000!'))