const express = require('express');
const router = express.Router();
const habitacionesController = require('../Controllers/habitaciones');

router.get('/', habitacionesController.obtenerHabitaciones);
router.get('/:id', habitacionesController.obtenerHabitacionPorId);
router.post('/', habitacionesController.agregarHabitacion);
router.put('/:id', habitacionesController.actualizarHabitacion);
router.delete('/:id', habitacionesController.eliminarHabitacion);

module.exports = router;