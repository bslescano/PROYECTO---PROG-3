const express = require('express');
const router = express.Router();

const clientesRoutes = require('../routes/clientesR');
const usuariosRoutes = require('../routes/usuariosR');
const habitacionesRoutes = require('../routes/habitacionesR');
const reservasRoutes = require('../routes/reservasR');
const pagosRoutes = require('../routes/pagosR');


router.use('/clientes', clientesRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/habitaciones', habitacionesRoutes);
router.use('/reservas', reservasRoutes);
router.use('/pagos', pagosRoutes);

module.exports = router;
