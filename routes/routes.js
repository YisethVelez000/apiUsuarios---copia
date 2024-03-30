
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const router = require('express').Router();
const cors = require('cors');
const cliente = require('../models/cliente');
const ordenProduccion = require('../models/ordenProduccion');
const fichaTecnica = require('../models/fichaTecnica');
const roles = require('../models/roles');
const bodyParser = require('body-parser')
//usamos cors para poder hacer peticiones desde el front
router.use(cors());

// Configura el body parser
router.use(bodyParser.urlencoded({ extended: false }));


router.post('/clientes', async (req, res) => {
    // Create a new user
    const Cliente = new cliente({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        email: req.body.email,
        telefono: req.body.telefono,
        estado: req.body.estado,
        rol: req.body.rol
    });
    try {
        const savedCliente = await Cliente.save();
        res.send(savedCliente);
    } catch (error) {
        res
            .status(400)
    }
})

router.get('/clientes', async (req, res) => {
    const clientes = await cliente.find();
    res.send(clientes);
})

//Consultar un cliente por id
router.get('/clientes/:id', async (req, res) => {
    const clientes = await cliente.findById(req.params.id);
    res.send(clientes);
})

//Eliminar un cliente por id
router.delete('/clientes/:id', async (req, res) => {
    const clientes = await cliente.findByIdAndDelete(req.params.id);
    res.send(clientes);
})

//Actualizar un cliente por id
router.put('/clientes/:id', async (req, res) => {
    const clientes = await cliente.findByIdAndUpdate(req
        .params.id, {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        email: req.body.email,
        telefono: req.body.telefono,
    }, { new: true });
    res.send(clientes);
})

//Cambiamos unicamente el estado del cliente
router.put('/clientes/:id/estado', async (req, res) => {
    const clientes = await cliente.findByIdAndUpdate(req.params.id, {
        estado: req.body.estado
    }, { new: true });
    res.send(clientes);
})


const schemaOrden = Joi.object({
    nroOrden: Joi.number().min(1).required(),
    fechaEstimada: Joi.date().required(),
    tallas: Joi.string().min(1).required(),
    cantidad: Joi.number().min(1).required(),
    color: Joi.string().min(1).required(),
    estado: Joi.string().min(1).required()
})

router.post('/orden', async (req, res) => {
    // Validate the request body
    const { error } = schemaOrden.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // Create a new user
    const Orden = new ordenProduccion({
        nroOrden: req.body.nroOrden,
        fechaEstimada: req.body.fechaEstimada,
        tallas: req.body.tallas,
        cantidad: req.body.cantidad,
        color: req.body.color,
        estado: req.body.estado
    });
    try {
        const savedOrden = await Orden.save();
        res.send(savedOrden);
    } catch (error) {
        res
            .status(400)
    }
})

router.get('/ordenes', async (req, res) => {
    const ordenes = await ordenProduccion.find();
    res.send(ordenes);
})

//Consultar una orden por id
router.get('/ordenes/:id', async (req, res) => {
    const ordenes = await ordenProduccion.findById(req.params.id);
    res.send(ordenes);
})

//Eliminar una orden por id
router.delete('/ordenes/:id', async (req, res) => {
    const ordenes = await ordenProduccion.findByIdAndDelete(req.params.id);
    res.send(ordenes);
})

//Actualizar una orden por id
router.put('/ordenes/:id', async (req, res) => {
    const ordenes = await ordenProduccion.findByIdAndUpdate(req
        .params.id, {
        fechaEstimada: req.body.fechaEstimada,
        tallas: req.body.tallas,
        cantidad: req.body.cantidad,
        color: req.body.color,
        estado: req.body.estado
    }, { new: true });
    res.send(ordenes);
})

//Cambiamos unicamente el estado de la orden
router.put('/ordenes/:id/estado', async (req, res) => {
    const ordenes = await ordenProduccion.findByIdAndUpdate(req.params.id, {
        estado: req.body.estado
    }, { new: true });
    res.send(ordenes);
})

//Creamos las rutas para los roles
const schemaRol = Joi.object({
    rol: Joi.string().min(1).required(),
    estado: Joi.string().min(1).required(),
    permisos: Joi.array().min(1).required()
})

router.post('/roles', async (req, res) => {
    // Validate the request body
    const { error } = schemaRol.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // Create a new user
    const Rol = new roles({
        rol: req.body.rol,
        estado: req.body.estado,
        permisos: req.body.permisos

    });
    try {
        const savedRol = await Rol.save();
        res.send(savedRol);
    } catch (error) {
        res
            .status(400)
    }
})

router.get('/roles', async (req, res) => {
    const Roles = await roles.find();
    res.send(Roles);
})

//Consultar un rol por id
router.get('/roles/:id', async (req, res) => {
    const Roles = await roles.findById(req.params.id);
    res.send(Roles);
})

router.put('/roles/:id', async (req, res) => {
    const Roles = await roles.findByIdAndUpdate(req
        .params.id, {
        rol: req.body.rol,
        estado: req.body.estado,
        permisos: req.body.permisos
    }, { new: true });
    res.send(Roles);
})

//Eliminar un rol por id
router.delete('/roles/:id', async (req, res) => {
    const Roles = await roles.findByIdAndDelete(req.params.id);
    res.send(Roles);
})

//Cambiamos unicamente el estado del rol
router.put('/roles/:id/estado', async (req, res) => {
    const Roles = await roles.findByIdAndUpdate(req.params.id, {
        estado: req.body.estado
    }, { new: true });
    res.send(Roles);
})

//Creamos las rutas para las fichas tecnicas

router.post('/ficha', async (req, res) => {
    // Validate the request body

    // Create a new user
    const Ficha = new fichaTecnica({
        nombreProducto: req.body.nombreProducto,
        talla: req.body.talla,
        insumo: req.body.insumo,
        imagen: req.body.imagen,
        color: req.body.color,
        cantidadInsumo: req.body.cantidadInsumo,
        precioInsumo: req.body.precioInsumo,
        estado: req.body.estado
    });
    try {
        const savedFicha = await Ficha.save();
        res.send(savedFicha);
    } catch (error) {
        res
            .status(400)
    }
})

router.get('/fichas', async (req, res) => {
    const Fichas = await fichaTecnica.find();
    res.send(Fichas);
}
    
    )

//Consultar una ficha por id
router.get('/fichas/:id', async (req, res) => {
    const Fichas = await fichaTecnica.findById(req.params.id);
    res.send(Fichas);
})

//Eliminar una ficha por id
router.delete('/fichas/:id', async (req, res) => {
    const Fichas = await fichaTecnica.findByIdAndDelete(req.params.id);
    res.send(Fichas);
})

//Editar una ficha
router.put('/fichas/:id', async (req, res) => {
    const Fichas = await fichaTecnica.findByIdAndUpdate(req
        .params.id, {
        nombreProducto: req.body.nombreProducto,
        talla: req.body.talla,
        insumo: req.body.insumo,
        imagen: req.body.imagen,
        color: req.body.color,
        cantidadInsumo: req.body.cantidadInsumo,
        precioInsumo: req.body.precioInsumo,
        estado: req.body.estado
    }, { new: true });
    res.send(Fichas);

})

module.exports = router;
