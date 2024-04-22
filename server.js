import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'

const app = express()
app.use(express.static('public'));

app.get("/", async (req, res) => {
    const file = await import(`./pages/index.js`);
    let propsObj = {};
    if (file.getServerSideProps) {
      const { props } = await file.getServerSideProps({ query: req.query });
      propsObj = props
    }
    const Component = file.default;

    const content = renderToString(<Component {...propsObj} />)
    res.send(`
    <html>
       <head>
           <title>Tiny React SSR</title>
       </head>
       <body>
        <div id='root'>${content}</div>
        <script>
          window.__DATA__ = ${JSON.stringify(propsObj)}
        </script>
        <script src="/client.bundle.js"></script>
       </body>
    </html>
    `)
})

app.listen(3000, () => console.log('listening on port 3000!'))