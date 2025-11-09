const connection = require("../Config/dataBase");

const obtenerHabitaciones = (req, res) => {
    const {fecha_entrada, fecha_salida } = req.query;
    let sql = "SELECT * FROM habitacion WHERE estado = 'disponible'";
    const params = [];

    if (fecha_entrada && fecha_salida) {
        sql += " AND id_habitacion NOT IN (";
        sql += "SELECT id_habitacion FROM reservas WHERE (fecha_entrada <= ? AND fecha_salida >= ?)";
        sql += " OR (fecha_entrada >= ? AND fecha_entrada < ?)";
        sql += " OR (fecha_salida > ? AND fecha_salida <= ?)";
        sql += ")";
        params.push(fecha_salida, fecha_entrada, fecha_entrada, fecha_salida, fecha_entrada, fecha_salida);
    }

    connection.query(sql, params, (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener las habitaciones" });
            return;
        }
        res.json(results);
    });
};

const obtenerHabitacionPorId = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM habitacion WHERE id_habitacion = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener la habitación" });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: "Habitación no encontrada" });
            return;
        }
        res.json(results[0]);
    });
};

const agregarHabitacion = (req, res) => {
    const { numero, tipo, precio_noche, estado } = req.body;
    const sql = "INSERT INTO habitacion (numero, tipo, precio_noche, estado) VALUES (?, ?, ?, ?)";
    connection.query(
        sql,
        [numero, tipo, parseFloat(precio_noche), estado],
        (err, results) => {
            if (err) {
                console.error("Error al agregar la habitación:", err, err.sqlMessage);
                res.status(500).json({ error: "Error al agregar la habitación", details: err.sqlMessage });
                return;
            }
            res.status(201).json({ message: "Habitación agregada correctamente", id: results.insertId });
        }
    );
};

const eliminarHabitacion = (req, res) => {
    const id = req.params.id;

    connection.beginTransaction((err) => {
        if (err) {
            console.error("Error al iniciar la transacción para eliminar habitación:", err);
            res.status(500).json({ error: "Error al iniciar la transacción" });
            return;
        }

        // Paso 1: Obtener id_pago de las tarjetas asociadas a reservas de la habitación
        const getPagosIdsSql = `
            SELECT p.id_pago
            FROM pagos p
            INNER JOIN reservas r ON p.id_reserva = r.id_reserva
            WHERE r.id_habitacion = ?
        `;
        connection.query(getPagosIdsSql, [id], (err, pagosResults) => {
            if (err) {
                return connection.rollback(() => {
                    console.error("Error al obtener IDs de pagos asociados:", err.sqlMessage);
                    res.status(500).json({ error: "Error al obtener IDs de pagos asociados", details: err.sqlMessage });
                });
            }

            const pagosIds = pagosResults.map(pago => pago.id_pago);
            console.log("IDs de pagos asociados:", pagosIds);

            // Paso 2: Eliminar registros en la tabla 'tarjetas' que referencian los pagos obtenidos
            if (pagosIds.length > 0) {
                console.log("Intentando eliminar tarjetas para pagos:", pagosIds);
                const deleteTarjetasSql = `DELETE FROM tarjetas WHERE id_pago IN (?)`;
                connection.query(deleteTarjetasSql, [pagosIds], (err, resultsTarjetas) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error("Error al eliminar tarjetas asociadas:", err.sqlMessage);
                            res.status(500).json({ error: "Error al eliminar tarjetas asociadas", details: err.sqlMessage });
                        });
                    }
                    console.log("Tarjetas eliminadas:", resultsTarjetas.affectedRows);
                    eliminarPagosYReservas();
                });
            } else {
                console.log("No hay tarjetas asociadas para eliminar.");
                eliminarPagosYReservas();
            }

            function eliminarPagosYReservas() {
                console.log("Intentando eliminar pagos para habitación:", id);
                // Paso 3: Eliminar los pagos asociados a las reservas de la habitación
                const deletePagosSql = `DELETE FROM pagos WHERE id_reserva IN (SELECT id_reserva FROM reservas WHERE id_habitacion = ?)`;
                connection.query(deletePagosSql, [id], (err, resultsPagos) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error("Error al eliminar pagos asociados:", err.sqlMessage);
                            res.status(500).json({ error: "Error al eliminar pagos asociados", details: err.sqlMessage });
                        });
                    }
                    console.log("Pagos eliminados:", resultsPagos.affectedRows);

                    console.log("Intentando eliminar reservas para habitación:", id);
                    // Paso 4: Eliminar las reservas que hacen referencia a la habitación
                    const deleteReservasSql = "DELETE FROM reservas WHERE id_habitacion = ?";
                    connection.query(deleteReservasSql, [id], (err, resultsReservas) => {
                        if (err) {
                            return connection.rollback(() => {
                                console.error("Error al eliminar reservas asociadas:", err.sqlMessage);
                                res.status(500).json({ error: "Error al eliminar reservas asociadas", details: err.sqlMessage });
                            });
                        }
                        console.log("Reservas eliminadas:", resultsReservas.affectedRows);

                        console.log("Intentando eliminar habitación:", id);
                        // Paso 5: Eliminar la habitación
                        const deleteHabitacionSql = "DELETE FROM habitacion WHERE id_habitacion = ?";
                        connection.query(deleteHabitacionSql, [id], (err, resultsHabitacion) => {
                            if (err) {
                                return connection.rollback(() => {
                                    console.error("Error al eliminar la habitación:", err.sqlMessage);
                                    res.status(500).json({ error: "Error al eliminar la habitación", details: err.sqlMessage });
                                });
                            }

                            if (resultsHabitacion.affectedRows === 0) {
                                return connection.rollback(() => {
                                    console.error("Habitación no encontrada para eliminar:", id);
                                    res.status(404).json({ error: "Habitación no encontrada" });
                                });
                            }

                            connection.commit((err) => {
                                if (err) {
                                    console.error("Error al confirmar la transacción:", err.sqlMessage);
                                    return connection.rollback(() => {
                                        res.status(500).json({ error: "Error al confirmar la transacción" });
                                    });
                                }
                                console.log("Transacción de eliminación de habitación completada exitosamente.");
                                res.json({ message: "Habitación, reservas, pagos y tarjetas asociados eliminados correctamente" });
                            });
                        });
                    });
                });
            }
        });
    });
};

const actualizarHabitacion = (req, res) => {
    const id = req.params.id;
    const { numero, tipo, precio_noche, estado } = req.body;
    const sql =
        "UPDATE habitacion SET numero = ?, tipo = ?, precio_noche = ?, estado = ? WHERE id_habitacion = ?";
    connection.query(
        sql,
        [numero, tipo, precio_noche, estado, id],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: "Error al actualizar la habitación" });
                return;
            }
            res.json({ message: "Habitación actualizada correctamente" });
        }
    );
};

module.exports = {
    obtenerHabitaciones,
    obtenerHabitacionPorId,
    agregarHabitacion,
    eliminarHabitacion,
    actualizarHabitacion,
};