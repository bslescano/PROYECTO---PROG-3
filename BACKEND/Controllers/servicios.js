const connection = require("../Config/dataBase");

const obtenerServicios = (req, res) => {
    connection.query("SELECT * FROM servicios;", (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener los servicios" });
            return;
        }
        res.json(results);
    });
};

const obtenerServicioPorId = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM servicios WHERE id_servicio = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener el servicio" });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: "Servicio no encontrado" });
            return;
        }
        res.json(results[0]);
    });
};

const agregarServicio = (req, res) => {
    const { id_servicio, nombre, descripcion, precio } = req.body;
    const sql = "INSERT INTO servicios (id_servicio, nombre, descripcion, precio) VALUES (?, ?, ?, ?)";
    connection.query(sql, [id_servicio, nombre, descripcion, precio], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al agregar el servicio" });
            return;
        }
        res.status(210).json({ message: "Servicio agregado correctamente" });
    });
};

const eliminarServicio = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM servicios WHERE id_servicio = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al eliminar el servicio" });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: "Servicio no encontrado" });
            return;
        }
        res.json({ message: "Servicio eliminado correctamente" });
    });
};

const actualizarServicio = (req, res) => {
    const id = req.params.id;
    const { id_servicio, nombre, descripcion, precio } = req.body;
    const sql = "UPDATE servicios SET id_servicio = ?, nombre = ?, descripcion = ?, precio = ? WHERE id_servicio = ?";
    connection.query(sql, [id_servicio, nombre, descripcion, precio, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al actualizar el servicio" });
            return;
        }
        res.json({ message: "Servicio actualizado correctamente" });
    });
};

module.exports = {
    obtenerServicios,
    obtenerServicioPorId,
    agregarServicio,
    eliminarServicio,
    actualizarServicio
}