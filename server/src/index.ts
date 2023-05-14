import express from 'express'
import { logger } from './logger'
import { initilizeDatabase } from './database/db'
import api from './api'
import { initConfig } from './config'
const app = express()
const port = 8080 // default port to listen

// Initilization
initConfig()
initilizeDatabase()

// define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb' }))
app.use('/api', api)

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  logger.log(`Server started at http://localhost:${port}`)
})
