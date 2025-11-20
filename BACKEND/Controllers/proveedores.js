const connection = require("../Config/dataBase");

const obtenerProveedores = (req, res) => {
    connection.query("SELECT * FROM proveedores;", (err, results) => {
        if (err) {
            console.error("Error al obtener los proveedores:", err);
            res.status(500).json({ error: "Error al obtener los proveedores" });
            return;
        }
        res.json(results);
    });
};

const obtenerProveedorPorId = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM proveedores WHERE id_proveedor = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error al obtener el proveedor:", err);
            res.status(500).json({ error: "Error al obtener el proveedor" });
            return;
        }   
        if (results.length === 0) {
            res.status(404).json({ error: "Proveedor no encontrado" });
            return;
        }
        res.json(results[0]);
    });
};

const agregarProveedor = (req, res) => {
    const { id_proveedor, nombre, telefono, email, id_direccion } = req.body;
    const sql = "INSERT INTO proveedores (id_proveedor, nombre, telefono, email, id_direccion) VALUES (?, ?, ?, ?, ?)";
    connection.query(sql, [id_proveedor, nombre, telefono, email, id_direccion], (err, results) => {
        if (err) {
            console.error("Error al agregar el proveedor:", err);
            res.status(500).json({ error: "Error al agregar el proveedor" });
            return;
        }
        res.status(210).json({ message: "Proveedor agregado correctamente" });
    });
};

const eliminarProveedor = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM proveedores WHERE id_proveedor = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error al eliminar el proveedor:", err);
            res.status(500).json({ error: "Error al eliminar el proveedor" });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: "Proveedor no encontrado" });
            return;
        }
        res.json({ message: "Proveedor eliminado correctamente" });
    });
};

const actualizarProveedor = (req, res) => {
    const id = req.params.id;
    const { id_proveedor, nombre, telefono,email, id_direccion } = req.body;
    const sql = "UPDATE proveedores SET id_proveedor = ?, nombre = ?, telefono = ?, email = ?, id_direccion = ? WHERE id_proveedor = ?";
    connection.query(sql, [id_proveedor, nombre, telefono, email, id_direccion, id], (err, results) => {
        if (err) {
            console.error("Error al actualizar el proveedor:", err);
            res.status(500).json({ error: "Error al actualizar el proveedor" });
            return;
        }
        res.json({ message: "Proveedor actualizado correctamente" });
    });
};

module.exports = {
    obtenerProveedores,
    obtenerProveedorPorId,
    agregarProveedor,
    eliminarProveedor,
    actualizarProveedor
}