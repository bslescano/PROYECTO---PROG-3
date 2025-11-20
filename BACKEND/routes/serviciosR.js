const express = require("express");
const router = express.Router();

const {
    obtenerServicios,
    obtenerServicioPorId,
    agregarServicio,
    eliminarServicio,
    actualizarServicio
} = require("../Controllers/servicios");

router.get("/", obtenerServicios);
router.get("/:id_servicio", obtenerServicioPorId);
router.post("/", agregarServicio);
router.delete("/:id_servicio", eliminarServicio);
router.put("/:id_servicio", actualizarServicio);

module.exports = router;