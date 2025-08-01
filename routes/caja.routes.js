const express = require('express');
const router = express.Router();
const cajaController = require('../controllers/caja.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/movimientos', authMiddleware, cajaController.listarMovimientos);
router.post('/venta', authMiddleware, cajaController.crearVenta);

module.exports = router;
