const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const ordenProduccionSchema = mongoose.Schema({
    nroOrden: {
        type: Number,
        required: true,
        min: 1,
    },
    fechaEstimada: {
        type: Date,
        required: true,
    },
    tallas :{
        type: Array,
        required: true,
        min: 1,
    },
    cantidad: {
        type: Number,
        required: true,
        min: 1,
    },
    color: {
        type: Array,
        required: true,
        min: 1,
    },
    estado: {
        type: String,
        required: true,
        min: 1,
        default: 'pendiente'
    }
})

module.exports = mongoose.model('OrdenProduccion', ordenProduccionSchema);