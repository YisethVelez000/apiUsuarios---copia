const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const cors = require('cors');


// constraseña
const bcrypt = require('bcrypt');

// validation
const bodyParser = require('body-parser');


const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    rol: Joi.string().required(),
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})
//usamos cors para poder hacer peticiones desde el front
router.use(cors());

// Configura el body parser
router.use(bodyParser.urlencoded({ extended: false }));


router.post('/register', async (req, res) => {

    // validate user
    const { error } = schemaRegister.validate(req.body)

    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json({ error: 'Email ya registrado' })
    } else {
        // hash contraseña
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: password,
            rol: req.body.rol,
        });
        try {
            const savedUser = await user.save();
            res.json({
                error: null,
                data: savedUser
            })
        } catch (error) {
            res.status(400).json({ error })
        }

    }

})
// Remove the existing declaration of 'schemaLogin' here


router.post('/login', async (req, res) => {
    // validaciones
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })

    res.json({
        error: null,
        data: 'exito bienvenido'
    })
})
//Listamos todos los usuarios
router.get('/listarUsuarios', async (req, res) => {
    const user = await User.find();
    res.json(user);
});
//Traemos un usuario por su correo electronico para poder editar su contraseña
router.get('/listarUsuario/:email', async (req, res) => {
    const user = await User.find({ email: req.params.email });
    res.json(user);
});

//Editamos un usuario por su correo electronico para editar todos sus datos
router.put('/editarUsuario/:email', async (req, res) => {
    const { name, email, password, rol, precioDolar } = req.body;
    const newUser = { name, email, password, rol, precioDolar };
    await User.findOneAndUpdate({ email: req.params.email }, newUser);
    res.json('Usuario actualizado');
});

//Eliminamos un usuario por su correo electronico
router.delete('/eliminarUsuario/:email', async (req, res) => {
    await User.findOneAndDelete({ email: req.params.email });
    res.json('Usuario eliminado');
});
module.exports = router;
