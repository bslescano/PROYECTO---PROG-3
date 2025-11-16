const connection = require("../Config/dataBase");

const obtenerEmpleados = (req, res) => {
    connection.query("SELECT * FROM empleados;", (err, results) => {
        if (err) {
            console.error("Error al obtener los empleados:", err);
            res.status(500).json({ error: "Error al obtener los empleados" });
            return;
        }
        res.json(results);
    });
};

const obtenerEmpleadoPorId = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM empleados WHERE id_empleado = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error al obtener el empleado:", err);
            res.status(500).json({ error: "Error al obtener el empleado" });
            return;
        }   
        if (results.length === 0) {
            res.status(404).json({ error: "Empleado no encontrado" });
            return;
        }
        res.json(results[0]);
    });
};

const agregarEmpleado = (req, res) => {
    const { id_empleado, nombre, apellido, cargo, salario, id_direccion } = req.body;
    const sql = "INSERT INTO empleados (id_empleado, nombre, apellido, cargo, salario, id_direccion) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(sql, [id_empleado, nombre, apellido, cargo, salario, id_direccion], (err, results) => {
        if (err) {
            console.error("Error al agregar el empleado:", err);
            res.status(500).json({ error: "Error al agregar el empleado" });
            return;
        }
        res.status(210).json({ message: "Empleado agregado correctamente" });
    });
};

const eliminarEmpleado = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM empleados WHERE id_empleado = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error al eliminar el empleado:", err);
            res.status(500).json({ error: "Error al eliminar el empleado" });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: "Empleado no encontrado" });
            return;
        }
        res.json({ message: "Empleado eliminado correctamente" });
    });
};

const actualizarEmpleado = (req, res) => {
    const id = req.params.id;
    const { id_empleado, nombre, apellido, cargo, salario, id_direccion } = req.body;
    const sql = "UPDATE empleados SET id_empleado = ?, nombre = ?, apellido = ?, cargo = ?, salario = ?, id_direccion = ? WHERE id_empleado = ?";
    connection.query(sql, [id_empleado, nombre, apellido, cargo, salario, id_direccion, id], (err, results) => {
        if (err) {
            console.error("Error al actualizar el empleado:", err);
            res.status(500).json({ error: "Error al actualizar el empleado" });
            return;
        }
        res.json({ message: "Empleado actualizado correctamente" });
    });
};

module.exports = {
    obtenerEmpleados,
    obtenerEmpleadoPorId,
    agregarEmpleado,
    eliminarEmpleado,
    actualizarEmpleado
};