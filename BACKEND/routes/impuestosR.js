const express = require("express");
const router = express.Router();

const {
    obtenerImpuestos,
    obtenerImpuestoPorId,
    agregarImpuesto,
    eliminarImpuesto,
    actualizarImpuesto
} = require("../Controllers/impuestos");

router.get("/", obtenerImpuestos);
router.get("/:id_impuesto", obtenerImpuestoPorId);
router.post("/", agregarImpuesto);
router.delete("/:id_impuesto", eliminarImpuesto);
router.put("/:id_impuesto", actualizarImpuesto);

module.exports = router;