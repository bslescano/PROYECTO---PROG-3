const express = require('express');
const router = express.Router();
const pagosController = require('../Controllers/pagos');

router.get('/', pagosController.obtenerPagos);
router.get('/:id', pagosController.obtenerPagoPorId);
router.post('/', pagosController.agregarPago);
router.put('/:id', pagosController.actualizarPago);
router.delete('/:id', pagosController.eliminarPago);

module.exports = router;