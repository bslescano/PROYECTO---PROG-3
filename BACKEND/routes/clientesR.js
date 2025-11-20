const express = require("express");
const router = express.Router();

const {
    obtenerClientes,
    obtenerClientePorId,
    agregarCliente,
    eliminarCliente,
    actualizarCliente } = require("../Controllers/clientes");

router.get("/", obtenerClientes);
router.get("/:id_cliente", obtenerClientePorId);
router.post("/", agregarCliente);
router.delete("/:id_cliente", eliminarCliente);
router.put("/:id_cliente", actualizarCliente);

module.exports = router;