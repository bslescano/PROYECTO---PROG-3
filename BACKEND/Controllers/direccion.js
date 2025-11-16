const connection = require("../Config/dataBase");

const obtenerDirecciones = (req, res) => {
    connection.query("SELECT * FROM direccion;", (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener las direccion" });
            return;
        }
        res.json(results);
    });
};

const obtenerDireccionPorId = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM direccion WHERE id_direccion = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener la direccion" });
            return;
        }   
        if (results.length === 0) {
            res.status(404).json({ error: "Direccion no encontrada" });
            return;
        }
        res.json(results[0]);
    });
};

const agregarDireccion = (req, res) => {
    const { id_direccion, calle, numero, ciudad, provincia, pais } = req.body;
    const sql = "INSERT INTO direccion (id_direccion, calle, numero, ciudad, provincia, pais) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(sql, [id_direccion, calle, numero, ciudad, provincia, pais], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al agregar la direccion" });
            return;
        }
        res.status(210).json({ message: "Direccion agregada correctamente" });
    });
};

const eliminarDireccion = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM direccion WHERE id_direccion = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al eliminar la direccion" });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: "Direccion no encontrada" });
            return;
        }
        res.json({ message: "Direccion eliminada correctamente" });
    });
};

const actualizarDireccion = (req, res) => {
    const id = req.params.id;
    const { id_direccion, calle, numero, ciudad, provincia, pais } = req.body;
    const sql = "UPDATE direccion SET id_direccion = ?, calle = ?, numero = ?, ciudad = ?, provincia = ?, pais = ? WHERE id_direccion = ?";
    connection.query(sql, [id_direccion, calle, numero, ciudad, provincia, pais, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al actualizar la direccion" });
            return;
        }
        res.json({ message: "Direccion actualizada correctamente" });
    });
};

module.exports = {
    obtenerDirecciones,
    obtenerDireccionPorId,
    agregarDireccion,
    eliminarDireccion,
    actualizarDireccion
};