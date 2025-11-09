const connection = require("../Config/dataBase");

const obtenerCategoriasInv = (req, res) => {
    connection.query("SELECT * FROM categoriasInv", (err, results) => {
        if (err) {
            console.error("Error al obtener las categorias:", err);
            res.status(500).json({ error: "Error al obtener las categorias" });
            return;
        }
        res.json(results);
    });
};

const obtenerCategoriaInvPorId = (req, res) => {
    const id_categoria = req.params.id_categoria;
    const sql = "SELECT * FROM categorias WHERE id_categoria = ?";
    connection.query(sql, [id_categoria], (err, results) => {
        if (err) {
            console.error("Error al obtener la categoria:", err);
            res.status(500).json({ error: "Error al obtener la categoria" });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: "Categoria no encontrada" });
            return;
        }
        res.json(results[0]);
    });
};

const agregarCategoriaInv = (req, res) => {
    const { nombre, detalle } = req.body;
    const sql = "INSERT INTO categoriasInv (nombre, detalle) VALUES (?, ?)";
    connection.query(sql, [nombre, detalle], (err, results) => {
        if (err) {
            console.error("Error al agregar la categoria:", err);
            res.status(500).json({ error: "Error al agregar la categoria" });
            return;
        }
        res.status(210).json({ message: "Categoria agregada correctamente"});
    });
};

const eliminarCategoriaInv = (req, res) => {
    const id_categoria = req.params.id_categoria;
    const sql = "DELETE FROM categoriasInv WHERE id_categoria = ?";
    connection.query(sql, [id_categoria], (err, results) => {
        if (err) {
            console.error("Error al eliminar la categoria:", err);
            res.status(500).json({ error: "Error al eliminar la categoria" });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: "Categoria no encontrada" });
            return;
        }
        res.json({ message: "Categoria eliminada correctamente" });
    });
};

const actualizarCategoriaInv = (req, res) => {
    const id_categoria = req.params.id_categoria;
    const { nombre, detalle } = req.body;
    const sql = "UPDATE categorias SET nombre = ?, detalle = ? WHERE id_categoria = ?";
    connection.query(sql, [nombre, detalle, id_categoria], (err, results) => {
        if (err) {
            console.error("Error al actualizar la categoria:", err);
            res.status(500).json({ error: "Error al actualizar la categoria" });
            return;
        }
        res.json({ message: "Categoria actualizada correctamente" });
    });
};

module.exports = { 
    obtenerCategoriasInv, 
    obtenerCategoriaInvPorId, 
    agregarCategoriaInv, 
    eliminarCategoriaInv, 
    actualizarCategoriaInv,
};