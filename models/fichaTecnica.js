const { string } = require('@hapi/joi');
const mongoose = require('mongoose');
const FichaSchema = mongoose.Schema({
    nombreProducto: {
        type: String,
        required: true,
      },
      talla: {
        type: String,
        required:[true, 'La talla es requerida'],
      },
      insumo: {
        type: String,
        required: true,
      },
      imagen: {
        type: String,
        required: true,
      },
      color:{
        type:String,
        required: true,
      },
      cantidadInsumo: {
        type: Number,
        required: true,
      },
      precioInsumo: {
        type: Number,
        required: true,
      },
      estado: {
        type: string,
        required: true,
      },

})
    
module.exports = mongoose.model('fichaTecnica', FichaSchema);