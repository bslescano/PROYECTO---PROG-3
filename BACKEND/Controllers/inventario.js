const connection = require("../Config/dataBase");

const obtenerInventario = (req, res) => {
    connection.query("SELECT * FROM inventario;", (err, results) => {
        if (err) {
            console.error("Error al obtener el inventario:", err);
            res.status(500).json({ error: "Error al obtener el inventario" });
            return;
        }
        res.json(results);
    });
};

const obtenerInventarioPorId = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM inventario WHERE id_inventario = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error al obtener el inventario:", err);
            res.status(500).json({ error: "Error al obtener el inventario" });
            return;
        }   
        if (results.length === 0) {
            res.status(404).json({ error: "Inventario no encontrado" });
            return;
        }
        res.json(results[0]);
    });
};

const agregarInventario = (req, res) => {
    const { id_inventario, nombre, cantidad, estado, id_categoriaInv } = req.body;
    const sql = "INSERT INTO inventario (id_inventario, nombre, cantidad, estado; id_categoriaInv) VALUES (?, ?, ?, ?)";
    connection.query(sql, [id_inventario, nombre, cantidad, estado, id_categoriaInv], (err, results) => {
        if (err) {
            console.error("Error al agregar el inventario:", err);
            res.status(500).json({ error: "Error al agregar el inventario" });
            return;
        }
        res.status(210).json({ message: "Inventario agregado correctamente" });
    });
};

const eliminarInventario = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM inventario WHERE id_inventario = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error al eliminar el inventario:", err);
            res.status(500).json({ error: "Error al eliminar el inventario" });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: "Inventario no encontrado" });
            return;
        }
        res.json({ message: "Inventario eliminado correctamente" });
    });
};

const actualizarInventario = (req, res) => {
    const id = req.params.id;
    const { id_inventario, nombre, cantidad, estado, id_categoriaInv} = req.body;
    const sql = "UPDATE inventario SET id_inventario = ?, nombre = ?, cantidad = ?, esatdo = ?, id_categoriaInv = ? WHERE id_inventario = ?";
    connection.query(sql, [id_inventario, nombre, cantidad, estado, id_categoriaInv, id], (err, results) => {
        if (err) {
            console.error("Error al actualizar el inventario:", err);
            res.status(500).json({ error: "Error al actualizar el inventario" });
            return;
        }
        res.json({ message: "Inventario actualizado correctamente" });
    });
};

module.exports = {
    obtenerInventario,
    obtenerInventarioPorId,
    agregarInventario,
    eliminarInventario,
    actualizarInventario
}