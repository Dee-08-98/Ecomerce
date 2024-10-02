const express = require('express')
const app = express()

app.use(express.json())

const cors = require('cors')
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELEE"],
    // allowedHeaders: [
    //     "Content-Type",
    //     "Authorization",
    //     "Cache-Control",
    //     "Expires",
    //     "Pragma"
    // ],
    credentials: true
}))

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))

const route = require('./Routes/route')
app.use('/api/ecomerce', route)


module.exports = app
