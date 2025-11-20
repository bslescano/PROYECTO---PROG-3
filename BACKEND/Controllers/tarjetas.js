const connection = require("../Config/dataBase");

const obtenerTarjetas = (req, res) => {
    connection.query("SELECT * FROM tarjetas;", (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener las tarjetas" });
            return;
        }
        res.json(results);
    });
};

const obtenerTarjetaPorId = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM tarjetas WHERE id_tarjeta = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener la tarjeta" });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: "Tarjeta no encontrada" });
            return;
        }
        res.json(results[0]);
    });
};

const agregarTarjeta = (req, res) => {
    const { entidad, numero, cuotas, intereses, monto_total, id_pago, ultimos_digitos, nombre_titular, fecha_vencimiento } = req.body;
    const sql = "INSERT INTO tarjetas (entidad, numero, cuotas, intereses, monto_total, id_pago, ultimos_digitos, nombre_titular, fecha_vencimiento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(
        sql,
        [entidad, numero, cuotas, intereses, monto_total, id_pago, ultimos_digitos, nombre_titular, fecha_vencimiento],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: "Error al agregar la tarjeta" });
                return;
            }
            res.status(201).json({ message: "Tarjeta agregada correctamente", id: results.insertId });
        }
    );
};

const eliminarTarjeta = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM tarjetas WHERE id_tarjeta = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al eliminar la tarjeta" });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: "Tarjeta no encontrada" });
            return;
        }
        res.json({ message: "Tarjeta eliminada correctamente" });
    });
};

const actualizarTarjeta = (req, res) => {
    const id = req.params.id;
    const { id_tarjeta, entidad, numero, cuotas, intereses, monto_total, id_pago, ultimos_digitos, nombre_titular, fecha_vencimiento } = req.body;
    const sql =
        "UPDATE tarjetas SET id_tarjeta = ?, entidad = ?, numero = ?, cuotas = ?, intereses = ?, monto_total = ?, id_pago = ?, ultimos_digitos = ?, nombre_titular = ?, fecha_vencimiento = ? WHERE id_tarjeta = ?";
    connection.query(
        sql,
        [id_tarjeta, entidad, numero, cuotas, intereses, monto_total, id_pago, ultimos_digitos, nombre_titular, fecha_vencimiento, id],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: "Error al actualizar la tarjeta" });
                return;
            }
            res.json({ message: "Tarjeta actualizada correctamente" });
        }
    );
};

module.exports = {
    obtenerTarjetas,
    obtenerTarjetaPorId,
    agregarTarjeta,
    eliminarTarjeta,
    actualizarTarjeta
};