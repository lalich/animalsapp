const mongoose = require('./connect')

const animalSchema = new mongoose.Schema({

    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number
})

const Animal = mongoose.model('animal', animalSchema)

module.exports = Animal
