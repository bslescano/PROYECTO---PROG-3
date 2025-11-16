const express = require('express');
const router = express.Router();
const reservasController = require('../Controllers/reservas');

router.get('/', reservasController.obtenerReservas);
router.get('/:id', reservasController.obtenerReservaPorId);
router.post('/', reservasController.agregarReserva);
router.put('/:id', reservasController.actualizarReserva);
router.delete('/:id', reservasController.eliminarReserva);

module.exports = router;