const connection = require("../Config/dataBase");

const obtenerReservas = (req, res) => {
    connection.query("SELECT * FROM reservas;", (err, results) => {
        if (err) {
            console.error("Error al obtener las reservas:", err);
            res.status(500).json({ error: "Error al obtener las reservas" });
            return;
        }
        res.json(results);
    });
};

const obtenerReservaPorId = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM reservas WHERE id_reserva = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error al obtener la reserva:", err);
            res.status(500).json({ error: "Error al obtener la reserva" });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: "Reserva no encontrada" });
            return;
        }
        res.json(results[0]);
    });
};

const agregarReserva = (req, res) => {
    const { fecha_entrada, fecha_salida, id_habitacion, id_cliente, estado } = req.body;
    const sql = "INSERT INTO reservas (fecha_entrada, fecha_salida, id_habitacion, id_cliente, estado) VALUES (?, ?, ?, ?, ?)";
    connection.query(
        sql,
        [fecha_entrada, fecha_salida, id_habitacion, id_cliente, estado],
        (err, results) => {
            if (err) {
                console.error("Error al agregar la reserva:", err);
                res.status(500).json({ error: "Error al agregar la reserva" });
                return;
            }
            res.status(201).json({ message: "Reserva agregada correctamente", id: results.insertId });
        }
    );
};

const eliminarReserva = (req, res) => {
    const id = req.params.id;

    connection.beginTransaction((err) => {
        if (err) {
            console.error("Error al iniciar la transacción:", err);
            res.status(500).json({ error: "Error interno del servidor" });
            return;
        }

        const deleteTarjetasSql = `
            DELETE FROM tarjetas
            WHERE id_pago IN (SELECT id_pago FROM pagos WHERE id_reserva = ?)
        `;
        connection.query(deleteTarjetasSql, [id], (err, resultsTarjetas) => {
            if (err) {
                return connection.rollback(() => {
                    res.status(500).json({ error: "Error al eliminar tarjetas asociadas", details: err.sqlMessage });
                });
            }

            const deletePagosSql = "DELETE FROM pagos WHERE id_reserva = ?";
            connection.query(deletePagosSql, [id], (err, resultsPagos) => {
                if (err) {
                    return connection.rollback(() => {
                        res.status(500).json({ error: "Error al eliminar pagos asociados", details: err.sqlMessage });
                    });
                }

                const deleteReservaSql = "DELETE FROM reservas WHERE id_reserva = ?";
                connection.query(deleteReservaSql, [id], (err, resultsReserva) => {
                    if (err) {
                        return connection.rollback(() => {
                            res.status(500).json({ error: "Error al eliminar la reserva", details: err.sqlMessage });
                        });
                    }

                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => {
                                res.status(500).json({ error: "Error interno del servidor" });
                            });
                        }
                        if (resultsReserva.affectedRows === 0) {
                            res.status(404).json({ error: "Reserva no encontrada" });
                            return;
                        }
                        res.json({ message: "Reserva, pagos y tarjetas asociados eliminados correctamente" });
                    });
                });
            });
        });
    });
};

const actualizarReserva = (req, res) => {
    const id = req.params.id;
    const { fecha_entrada, fecha_salida, id_habitacion, id_cliente, estado } = req.body;
    const sql =
        "UPDATE reservas SET fecha_entrada = ?, fecha_salida = ?, id_habitacion = ?, id_cliente = ?, estado = ? WHERE id_reserva = ?";
    connection.query(
        sql,
        [fecha_entrada, fecha_salida, id_habitacion, id_cliente, estado, id],
        (err, results) => {
            if (err) {
                console.error("Error al actualizar la reserva:", err);
                res.status(500).json({ error: "Error al actualizar la reserva" });
                return;
            }
            res.json({ message: "Reserva actualizada correctamente" });
        }
    );
};

module.exports = {
    obtenerReservas,
    obtenerReservaPorId,
    agregarReserva,
    eliminarReserva,
    actualizarReserva,
};