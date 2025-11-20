const express = require("express");
const router = express.Router();

const {
    obtenerRolesUsuarios,
    obtenerRolUsuarioPorId,
    agregarRolUsuario,
    eliminarRolUsuario,
    actualizarRolUsuario
} = require("../Controllers/rolUsuario");

router.get("/", obtenerRolesUsuarios);
router.get("/:id_rol", obtenerRolUsuarioPorId);
router.post("/", agregarRolUsuario);
router.delete("/:id_rol", eliminarRolUsuario);
router.put("/:id_rol", actualizarRolUsuario);

module.exports = router;