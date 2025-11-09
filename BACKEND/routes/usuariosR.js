const express = require("express");
const router = express.Router();

const {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    agregarUsuario,
    eliminarUsuario,
    actualizarUsuario,
    loginUsuario
} = require("../Controllers/usuarios");

router.get("/", obtenerUsuarios);
router.get("/:id_usuario", obtenerUsuarioPorId);
router.post("/", agregarUsuario);
router.delete("/:id_usuario", eliminarUsuario);
router.put("/:id_usuario", actualizarUsuario);
router.post("/login", loginUsuario);

module.exports = router;