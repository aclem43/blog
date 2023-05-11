import express from 'express'
import { logger } from './logger'
import { initilizeDatabase } from './database/db'
import api from './api'
const app = express()
const port = 8080 // default port to listen

initilizeDatabase()

// define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.use('/api', api)

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  logger.log(`Server started at http://localhost:${port}`)
})
