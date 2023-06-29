require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATA_URL)

mongoose.connection
    .on('connected', () => console.log('connected'))
    .on('disconnected', () => console.log('disconnected'))
    .on('error', (error) => console.log(error))


module.exports = mongoose