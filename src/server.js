/**
 * The starting point of the application.
 *
 * @author Mats Loock
 * @version 2.0.0
 */

import express from 'express'
import logger from 'morgan'
import { router as authRouter } from './routes/auth-route.js'
import { router as docRoute } from './routes/document-route.js'
import { router as patientRoute } from './routes/patient-route.js'
import { router as employeeRoute } from './routes/employee-route.js'
import cors from 'cors'

import dotenv from 'dotenv'
import { connectDB } from './config/mongose.js'
dotenv.config()


// Set the base URL to use for all relative URLs in a document.
const baseURL = process.env.BASE_URL || '/'

// connect to mongodb 
await connectDB()

// Create Express application.
export const app = express()

// Set up a morgan logger using the dev format for log entries.
app.use(logger('dev'))

// Parse requests of the content type application/json.
app.use(express.json())

// Parse requests of the content type application/x-www-form-urlencoded.
// Populates the request object with a body object (req.body).
app.use(express.urlencoded({ extended: false }))

// Middleware to be executed before the routes.
app.use((req, res, next) => {
  // Pass the base URL to the views.
  res.locals.baseURL = baseURL

  next()
})

// enable cors to client
const corsOptions = {
  origin: process.env.CORS
}
app.use(cors(corsOptions))

// Register routes.
app.use('/api/patients', patientRoute)
app.use('/api/document', docRoute)
app.use('/api/auth', authRouter)
app.use('/api/employee', employeeRoute)


// Error handler.
app.use(function (err, req, res, next) {
  res
    .status(err.status || 500)
    .send(err.message || 'Internal Server Error')
})

// Starts the HTTP server listening for connections.
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`)
  console.log('Press Ctrl-C to terminate...')
})
