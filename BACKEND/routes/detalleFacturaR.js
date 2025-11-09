const express = require("express");
const router = express.Router();

const {
    obtenerDetallesFactura,
    obtenerDetalleFacturaPorId,
    agregarDetalleFactura,
    eliminarDetalleFactura,
    actualizarDetalleFactura
} = require("../Controllers/detalleFactura");

router.get("/", obtenerDetallesFactura);
router.get("/:id_detalle", obtenerDetalleFacturaPorId);
router.post("/", agregarDetalleFactura);
router.delete("/:id_detalle", eliminarDetalleFactura);
router.put("/:id_detalle", actualizarDetalleFactura);

module.exports = router;