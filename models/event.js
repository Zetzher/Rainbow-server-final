const mongoose = require('mongoose')
const Schema = mongoose.Schema
const evento = new Schema({

nombre: String,
descripcion: String,
lugar: String,
id: [{type: Schema.Types.ObjectId, ref: "User"}],
asistencia:[{type: Schema.Types.ObjectId, ref: "User"}]
} 
)
const Evento = mongoose.model ("Evento", evento)

module.exports = Evento