const express = require("express");
const router = express.Router();

const {
    obtenerDirecciones,
    obtenerDireccionPorId,
    agregarDireccion,
    eliminarDireccion,
    actualizarDireccion
} = require("../Controllers/direccion");

router.get("/", obtenerDirecciones);
router.get("/:id_direccion", obtenerDireccionPorId);
router.post("/", agregarDireccion);
router.delete("/:id_direccion", eliminarDireccion);
router.put("/:id_direccion", actualizarDireccion);

module.exports = router;