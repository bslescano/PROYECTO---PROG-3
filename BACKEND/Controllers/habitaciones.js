const connection = require("../Config/dataBase");

const obtenerHabitaciones = (req, res) => {
    const {fecha_entrada, fecha_salida } = req.query;
    let sql = "SELECT id_habitacion, numero, tipo, precio_noche, estado, url_imagen, descripcion FROM habitacion";
    const params = [];

    if (fecha_entrada && fecha_salida) {
        sql += " WHERE id_habitacion NOT IN (";
        sql += "SELECT id_habitacion FROM reservas WHERE (fecha_entrada <= ? AND fecha_salida >= ?)";
        sql += " OR (fecha_entrada >= ? AND fecha_entrada < ?)";
        sql += " OR (fecha_salida > ? AND fecha_salida <= ?)";
        sql += ")";
        params.push(fecha_salida, fecha_entrada, fecha_entrada, fecha_salida, fecha_entrada, fecha_salida);
    }

    console.log("SQL Query:", sql);
    console.log("SQL Params:", params);
    connection.query(sql, params, (err, results) => {
        if (err) {
            console.error("Error al obtener las habitaciones de la base de datos:", err);
            res.status(500).json({ error: "Error al obtener las habitaciones" });
            return;
        }
        console.log("Resultados de habitaciones de la base de datos:", results);
        res.json(results);
    });
};

const obtenerHabitacionPorId = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT id_habitacion, numero, tipo, precio_noche, estado, url_imagen, descripcion, capacidad FROM habitacion WHERE id_habitacion = ?";
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
    const { numero, tipo, precio_noche, estado, url_imagen, descripcion, capacidad } = req.body;
    console.log("Datos recibidos en agregarHabitacion:", req.body);
    const sql = "INSERT INTO habitacion (numero, tipo, precio_noche, estado, url_imagen, descripcion, capacidad) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(
        sql,
        [numero, tipo, parseFloat(precio_noche), estado, url_imagen, descripcion, parseInt(capacidad, 10)],
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
    const { numero, tipo, precio_noche, estado, url_imagen, descripcion, capacidad } = req.body;
    console.log(`Datos recibidos en actualizarHabitacion para ID ${id}:`, req.body);
    const sql =
        "UPDATE habitacion SET numero = ?, tipo = ?, precio_noche = ?, estado = ?, url_imagen = ?, descripcion = ?, capacidad = ? WHERE id_habitacion = ?";
    connection.query(
        sql,
        [numero, tipo, precio_noche, estado, url_imagen, descripcion, parseInt(capacidad, 10), id],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: "Error al actualizar la habitación" });
                return;
            }
            res.json({ message: "Habitación actualizada correctamente" });
        }
    );
};

const verificarDisponibilidad = (req, res) => {
    const { checkInDate, checkOutDate, adults, children } = req.body;

    if (!checkInDate || !checkOutDate || adults === undefined || children === undefined) {
        return res.status(400).json({ message: "Faltan datos de fecha de entrada, fecha de salida, adultos o niños." });
    }

    // Sumar adultos y niños para obtener el total de huéspedes
    const totalGuests = parseInt(adults, 10) + parseInt(children, 10);

    const sql = `
        SELECT h.id_habitacion, h.numero, h.tipo, h.precio_noche, h.estado, h.url_imagen, h.descripcion, h.capacidad
        FROM habitacion h
        WHERE h.estado = 'disponible'
        AND h.capacidad >= ?  -- Filtra por capacidad de huéspedes
        AND h.id_habitacion NOT IN (
            SELECT r.id_habitacion
            FROM reservas r
            WHERE (
                (r.fecha_entrada <= ? AND r.fecha_salida >= ?)
                OR (r.fecha_entrada >= ? AND r.fecha_entrada < ?)
                OR (r.fecha_salida > ? AND r.fecha_salida <= ?)
            )
        )
    `;

    const params = [
        totalGuests, 
        checkOutDate, checkInDate, 
        checkInDate, checkOutDate,
        checkInDate, checkOutDate
    ];

    connection.query(sql, params, (err, results) => {
        if (err) {
            console.error("Error al verificar disponibilidad:", err);
            return res.status(500).json({ message: "Error interno del servidor al verificar disponibilidad." });
        }

        if (results.length > 0) {
            // Opcional: Aquí se podría agregar lógica más avanzada para filtrar por totalGuests
            // Por ejemplo, si un tipo de habitación tiene una capacidad conocida
            res.json({ available: true, message: "¡Hay habitaciones disponibles!", rooms: results });
        } else {
            res.json({ available: false, message: "Lo sentimos, no hay habitaciones disponibles para las fechas y número de huéspedes seleccionados." });
        }
    });
};

module.exports = {
    obtenerHabitaciones,
    obtenerHabitacionPorId,
    agregarHabitacion,
    eliminarHabitacion,
    actualizarHabitacion,
    verificarDisponibilidad, // Exportar la nueva función
};