const express = require("express");
const router = express.Router();

const {
    obtenerCategoriasInv, 
    obtenerCategoriaInvPorId, 
    agregarCategoriaInv, 
    eliminarCategoriaInv, 
    actualizarCategoriaInv } = require("../Controllers/categoriasInv");

router.get("/", obtenerCategoriasInv);
router.get("/:id_categoria", obtenerCategoriaInvPorId);
router.post("/", agregarCategoriaInv);
router.delete("/:id_categoria", eliminarCategoriaInv);
router.put("/:id_categoria", actualizarCategoriaInv);

module.exports = router;