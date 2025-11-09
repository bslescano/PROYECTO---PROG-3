const express = require("express");
const router = express.Router();

const {
    obtenerEmpleados,
    obtenerEmpleadoPorId,
    agregarEmpleado,
    eliminarEmpleado,
    actualizarEmpleado
} = require("../Controllers/empleados");

router.get("/", obtenerEmpleados);
router.get("/:id_empleado", obtenerEmpleadoPorId);
router.post("/", agregarEmpleado);
router.delete("/:id_empleado", eliminarEmpleado);
router.put("/:id_empleado", actualizarEmpleado);

module.exports = router;