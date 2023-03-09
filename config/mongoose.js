const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/mdm'
// const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@clusterone.r09ozej.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(url)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function () {
  console.log('Database Connected successfully')
})
module.exports = db
