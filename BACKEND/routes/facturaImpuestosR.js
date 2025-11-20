const express = require("express");
const router = express.Router();

const {
    obtenerFacturaImpuestos,
    obtenerFacturaImpuestosPorId,
    agregarFacturaImpuestos,
    eliminarFacturaImpuestos,
    actualizarFacturaImpuestos
} = require("../Controllers/facturaImpuestos");

router.get("/", obtenerFacturaImpuestos);
router.get("/:id_facturaImpuestos", obtenerFacturaImpuestosPorId);
router.post("/", agregarFacturaImpuestos);
router.delete("/:id_facturaImpuestos", eliminarFacturaImpuestos);
router.put("/:id_facturaImpuestos", actualizarFacturaImpuestos);

module.exports = router;