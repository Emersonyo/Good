const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const dotenv = require('dotenv')
const rateLimit = require('express-rate-limit')
const connectDB = require('./config/db')

dotenv.config()

const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))

const limiter = rateLimit({ windowMs: 60 * 1000, max: 60 })
app.use(limiter)

// Connect to DB (optional)
connectDB().catch(err => console.warn('DB connection failed:', err.message))

// Routes
app.use('/api', require('./routes/api'))

app.get('/', (req, res) => res.send({ status: 'ok', name: 'Emerson API' }))

// Error handler (should be last middleware)
const errorHandler = require('./middleware/errorHandler')
app.use(errorHandler)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
