import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './pages/index'

const app = express()
app.use(express.static('public'));
const content = renderToString(<App />)

app.get('/', (req, res) => res.send(`
<html>
   <head>
       <title>Tiny React SSR</title>
   </head>
   <body>
    <div id='root'>${content}</div>
    <script src="/client.bundle.js"></script>
   </body>
</html>
`))

app.listen(3000, () => console.log('listening on port 3000!'))