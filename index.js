import 'dotenv/config'
import morgan from 'morgan'
import mongoose from 'mongoose'
import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import http from 'http'
import routes from './routes/index.js'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const server = next({ dev })
const handle = server.getRequestHandler()

server.prepare().then(() => {
  const app = express()
  app.use(morgan('combined'))
  app.use(helmet({
    contentSecurityPolicy: true
  }))
  app.use(compression())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(express.static('dist'))
  routes(app, handle)
  http.Server(app).listen(process.env.PORT || 80)
}).catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
