const connection = require("../Config/dataBase");

const obtenerImpuestos = (req, res) => {
    connection.query("SELECT * FROM impuestos;", (err, results) => {
        if (err) {
            console.error("Error al obtener los impuestos:", err);
            res.status(500).json({ error: "Error al obtener los impuestos" });
            return;
        }
        res.json(results);
    });
};

const obtenerImpuestoPorId = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM impuestos WHERE id_impuesto = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error al obtener el impuesto:", err);
            res.status(500).json({ error: "Error al obtener el impuesto" });
            return;
        }   
        if (results.length === 0) {
            res.status(404).json({ error: "Impuesto no encontrado" });
            return;
        }
        res.json(results[0]);
    });
};

const agregarImpuesto = (req, res) => {
    const { id_impuesto, tipo, porcentaje } = req.body;
    const sql = "INSERT INTO impuestos (id_impuesto, tipo, porcentaje) VALUES (?, ?, ?, ?)";
    connection.query(sql, [id_impuesto, tipo, porcentaje], (err, results) => {
        if (err) {
            console.error("Error al agregar el impuesto:", err);
            res.status(500).json({ error: "Error al agregar el impuesto" });
            return;
        }
        res.status(210).json({ message: "Impuesto agregado correctamente" });
    });
};

const eliminarImpuesto = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM impuestos WHERE id_impuesto = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error al eliminar el impuesto:", err);
            res.status(500).json({ error: "Error al eliminar el impuesto" });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: "Impuesto no encontrado" });
            return;
        }
        res.json({ message: "Impuesto eliminado correctamente" });
    });
};

const actualizarImpuesto = (req, res) => {
    const id = req.params.id;
    const { id_impuesto, tipo, porcentaje} = req.body;
    const sql = "UPDATE impuestos SET id_impuesto = ?, tipo = ?, porcentaje = ? WHERE id_impuesto = ?";
    connection.query(sql, [id_impuesto, tipo, porcentaje, id], (err, results) => {
        if (err) {
            console.error("Error al actualizar el impuesto:", err);
            res.status(500).json({ error: "Error al actualizar el impuesto" });
            return;
        }
        res.json({ message: "Impuesto actualizado correctamente" });
    });
};

module.exports = {
    obtenerImpuestos,
    obtenerImpuestoPorId,
    agregarImpuesto,
    eliminarImpuesto,
    actualizarImpuesto
}