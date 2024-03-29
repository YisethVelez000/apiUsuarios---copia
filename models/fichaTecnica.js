const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const FichaSchema = mongoose.Schema({
    nombreProducto: {
        type: String,
        required: true,
      },
      talla: {
        type: String,
        required:[true, 'La talla es requerida'],
        enum:['S','M','L','XL'],
      },
      insumo: {
        type: String,
        required: true,
        enum:['tela','algodon','hilo','botones',''],
      },
      imagen: {
        type: String,
        required: true,
      },
      color:{
        type:String,
        required: true,
        enum:['azul','amarillo','rojo',],
      },
      cantidadInsumo: {
        type: Number,
        required: true,
      },
      precioInsumo: {
        type: Number,
        required: true,
      },

})
    
module.exports = mongoose.model('fichaTecnica', FichaSchema);