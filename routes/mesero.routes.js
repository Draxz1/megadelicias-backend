const express = require('express');
const router = express.Router();
const meseroController = require('../controllers/mesero.controller'); // asegúrate que este path sea correcto

router.post('/orden', meseroController.crearOrden); // esta línea da error si `crearOrden` no existe o es undefined

module.exports = router;
