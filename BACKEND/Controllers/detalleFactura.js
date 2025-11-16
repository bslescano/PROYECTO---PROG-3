const connection = require("../Config/dataBase");

const obtenerDetallesFactura = (req, res) => {
    connection.query("SELECT * FROM detalle_factura;", (err, results) => {
        if (err) {
            res.status(500).json({error :"Error al obtener las categorias"});
            return;
        }
        res.json(results);
    });
}

const obtenerDetalleFacturaPorId = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM detalle_factura WHERE id_detalle = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener el detalle de factura" });
            return;
        }   
        if (results.length === 0) {
            res.status(404).json({ error: "Detalle de factura no encontrado" });
            return;
        }
        res.json(results[0]);
    });
}

const agregarDetalleFactura = (req, res) => {
    const { id_detalle, concepto, precio_unitario, subtotal, id_factura } = req.body;
    const sql = "INSERT INTO detalle_factura (id_detalle, concepto, precio_unitario, subtotal, id_factura) VALUES (?, ?, ?, ?, ?)";
    connection.query(sql, [id_detalle, concepto, precio_unitario, subtotal, id_factura], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al agregar el detalle" });
            return;
        }
        res.status(210).json({ message: "Detalle de factura agregado correctamente"});
    });
}

const eliminarDetalleFactura = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM detalle_factura WHERE id_detalle = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al eliminar el detalle de factura" });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: "Detalle de factura no encontrado" });
            return;
        }
        res.json({ message: "Detalle de factura eliminado correctamente" });
    });
}

const actualizarDetalleFactura = (req, res) => {
    const id = req.params.id;
    const { id_detalle, concepto, precio_unitario, subtotal, id_factura } = req.body;
    const sql = "UPDATE detalle_factura SET id_detalle = ?, concepto = ?, precio_unitario = ?, subtotal = ?, id_factura = ? WHERE id_detalle = ?";
    connection.query(sql, [id_detalle, concepto, precio_unitario, subtotal, id_factura, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error al actualizar el detalle de factura" });
            return;
        }
        res.json({ message: "Detalle de factura actualizado correctamente"});
    });
}

module.exports = {
    obtenerDetallesFactura,
    obtenerDetalleFacturaPorId,
    agregarDetalleFactura,
    eliminarDetalleFactura,
    actualizarDetalleFactura
}