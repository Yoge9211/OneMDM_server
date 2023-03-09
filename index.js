const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const db = require('./config/mongoose')
const app = express()
const companyRoutes = require('./routes/company')
const carModelRoutes = require('./routes/model')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use('/', companyRoutes)
app.use('/', carModelRoutes)

app.listen(process.env.PORT, () => {
  console.log('listening on port 4000')
})
