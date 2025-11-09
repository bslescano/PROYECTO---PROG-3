const express = require("express");
const router = express.Router();

const {
    obtenerFacturas,
    obtenerFacturaPorId,
    agregarFactura,
    eliminarFactura,
    actualizarFactura
} = require("../Controllers/facturas");

router.get("/", obtenerFacturas);
router.get("/:id_factura", obtenerFacturaPorId);
router.post("/", agregarFactura);
router.delete("/:id_factura", eliminarFactura);
router.put("/:id_factura", actualizarFactura);

module.exports = router;