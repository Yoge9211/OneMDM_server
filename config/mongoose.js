const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/mdm'
mongoose.connect(url)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function () {
  console.log('Database Connected successfully')
})
module.exports = db
