const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const rolSchema = mongoose.Schema({
    rol: {
        type: String,
        required: true,
        min: 1,
    },
    estado: {
        type: String,
        required: true,
        min: 1,
        default: 'activo'
    },
    permisos: {
        type: Array,
        required: true,
        min: 1,
    }
})

module.exports = mongoose.model('Rol', rolSchema);