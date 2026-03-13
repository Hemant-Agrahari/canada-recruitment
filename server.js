require('dotenv').config()
const next = require('next')
const { parse } = require('url')

const express =  require('express')

const dev=false
const hostname = 'production'

const port = process.env.NODE_PORT || 266

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.get('*',async (req, res) => {
      const parsedUrl = parse(req.url, true)
      return await handle(req, res, parsedUrl)
    })


    server.listen(port, (err) => {
      if (err) {
        throw err
      }
      console.log(`Ready on http://localhost:${port}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })