const express = require("express");
const router = express.Router();

const {
    obtenerProveedores,
    obtenerProveedorPorId,
    agregarProveedor,
    eliminarProveedor,
    actualizarProveedor
} = require("../Controllers/proveedores");

router.get("/", obtenerProveedores);
router.get("/:id_proveedor", obtenerProveedorPorId);
router.post("/", agregarProveedor);
router.delete("/:id_proveedor", eliminarProveedor);
router.put("/:id_proveedor", actualizarProveedor);

module.exports = router;