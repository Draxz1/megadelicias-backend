// routes/contabilidad.routes.js
const express = require('express');
const router = express.Router();
const contabilidadController = require('../controllers/contabilidad.controller');

// Rutas
router.get('/libro-diario', contabilidadController.getLibroDiario);
router.post('/libro-diario', contabilidadController.addTransaccion);
router.put('/libro-diario/:id', contabilidadController.updateTransaccion);
router.delete('/libro-diario/:id', contabilidadController.deleteTransaccion);

module.exports = router;
