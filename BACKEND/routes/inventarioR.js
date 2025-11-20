const express = require("express");
const router = express.Router();

const {
    obtenerInventario,
    obtenerInventarioPorId,
    agregarInventario,
    eliminarInventario,
    actualizarInventario
} = require("../Controllers/inventario");

router.get("/", obtenerInventario);
router.get("/:id_inventario", obtenerInventarioPorId);
router.post("/", agregarInventario);
router.delete("/:id_inventario", eliminarInventario);
router.put("/:id_inventario", actualizarInventario);

module.exports = router;