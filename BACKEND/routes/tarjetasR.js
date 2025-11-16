const express = require("express");
const router = express.Router();

const {
    obtenerTarjetas,
    obtenerTarjetaPorId,
    agregarTarjeta,
    eliminarTarjeta,
    actualizarTarjeta
} = require("../Controllers/tarjetas");

router.get("/", obtenerTarjetas);
router.get("/:id_tarjeta", obtenerTarjetaPorId);
router.post("/", agregarTarjeta);
router.delete("/:id_tarjeta", eliminarTarjeta);
router.put("/:id_tarjeta", actualizarTarjeta);

module.exports = router;