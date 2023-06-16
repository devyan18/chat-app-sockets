import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import { environment } from './config/environments.js'
import { connectDB } from './database/mongodb.js'

import { v1 as routerV1 } from './routes/v1.js'

const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use(express.json())

app.use('/api/v1', routerV1)

app.listen(environment.PORT, () => {
  try {
    connectDB(environment.MONGO_URI)
  } catch (error) {
    console.log(error)
  }
  console.log(`Server running on port ${environment.PORT}`)
})
