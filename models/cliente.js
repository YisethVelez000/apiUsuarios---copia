const { number } = require('@hapi/joi');
const mongoose = require('mongoose');
const clienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    apellido: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    direccion: {
        type: String,
        required: true,
        minlength: 6
    },
    telefono: {
        type: Number,
        required: true,
        minlength: 10
    },
    estado: {
        type: String,
        required: true,
        minlength: 3,
        default: 'activo'
    },
    rol:{
        type: String,
        required : true,
        default: 'cliente'
    }
})

module.exports = mongoose.model('Cliente', clienteSchema);