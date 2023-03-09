const express = require('express')
const db = require('./config/mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const companyRoutes = require('./routes/company')
const carModelRoutes = require('./routes/model')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use('/', companyRoutes)
app.use('/', carModelRoutes)

app.listen(4000, () => {
  console.log('listening on port 4000')
})
