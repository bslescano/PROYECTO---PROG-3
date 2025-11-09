const connection = require("../Config/dataBase");

const obtenerPagos = (req, res) => {
    connection.query("SELECT * FROM pagos;", (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener los pagos" });
            return;
        }
        res.json(results);
    });
};

const obtenerPagoPorId = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM pagos WHERE id_pago = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener el pago" });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: "Pago no encontrado" });
            return;
        }
        res.json(results[0]);
    });
};

const agregarPago = (req, res) => {
    const { id_reserva, monto, fecha_pago, metodo_pago, estado } = req.body;
    const sql = "INSERT INTO pagos (id_reserva, monto, fecha_pago, metodo_pago, estado) VALUES (?, ?, ?, ?, ?)";
    connection.query(
        sql,
        [id_reserva, monto, fecha_pago, metodo_pago, estado],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: "Error al agregar el pago" });
                return;
            }
            res.status(201).json({ message: "Pago agregado correctamente", id: results.insertId });
        }
    );
};

const eliminarPago = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM pagos WHERE id_pago = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al eliminar el pago" });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: "Pago no encontrado" });
            return;
        }
        res.json({ message: "Pago eliminado correctamente" });
    });
};

const actualizarPago = (req, res) => {
    const id = req.params.id;
    const { id_reserva, monto, fecha_pago, metodo_pago, estado } = req.body;
    const sql =
        "UPDATE pagos SET id_reserva = ?, monto = ?, fecha_pago = ?, metodo_pago = ?, estado = ? WHERE id_pago = ?";
    connection.query(
        sql,
        [id_reserva, monto, fecha_pago, metodo_pago, estado, id],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: "Error al actualizar el pago" });
                return;
            }
            res.json({ message: "Pago actualizado correctamente" });
        }
    );
};

module.exports = {
    obtenerPagos,
    obtenerPagoPorId,
    agregarPago,
    eliminarPago,
    actualizarPago,
};