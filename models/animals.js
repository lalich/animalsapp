const mongoose = require('./connect')

const animalSchema = new mongoose.Schema({

    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number
})

const Animals = mongoose.model('animal', animalSchema)

module.exports = Animals
