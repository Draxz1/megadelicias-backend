const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const MeseroController = require('../controllers/mesero.controller');

router.get('/platos', auth, MeseroController.obtenerPlatos);
router.post('/ordenes', auth, MeseroController.crearOrden);
router.get('/ordenes', auth, MeseroController.listarOrdenes);

module.exports = router;
