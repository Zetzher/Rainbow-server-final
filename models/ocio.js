const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ocio = new Schema({
    horario: String,
    dresscode: String,
    nombre: String,
    descripcion: String,
    calle: String,
    image_url: String,
    website: String,
    precio: String,
    type: Array
})
const Ocio = mongoose.model ("Ocio", ocio)

module.exports = Ocio