const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParse = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

//bring routes
const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')

// app
const app = express()

//db
mongoose
    .connect(process.env.DATABASE_LOCAL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected...'))

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParse())

// cors
if (process.env.NODE_ENV === 'development') {
    app.use(
        cors({
            origin: `${process.env.CLIENT_URL}`,
        })
    )
}

// routes middleware
app.use('/api', blogRoutes)
app.use('/api', authRoutes)

// port
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
