//Inyección de dependencia mongoose
const mongoose = require('mongoose');

//Instanciar scehma de moongoose
let PersonSchema = new mongoose.Schema({
    nombre: String,
    edad: Number,
    tipoSangre: String,
    nss: String
});

//Exportar la instancia de un modelo de mongoose
module.exports = mongoose.model('Persons', PersonSchema);